import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {launchBrowser} from '../../../Animarium/publication/reader-shell-v1/browser-harness.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const contract=JSON.parse(fs.readFileSync(path.join(root,'output/web/_meta/public-contract.json'),'utf8'));
const origin=process.argv[2] || 'http://127.0.0.1:8881';
const browser=await launchBrowser(`${origin}/`);
const report=[];
// MathJax's noundefined package emits red mtext rather than merror.
// Audit both forms, otherwise an unsupported macro could pass unnoticed.
const errorSelector='mjx-merror,[data-mml-node="merror"],mjx-mtext[data-semantic-attributes*="color:red"],mjx-mtext[style*="color: red"]';
try {
  for (const route of contract.Routes.filter(route=>['frontmatter','chapter','section','references'].includes(route.Kind))) {
    await browser.navigate(`${origin}${route.Path}`);
    await browser.evaluate('window.MathJax.startup.promise.then(()=>true)');
    if(!report.length){
      const catchesUnknown=await browser.evaluate(`MathJax.tex2chtmlPromise('\\\\CodexIntentionalMissingMacro').then(node=>!!node.querySelector(${JSON.stringify(errorSelector)}))`);
      if(!catchesUnknown)throw new Error('The rendering audit does not detect undefined commands');
    }
    // Lazy images outside the viewport must be explicitly requested by this audit.
    await browser.evaluate(`Promise.all([...document.querySelectorAll('.diagram img')].map(async image=>{image.loading='eager'; await image.decode();})).then(()=>true)`);
    const result=await browser.evaluate(`({path:location.pathname,formulas:document.querySelectorAll('mjx-container').length,errors:[...document.querySelectorAll(${JSON.stringify(errorSelector)})].map(e=>({text:e.textContent,title:e.getAttribute('data-mjx-error')||e.getAttribute('title'),source:e.getAttribute('data-latex')||e.closest('mjx-math')?.getAttribute('data-latex')})),images:[...document.querySelectorAll('.diagram img')].map(e=>({loaded:e.complete&&e.naturalWidth>0,width:e.width,height:e.height})),residue:/\\\\(?:HCode|begin)\\b/.test(document.querySelector('.notes-page').textContent)})`);
    report.push(result);
    console.log(JSON.stringify(result));
  }
  fs.writeFileSync(path.join(root,'tmp/web/browser-validation.json'),JSON.stringify({pages:report,browserErrors:browser.errors},null,2));
  if (report.some(page=>page.errors.length || page.residue || page.images.some(image=>!image.loaded)) || browser.errors.length) throw new Error('Rendered pilot validation failed');
  console.log('Every pilot formula rendered without MathJax errors.');
} finally { await browser.close(); }
