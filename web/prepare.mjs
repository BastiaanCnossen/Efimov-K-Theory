import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {escapeHtml as esc, group, parseAux, uncomment, readManifest, mathMacros} from '../../../Website/publication/latex-web-v1/source.mjs';
import {parseBbl, citationName, citationYear} from '../../../Website/publication/latex-web-v1/bibliography.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const book=readManifest(path.join(root,'web/book.json'));
const labels=parseAux(fs.readFileSync(path.join(root,`${book.pdfBase}.aux`),'utf8'));
const bibliography=parseBbl(fs.readFileSync(path.join(root,`${book.pdfBase}.bbl`),'utf8'));
const temporary=path.join(root,'tmp/web');
fs.mkdirSync(temporary,{recursive:true});
const chapters=[];
const kinds='theorem|lemma|proposition|corollary|definition|remark|example|warning|observation|construction|claim|convention|notation|exercise|fact|question';
function sourceReferences(text) {
 return text.replace(/\\(?:Cref|cref|eqref|ref)\{([^}]+)\}/g,(match,keys)=>keys.split(',').map(label=>{
  label=label.trim();const ref=labels.get(label);
  if(!ref?.anchor||!ref.number||ref.number.includes('?'))throw new Error(`Unresolved source reference ${label}`);
  const kind=ref.kind||'reference';
  const title=match.startsWith('\\eqref')?`(${ref.number})`:match.startsWith('\\ref')?ref.number:`${kind[0].toUpperCase()}${kind.slice(1)} ${ref.number}`;
  return `\\HCode{<a class="source-reference" data-label="${esc(label)}">${esc(title)}</a>}`;
 }).join(', '));
}
function citations(text) {
 const command=/\\(cite|citet|citep)\b/g;let result='',cursor=0;
 for(let match;(match=command.exec(text));){
  result+=text.slice(cursor,match.index);let offset=command.lastIndex;const notes=[];
  while(/\s/.test(text[offset]||''))offset++;
  while(text[offset]==='['){const item=group(text,offset,'[',']');notes.push(item.value);offset=item.end;}
  const keys=group(text,offset);
  const links=keys.value.split(',').map(key=>{
   key=key.trim();const entry=bibliography.get(key);if(!entry)throw new Error(`Missing bibliography entry ${key}`);
   return `<a class="citation" data-key="${esc(key)}">${esc(citationName(entry))} (${esc(citationYear(entry,bibliography))})</a>`;
  }).join('; ');
  const note=value=>(value||'').replace(/~/g,' ').replace(/\\(?:textup|emph)\{([^}]+)\}/g,'$1').replace(/\\[ ,]/g,' ').replace(/[{}]/g,'');
  const before=notes.length>1?note(notes[0]):'',after=note(notes.at(-1));
  result+=`\\HCode{${match[1]==='citet'?'':'['}${before?`${esc(before)} `:''}${links}${after?`, ${esc(after)}`:''}${match[1]==='citet'?'':']'}}`;
  cursor=keys.end;command.lastIndex=keys.end;
 }
 return result+text.slice(cursor);
}
for(const descriptor of book.chapters){
 const source=uncomment(fs.readFileSync(path.join(root,descriptor.source),'utf8'));
 const number=labels.get(descriptor.label)?.number;
 if(!number||(!descriptor.appendix&&!/^\d+$/.test(number)))throw new Error(`Invalid compiled chapter number ${descriptor.label}`);
 const entries=[];
 for(const match of source.matchAll(new RegExp(`\\\\begin\\{(${kinds})\\}([\\s\\S]*?)\\\\end\\{\\1\\}`,'g'))){
  const label=match[2].match(/\\label\[[^\]]+\]\{([^}]+)\}/)?.[1];
  if(!label||!labels.has(label))throw new Error(`Missing source/compiled label in ${descriptor.source} near ${match.index}`);
  const record=book.entries.find(item=>item[0]===label);if(!record)throw new Error(`Unregistered result ${label}`);
  const opening=match[2].trimStart(),optional=opening.startsWith('[')?group(opening,0,'[',']').value:'';
  const name=optional.replace(/\\cite(?:t|p)?(?:\[[^\]]*\])*\{[^}]*\}/g,'').replace(/\b(?:cf|see|also|Theorem|definition)\b/g,'').replace(/[{}\s,.;/\\]/g,'');
  entries.push({label,id:record[1],title:record[2],kind:match[1],number:labels.get(label).number,start:match.index,named:Boolean(name),chapterId:descriptor.id});
 }
 const sections=descriptor.sections.map(([label,id,description,title])=>{
  const start=source.indexOf(`\\label[section]{${label}}`),command=source.lastIndexOf('\\section{',start);
  if(start<0||command<0||!labels.has(label))throw new Error(`Missing section ${label}`);
  return {label,id,description,title:title||group(source,command+'\\section'.length).value,start:command,number:labels.get(label).number,chapterId:descriptor.id};
 });
 if([...source.matchAll(/\\section\{/g)].length!==sections.length)throw new Error(`Section registry gap in ${descriptor.source}`);
 for(const entry of entries)entry.sectionId=sections.findLast(section=>section.start<entry.start)?.id;
 const proofs=[...source.matchAll(/\\prooffor\{([^}]+)\}(?:\[([^\]]+)\])?/g)].map(match=>({label:match[1],variant:match[2]||'proof',start:match.index}));
 if(proofs.length!==[...source.matchAll(/\\begin\{proof\}/g)].length)throw new Error(`Every proof needs explicit ownership in ${descriptor.source}`);
 const proofIds=new Set();for(const proof of proofs){
  if(!entries.some(entry=>entry.label===proof.label))throw new Error(`Unknown proof owner ${proof.label}`);
  const id=`${proof.label}/${proof.variant}`;if(proofIds.has(id))throw new Error(`Repeated proof variant ${id}`);proofIds.add(id);
 }
 const htmlName=`chapter-${descriptor.id}`;
 chapters.push({...descriptor,number,heading:`${descriptor.appendix?'Appendix':'Chapter'} ${number}`,sections,entries,proofs,htmlName});
 let converted=citations(sourceReferences(source));
 converted=converted.replace(/\\begin\{tikzcd\}[\s\S]*?\\end\{tikzcd\}/g,diagram=>`\\ifmmode\\hbox{\\HCode{<span class="diagram-source" data-source="${Buffer.from(diagram).toString('base64')}"></span>}}\\else\\HCode{<span class="diagram-source" data-source="${Buffer.from(diagram).toString('base64')}"></span>}\\fi`);
 // Place equation anchors outside preserved mathematics.
 converted=converted.replace(/\\begin\{(equation\*?|align\*?|gather\*?)\}[\s\S]*?\\end\{\1\}/g,equation=>[...equation.matchAll(/\\label\{([^}]+)\}/g)].map(match=>`\\HCode{<span id="${esc(match[1])}"></span>}`).join('')+equation);
 converted=converted.replace(/\\label\[([^\]]+)\]\{([^}]+)\}/g,(match,kind,label)=>`${match}\\HCode{<span id="${esc(label)}"></span>}`);
 converted=converted.replace(/\\prooffor\{([^}]+)\}(?:\[([^\]]+)\])?/g,(_,label,variant)=>`\\HCode{<span class="proof-owner" data-owner="${esc(label)}" data-variant="${esc(variant||'proof')}"></span>}`);
 const setup=descriptor.appendix?`\\appendix\n\\setcounter{chapter}{${number.charCodeAt(0)-65}}`:`\\setcounter{chapter}{${Number(number)-1}}`;
 fs.writeFileSync(path.join(temporary,`${htmlName}.tex`),`\\documentclass[11pt]{book}\n\\makeatletter\\def\\input@path{{../../}}\\makeatother\n\\input{preamble-web}\n\\begin{document}\n${setup}\n${converted}\n\\end{document}\n`);
 console.log(`Prepared ${descriptor.appendix?'Appendix':'Chapter'} ${number}: ${sections.length} sections, ${entries.length} entries, ${proofs.length} proofs.`);
}
const entries=chapters.flatMap(chapter=>chapter.entries);
if(entries.length!==book.entries.length||new Set(entries.map(entry=>entry.label)).size!==entries.length)throw new Error('Entry registry and manuscript differ.');
const planned=(book.plannedChapters||[]).map(([label,title,source])=>{
 const actual=uncomment(fs.readFileSync(path.join(root,source),'utf8'));
 const start=actual.indexOf('\\chapter'),end=group(actual,start+'\\chapter'.length).end;
 if(actual.slice(end).replace(/\\label\[chapter\]\{[^}]+\}/,'').trim())throw new Error(`Planned chapter now has content; register it: ${source}`);
 return {label,title,source,number:labels.get(label)?.number};
});
fs.writeFileSync(path.join(temporary,'inventory.json'),JSON.stringify({chapters,entries,planned},null,2));
fs.writeFileSync(path.join(temporary,'mathjax-macros.json'),JSON.stringify(mathMacros(fs.readFileSync(path.join(root,book.mathMacros),'utf8')),null,2));
fs.writeFileSync(path.join(temporary,'preamble-web.tex'),fs.readFileSync(path.join(root,'preamble.tex'),'utf8'));
