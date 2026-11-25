import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateReaderShell} from '../../../Animarium/publication/reader-shell-v1/install.mjs';
import crypto from 'node:crypto';
import {parseAux} from '../../../Animarium/publication/latex-web-v1/source.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.resolve(process.argv[2] || path.join(root,'output/web'));
const inventory=JSON.parse(fs.readFileSync(path.join(root,'tmp/web/inventory.json'),'utf8'));
const book=JSON.parse(fs.readFileSync(path.join(root,'web/book.json'),'utf8'));
const compiledLabels=parseAux(fs.readFileSync(path.join(root,`${book.pdfBase}.aux`),'utf8'));
const diagrams=JSON.parse(fs.readFileSync(path.join(root,'tmp/web/diagram-jobs.json'),'utf8'));
const sizes=new Map();
fs.mkdirSync(path.join(output,'_assets/diagrams'),{recursive:true});
for (const name of diagrams) {
  const file=path.join(root,'tmp/web/diagrams',`${name}.svg`);
  const svg=fs.readFileSync(file,'utf8');
  const dimension=key=>{
    const match=svg.match(new RegExp(`\\b${key}=['"]([\\d.]+)(pt|px)?['"]`));
    if (!match) throw new Error(`Missing ${key} on ${name}`);
    return Math.round(Number(match[1])*(match[2]==='pt'?4/3:1));
  };
  sizes.set(`${name}.svg`,{width:dimension('width'),height:dimension('height')});
  fs.copyFileSync(file,path.join(output,'_assets/diagrams',`${name}.svg`));
}
const pages=[];
function visit(directory) {
  for (const item of fs.readdirSync(directory,{withFileTypes:true})) {
    const file=path.join(directory,item.name);
    if (item.isDirectory() && !item.name.startsWith('_')) visit(file);
    else if (item.name==='index.html') pages.push(file);
  }
}
visit(output);
const contract=JSON.parse(fs.readFileSync(path.join(output,'_meta/public-contract.json'),'utf8'));
const expectedPages=new Set(contract.Routes.map(route=>path.resolve(output,`.${route.Path}`,'index.html')));
if (pages.length!==expectedPages.size || pages.some(page=>!expectedPages.has(page))) throw new Error('Generated pages do not exactly match the pilot registry; remove obsolete generated pages explicitly.');
for (const file of pages) {
  let html=fs.readFileSync(file,'utf8');
  html=html.replace(/<img\b[^>]*>/g,tag=>{
    const name=tag.match(/src="[^\"]*\/(tikzcd-[^\"]+\.svg)"/)?.[1];
    if (!name || !sizes.has(name)) throw new Error(`Unexpected/missing diagram ${tag}`);
    const {width,height}=sizes.get(name);
    return tag.replace(/\s(?:width|height|style)="[^\"]*"/g,'').replace(/>$/,` width="${width}" height="${height}" style="width:${width}px">`);
  });
  fs.writeFileSync(file,html);
}
let links=0;
for (const file of pages) {
  const html=fs.readFileSync(file,'utf8');
  if (/\\HCode|\\qedhere(?![A-Za-z])|diagram-source|proof-owner|source-table-(?:start|end|cell)|\?\?/.test(html)) throw new Error(`Conversion residue on ${file}`);
  if (!html.includes('name="description"')) throw new Error(`Missing description: ${file}`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|data:)/.test(match[1])) continue;
    // The collection page belongs to the Animarium, outside this bundle.
    if(match[1]===book.collectionPage)continue;
    const [url,fragment]=match[1].split('#');
    const target=path.resolve(path.dirname(file),decodeURIComponent(url || 'index.html'));
    if (!fs.existsSync(target)) throw new Error(`Broken asset/link ${match[1]} in ${file}`);
    if (fragment && target.endsWith('.html')) {
      const text=fs.readFileSync(target,'utf8');
      if (!text.includes(`id="${decodeURIComponent(fragment)}"`) && !text.includes(`id='${decodeURIComponent(fragment)}'`)) throw new Error(`Broken fragment ${match[1]} on ${file}`);
    }
    links++;
  }
}
validateReaderShell(output);
const tamme=fs.readFileSync(path.join(output,'entry/tammes-excision-theorem/index.html'),'utf8');
const warning=fs.readFileSync(path.join(output,'entry/localization-after-ind-completion/index.html'),'utf8');
if ((tamme.match(/<details class="proof"/g)||[]).length!==1 || !tamme.includes('lax pullback') || warning.includes('<details class="proof"')) throw new Error('Non-adjacent proof ownership is incorrect');
const theorem=fs.readFileSync(path.join(output,'entry/omega-one-presentability-of-compactly-assembled-categories/index.html'),'utf8');
if((theorem.match(/<details class="proof"/g)||[]).length!==2)throw new Error('The omega-one presentability theorem must contain both proofs');
const counts={frontmatter:(inventory.frontMatter||[]).length,chapter:inventory.chapters.length,section:inventory.chapters.flatMap(chapter=>chapter.sections).length,entry:inventory.entries.length};
for(const [kind,count] of Object.entries(counts))if(contract.Routes.filter(route=>route.Kind===kind).length!==count)throw new Error(`Incomplete ${kind} coverage`);
const proofCount=inventory.chapters.flatMap(chapter=>chapter.proofs).length;
for(const chapter of inventory.chapters){
  const rendered=chapter.sections.map(section=>fs.readFileSync(path.join(output,'section',chapter.id,section.id,'index.html'),'utf8')).join('');
  if((rendered.match(/<details class="proof"/g)||[]).length!==chapter.proofs.length)throw new Error(`Proof count differs in ${chapter.id}`);
  const source=fs.readFileSync(path.join(root,chapter.source),'utf8');
  for(const match of source.matchAll(/\\label\{([^}]+)\}/g)){
    const label=compiledLabels.get(match[1]);
    if(label?.kind==='equation'&&!rendered.includes(`\\tag{${label.number}}`))throw new Error(`Equation number not pinned to the PDF: ${match[1]}`);
  }
}
const sources={};
for(const name of [book.root,...inventory.chapters.map(chapter=>chapter.source),'preamble.tex','preamble.sty','web/book.json'])sources[name]=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,name))).digest('hex');
fs.writeFileSync(path.join(output,'_meta/source-build.json'),JSON.stringify({SchemaVersion:1,Sources:sources},null,2));
fs.writeFileSync(path.join(output,'_meta/pilot-validation.json'),JSON.stringify({pages:pages.length,chapters:counts.chapter,sections:counts.section,entries:counts.entry,proofs:proofCount,diagrams:diagrams.length,checkedLinks:links,nonAdjacentProofOwnership:true,multipleProofVariants:true},null,2));
console.log(`Validated ${pages.length} pages, ${proofCount} proofs, ${diagrams.length} diagrams and ${links} local links.`);
