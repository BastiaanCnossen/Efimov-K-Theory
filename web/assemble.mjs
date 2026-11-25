import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {escapeHtml as esc, parseAux, readManifest, restoreTabularHtml} from '../../../Animarium/publication/latex-web-v1/source.mjs';
import {parseBbl, renderReferenceHtml, alphabeticLabel} from '../../../Animarium/publication/latex-web-v1/bibliography.mjs';
import * as reader from '../../../Animarium/publication/reader-shell-v1/components.mjs';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.dirname(here);
const shared=path.resolve(here,'../../../Animarium/publication');
const book=readManifest(path.join(here,'book.json'));
const tmp=path.join(root,'tmp/web'),output=process.env.WEB_OUTPUT_ROOT||path.join(root,book.output);
const inventory=JSON.parse(fs.readFileSync(path.join(tmp,'inventory.json'),'utf8'));
const {chapters,entries}=inventory;
const labels=parseAux(fs.readFileSync(path.join(root,`${book.pdfBase}.aux`),'utf8'));
const bibliography=parseBbl(fs.readFileSync(path.join(root,`${book.pdfBase}.bbl`),'utf8'));
const macros=JSON.parse(fs.readFileSync(path.join(tmp,'mathjax-macros.json'),'utf8'));
const chapterPage=chapter=>`chapter/${chapter.id}/index.html`;
const sectionPage=section=>`section/${section.chapterId}/${section.id}/index.html`;
const entryPage=entry=>`entry/${entry.id}/index.html`;
const relative=(page,target)=>path.posix.relative(path.posix.dirname(page),target)||'index.html';
const frontMatter=inventory.frontMatter||[];
const frontMatterPage=item=>`${item.id}/index.html`;
const targets=new Map();
for(const chapter of chapters){
 targets.set(chapter.label,chapterPage(chapter));
 for(const section of chapter.sections)targets.set(section.label,sectionPage(section));
 for(const entry of chapter.entries)targets.set(entry.label,entryPage(entry));
 // Equation and subsection references point to their complete reading context.
 const source=fs.readFileSync(path.join(root,chapter.source),'utf8');
 for(const match of source.matchAll(/\\label(?:\[[^\]]+\])?\{([^}]+)\}/g)){
  if(targets.has(match[1]))continue;
  const previous=[...source.slice(0,match.index).matchAll(/\\label\[section\]\{([^}]+)\}/g)].at(-1)?.[1];
  const section=chapter.sections.find(section=>section.label===previous);
  targets.set(match[1],section?sectionPage(section):chapterPage(chapter));
 }
}
const diagramDirectory=path.join(tmp,'diagrams');
fs.mkdirSync(diagramDirectory,{recursive:true});fs.mkdirSync(path.join(output,'_assets'),{recursive:true});
const preamble=fs.readFileSync(path.join(root,'preamble.tex'),'utf8');
const macroStart=preamble.indexOf('\\DeclareMathOperator'),macroEnd=preamble.indexOf('% Environments');
const styleStart=preamble.indexOf('\\tikzcdset'),styleEnd=preamble.indexOf('% Cleverref');
if([macroStart,macroEnd,styleStart,styleEnd].some(index=>index<0))throw new Error('Cannot extract diagram preamble');
const diagramPreamble=`\\usepackage{amsfonts,amsmath,amssymb,mathtools,dsfont,accents,newtxtext,newtxmath,graphicx,tikz-cd,tikz}\n\\usetikzlibrary{positioning,calc,fit,patterns,decorations.markings,decorations.pathmorphing,backgrounds}\n${preamble.slice(macroStart,macroEnd)}\n${preamble.slice(styleStart,styleEnd)}`;
const descriptions=JSON.parse(fs.readFileSync(path.join(here,'diagram-descriptions.json'),'utf8'));
const diagrams=new Map(),cited=new Set();
function balancedElement(text,start,tag='div'){
 const tokens=new RegExp(`<${tag}\\b[^>]*>|</${tag}>`,'g');tokens.lastIndex=start;let depth=0;
 for(let token;(token=tokens.exec(text));){depth+=token[0].startsWith('</')?-1:1;if(!depth)return {start,end:tokens.lastIndex,html:text.slice(start,tokens.lastIndex)};}
 throw new Error(`Unclosed converted ${tag} at ${start}`);
}
const statementBlocks=new Map(),proofBlocks=new Map();
const convertedChapters=[];
const convertedFrontMatter=frontMatter.map(item=>{
 let html=fs.readFileSync(path.join(tmp,'html',`${item.htmlName}.html`),'utf8').match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];
 if(!html)throw new Error(`Missing converted front matter ${item.id}`);
 html=html.replace(/(\s[\w-]+)='([^']*)'/g,'$1="$2"').replace(/<!--[^]*?-->/g,'');
 html=restoreTabularHtml(html);
 html=html.replace(/<h2\b[^>]*class="(?:likechapterHead|chapterHead)"[^>]*>[^]*?<\/h2>/g,'');
 for(const match of html.matchAll(/data-key="([^"]+)"/g))cited.add(match[1]);
 html=html.replace(/<table\b[^]*?<\/table>/g,table=>`<div class="source-table" tabindex="0" role="region" aria-label="Sources of the chapters">${table}</div>`);
 return {...item,html};
});
for(const chapter of chapters){
 let html=fs.readFileSync(path.join(tmp,'html',`${chapter.htmlName}.html`),'utf8').match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];
 if(!html)throw new Error(`Missing converted body for ${chapter.id}`);
 html=html.replace(/\\\[([^]*?)\\\]/g,(display,body)=>{
  if(!body.includes('diagram-source'))return display;
  const sources=[...body.matchAll(/data-source="([^"]+)"/g)].map(match=>match[1]);
  if(!sources.length||new Set(sources).size!==1)throw new Error('Ambiguous protected diagram display');
  return `<span class="diagram-source" data-source="${sources[0]}"></span>`;
 });
 html=html.replace(/(\s[\w-]+)='([^']*)'/g,'$1="$2"');
 html=restoreTabularHtml(html);
 html=html.replace(/<table\b[^]*?<\/table>/g,table=>`<div class="source-table" tabindex="0" role="region" aria-label="Terminology table">${table}</div>`);
 // TeX4ht emits the proof-ending square separately. MathJax does not implement
 // amsthm's command for positioning it inside a final display.
 html=html.replace(/\\qedhere(?![A-Za-z])/g,'');
 // MathJax otherwise restarts equation numbering on every section/entry page.
 // Preserve the numbers from the complete PDF, including chapter prefixes.
 html=html.replace(/\\begin\s*\{(equation|align|gather)\}[^]*?\\end\s*\{\1\}/g,equation=>{
  if(/\\tag\b/.test(equation))return equation;
  return equation.replace(/\\label\s*\{([^}]+)\}/g,(label,key)=>{
   const number=labels.get(key)?.number;if(!number)throw new Error(`Unnumbered equation label ${key}`);
   return `\\tag{${number}}${label}`;
  });
 });
 for(const label of labels.keys())html=html.replaceAll(`id="${label.replaceAll(':','_')}"`,`id="${label}"`);
 html=html.replace(/<!--[^]*?-->/g,'');
 for(const match of html.matchAll(/data-key="([^"]+)"/g))cited.add(match[1]);
 const headers=[...html.matchAll(/<h[23]\b[^>]*class="sectionHead"[^>]*>[^]*?<\/h[23]>/g)];
 if(headers.length!==chapter.sections.length)throw new Error(`Section heading count differs in ${chapter.id}`);
 const introduction=html.slice(0,headers[0]?.index??html.length).replace(/<h2\b[^>]*class="chapterHead"[^>]*>[^]*?<\/h2>/g,'');
 const bodies=chapter.sections.map((section,index)=>({...section,html:html.slice(headers[index].index+headers[index][0].length,headers[index+1]?.index??html.length)}));
 for(const body of [{html:introduction},...bodies]){
  for(const match of body.html.matchAll(/<div\b[^>]*class="newtheorem"[^>]*>/g)){
   const block=balancedElement(body.html,match.index);
   const entry=chapter.entries.find(entry=>block.html.includes(`id="${entry.label}"`));
   if(!entry||statementBlocks.has(entry.label))throw new Error(`Missing/repeated result label in ${chapter.id}`);
   const heading=block.html.match(/<span class="head">([^]*?)<\/span>/)?.[1]?.replace(/<[^>]*>/g,'').replace(/\s+/g,' ');
   if(!heading?.includes(`${entry.kind[0].toUpperCase()+entry.kind.slice(1)} ${entry.number}`))throw new Error(`HTML numbering differs from PDF for ${entry.label}: ${heading}`);
   statementBlocks.set(entry.label,block.html);
  }
  const tokens=/<span class="proof-owner" data-owner="([^"]+)" data-variant="([^"]+)"><\/span>|<div\b[^>]*class="proof"[^>]*>/g;
  let owner=null;
  for(let token;(token=tokens.exec(body.html));){
   if(token[1]){if(owner)throw new Error('Unconsumed proof owner');owner={label:token[1],variant:token[2]};continue;}
   if(!owner)throw new Error(`Unowned proof in ${chapter.id}`);
   const block=balancedElement(body.html,token.index),proofs=proofBlocks.get(owner.label)||[];
   if(proofs.some(proof=>proof.variant===owner.variant))throw new Error('Repeated proof variant');
   proofs.push({...owner,html:block.html});proofBlocks.set(owner.label,proofs);owner=null;
  }
  if(owner)throw new Error('Owner has no proof');
 }
 convertedChapters.push({...chapter,introduction,bodies});
}
if(statementBlocks.size!==entries.length||[...proofBlocks.values()].flat().length!==chapters.flatMap(chapter=>chapter.proofs).length)throw new Error('Entry or proof coverage differs after conversion');
function clean(content,page){
 for(const entry of entries){
  const old=statementBlocks.get(entry.label);if(!old||!content.includes(old))continue;
  const linked=old.replace(/(<span class="head">[^]*?)(<span class="ntx-Bold[^"]*">)([^]*?)(<\/span>)/,(_,prefix,open,body,close)=>`${prefix}${open}<a href="${relative(page,entryPage(entry))}" title="${esc(entry.title)}">${body}</a>${close}`);
  content=content.replace(old,linked);
 }
 content=content.replace(/<span class="proof-owner"[^>]*><\/span>/g,'');
 let proofIndex=0;
 for(const start of [...content.matchAll(/<div\b[^>]*class="proof"[^>]*>/g)].reverse()){
  const block=balancedElement(content,start.index);let inner=block.html.replace(/^<div[^>]*>/,'').replace(/<\/div>$/,'');
  const headStart=inner.search(/<span\b[^>]*class="head"[^>]*>/),head=headStart>=0?balancedElement(inner,headStart,'span'):null;
  const title=head?head.html.replace(/<[^>]*>/g,'').replace(/&#x[^;]+;/g,' ').trim():'Proof';
  if(head)inner=inner.replace(head.html,'');
  content=content.slice(0,block.start)+`<details class="proof" open><summary>${esc(title||'Proof')}</summary><div class="proof-content" id="proof-${++proofIndex}">${inner}</div></details>`+content.slice(block.end);
 }
 content=content.replace(/<a class="source-reference" data-label="([^"]+)">/g,(_,label)=>{
  const target=targets.get(label),href=target?`${relative(page,target)}#${label}`:`${relative(page,'book.pdf')}#nameddest=${encodeURIComponent(labels.get(label).anchor)}`;
  return `<a class="source-reference" href="${esc(href)}">`;
 });
 content=content.replace(/<a class="citation" data-key="([^"]+)">/g,(_,key)=>`<a class="citation" href="${relative(page,'references/index.html')}#bib-${key}">`);
 content=content.replace(/<span class="diagram-source" data-source="([^"]+)"><\/span>/g,(_,encoded)=>{
  // Editor line-ending changes must not invalidate an authored description or
  // a cached rendering of the same diagram.
  const source=Buffer.from(encoded,'base64').toString('utf8').replace(/\r+\n/g,'\n').replace(/\r/g,'\n');
  const sourceHash=crypto.createHash('sha256').update(source).digest('hex').slice(0,20);
  const name=`tikzcd-${crypto.createHash('sha256').update(diagramPreamble+'\n'+source).digest('hex').slice(0,20)}`;
  const description=descriptions[sourceHash];if(!description)throw new Error(`Missing authored diagram description ${sourceHash}: ${source}`);
  diagrams.set(name,source);fs.writeFileSync(path.join(diagramDirectory,`${name}.tex`),`\\documentclass[border=2pt]{standalone}\n${diagramPreamble}\n\\begin{document}\n${source}\n\\end{document}\n`);
  return `<span class="diagram"><img src="${relative(page,`_assets/diagrams/${name}.svg`)}" alt="${esc(description)}" loading="lazy"></span>`;
 });
 return content.replace(/<p\b[^>]*>\s*<\/p>/g,'');
}
const routes=[];
function write(page,title,kind,content,{chapter=null,section=null,entry=null,description:authoredDescription=null}={}){
 const assetPrefix=relative(page,'_assets/')+'/';const breadcrumbs=[];
 if(chapter)breadcrumbs.push({label:chapter.heading,href:kind==='chapter'?'':relative(page,chapterPage(chapter))});
 if(section)breadcrumbs.push({label:`Section ${section.number}`,href:kind==='section'?'':relative(page,sectionPage(section))});
 if(entry)breadcrumbs.push({label:`${entry.kind[0].toUpperCase()+entry.kind.slice(1)} ${entry.number}`});
 const header=reader.renderReaderHeader({collectionHref:book.collectionPage,homeHref:kind==='work'?'':relative(page,'index.html'),workTitle:book.title,breadcrumbs,location:kind==='frontmatter'?title:'',title});
 const list=items=>`<ol class="context-entry-list">${items.map(item=>`<li>${item.page?`<a href="${relative(page,item.page)}"${item.current?' aria-current="page"':''}>`:'<span class="planned-navigation-item">'}<span class="context-entry-heading">${esc(item.heading)}</span><span class="context-entry-title">${esc(item.title)}</span>${item.page?'</a>':'</span>'}</li>`).join('')}</ol>`;
 const outline=[...frontMatter.map(item=>({page:frontMatterPage(item),title:'',heading:item.title,current:page===frontMatterPage(item)})),...chapters.filter(chapter=>!chapter.appendix).map(item=>({page:chapterPage(item),title:item.title,heading:item.heading,current:item.id===chapter?.id})),...inventory.planned.map(item=>({heading:`Chapter ${item.number}`,title:item.title})),...chapters.filter(chapter=>chapter.appendix).map(item=>({page:chapterPage(item),title:item.title,heading:item.heading,current:item.id===chapter?.id}))];
 const ledgers=[{key:'chapters',title:'Chapters',collapsed:kind!=='work',content:list(outline)}];
 if(chapter)ledgers.push({key:'sections',title:'Sections',collapsed:kind!=='chapter',content:list(chapter.sections.map(item=>({...item,page:sectionPage(item),heading:`Section ${item.number}`,current:item.id===section?.id})))});
 if(section){const named=chapter.entries.filter(item=>item.sectionId===section.id&&item.named);if(named.length)ledgers.push({key:'named-results',title:'Named results',collapsed:false,content:list(named.map(item=>({...item,page:entryPage(item),heading:`${item.kind[0].toUpperCase()+item.kind.slice(1)} ${item.number}`})))});}
 const description=authoredDescription||section?.description||(entry?`${entry.kind} ${entry.number} in ${book.title}. ${entry.title}.`:chapter?.description||'Dualizable categories and continuous algebraic K-theory, from the Regensburg seminar and lectures by Clausen, Mathew, and Efimov.');
 const document=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | ${esc(book.title)}</title><meta name="description" content="${esc(description)}"><link rel="stylesheet" href="${assetPrefix}content.css"><link rel="stylesheet" href="${assetPrefix}style.css"><script>window.MathJax={loader:{paths:{fonts:'${assetPrefix}mathjax/fonts'},load:['[tex]/mathtools','[tex]/boldsymbol']},tex:{packages:{'[+]':['ams','mathtools','boldsymbol']},macros:${JSON.stringify(macros).replaceAll('<','\\u003c')}},options:{enableMenu:false}};</script><script defer src="${assetPrefix}mathjax/tex-chtml.js"></script>${reader.renderReaderScripts({assetPrefix,adapterHref:`${assetPrefix}proofs.js`,workId:book.workId})}</head><body class="work-page ${kind}-page has-context-nav" data-proof-mode="displayed">${reader.renderUtilityDock(reader.renderReaderSettings()+reader.renderManuscriptControl(relative(page,'book.pdf')))}${header}<main class="reader-layout">${reader.renderContextNavigationToggle({label:'Navigation'})}<article class="notes-page ${kind==='chapter'?'chapter-landing':kind==='work'?'work-landing':''}">${clean(content,page)}</article>${reader.renderContextNavigation({ledgers})}</main>${reader.renderEditionFooter({pdfHref:relative(page,'book.pdf'),sourceNote:'Generated from the LaTeX source.'})}</body></html>`;
 fs.mkdirSync(path.dirname(path.join(output,page)),{recursive:true});fs.writeFileSync(path.join(output,page),document);
 const canonical=new URL(page==='index.html'?'':`${path.posix.dirname(page)}/`,book.canonicalBase).href;
 fs.writeFileSync(path.join(output,page),document.replace('</head>',`<link rel="canonical" href="${esc(canonical)}"></head>`));
 const fragments=[...new Set([...document.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]).filter(id=>labels.has(id)))].map(Id=>({Id,Kind:'latex-label'}));
 routes.push({Kind:kind,Path:page==='index.html'?'/':`/${path.posix.dirname(page)}/`,...(entry||section||chapter?{SourceId:(entry||section||chapter).id}:{}),Fragments:fragments});
}
function cards(items,kind,page){return `<div class="${kind}-card-grid">${items.map(item=>`<article class="${kind}-card"><p class="section-card-meta">${esc(item.heading||`Section ${item.number}`)}</p><h3><a href="${relative(page,item.page)}">${esc(item.title)}</a></h3><p>${esc(item.description)}</p></article>`).join('')}</div>`;}
const mainChapters=chapters.filter(chapter=>!chapter.appendix),appendices=chapters.filter(chapter=>chapter.appendix);
const planned=`<section class="planned-chapters"><h2>In preparation</h2><ol class="context-entry-list">${inventory.planned.map(chapter=>`<li><span class="context-entry-heading">Chapter ${chapter.number}</span> ${esc(chapter.title)}</li>`).join('')}</ol></section>`;
const frontMatterLinks=frontMatter.filter(item=>item.id!=='preface').map(item=>`<a href="${frontMatterPage(item)}">${esc(item.title)}</a>`).join(' · ');
const aiUseNotice='<p>These notes have been created with extensive help of AI agents. See the <a href="preface/index.html">preface</a> for details.</p>';
write('index.html',book.title,'work',`<div class="landing-introduction"><p>${esc(book.overview)}</p>${aiUseNotice}${frontMatterLinks?`<nav class="frontmatter-links" aria-label="Front matter">${frontMatterLinks}</nav>`:''}</div>${cards(mainChapters.map(chapter=>({...chapter,page:chapterPage(chapter)})),'chapter','index.html')}${planned}<section><h2>Appendix</h2>${cards(appendices.map(chapter=>({...chapter,page:chapterPage(chapter)})),'chapter','index.html')}</section>`);
for(const item of convertedFrontMatter)write(frontMatterPage(item),item.title,'frontmatter',item.html,{description:item.description});
for(const chapter of convertedChapters){
 const page=chapterPage(chapter);
 write(page,chapter.title,'chapter',`<div class="chapter-introduction">${chapter.introduction}</div><section class="available-sections"><h2>Sections</h2>${cards(chapter.sections.map(section=>({...section,page:sectionPage(section)})),'section',page)}</section>`,{chapter});
 for(const section of chapter.bodies)write(sectionPage(section),section.title,'section',section.html,{chapter,section});
 for(const entry of chapter.entries){const section=chapter.sections.find(section=>section.id===entry.sectionId);write(entryPage(entry),entry.title,'entry',statementBlocks.get(entry.label)+(proofBlocks.get(entry.label)||[]).map(proof=>proof.html).join(''),{chapter,section,entry});}
}
write('references/index.html','References','references',`<ol class="reference-list">${[...cited].sort().map(key=>`<li id="bib-${key}"><span class="reference-label">[${esc(alphabeticLabel(bibliography.get(key)))}]</span><div class="reference-body">${renderReferenceHtml(bibliography.get(key))}</div></li>`).join('')}</ol>`);
for(const name of ['style.css','proofs.js'])fs.copyFileSync(path.join(shared,'latex-web-v1',name),path.join(output,'_assets',name==='style.css'?'content.css':name));
fs.copyFileSync(path.join(root,`${book.pdfBase}.pdf`),path.join(output,'book.pdf'));reader.installReaderShell(output,'_assets');
fs.writeFileSync(path.join(output,'_meta/public-contract.json'),JSON.stringify({SchemaVersion:1,WorkId:book.workId,CanonicalBase:book.canonicalBase,Routes:routes},null,2));
reader.applyReadingNavigation(output,{chapters:chapters.map(chapter=>({id:chapter.id,page:chapterPage(chapter),title:chapter.title,heading:chapter.heading,sections:chapter.sections.map(section=>({id:section.id,page:sectionPage(section),title:section.title,heading:`Section ${section.number}`}))})),entries:entries.map(entry=>({page:entryPage(entry),chapterId:entry.chapterId,sectionId:entry.sectionId}))});
fs.writeFileSync(path.join(tmp,'diagram-jobs.json'),JSON.stringify([...diagrams.keys()],null,2));
console.log(`Assembled ${routes.length} pages and ${diagrams.size} diagram jobs into ${output}`);
