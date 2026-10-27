import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const stage=path.resolve(process.argv[2]||'');
const expected=path.join(root,'output/web-staging');
if(stage!==expected)throw new Error(`Unexpected staging path ${stage}`);
if(!fs.existsSync(path.join(stage,'_meta/pilot-validation.json')))throw new Error('Candidate lacks successful validation');
const live=path.join(root,'output/web');
const previous=path.join(root,`output/web-previous-${new Date().toISOString().replace(/[:.]/g,'-')}`);
let saved=false;
try{
 if(fs.existsSync(live)){fs.renameSync(live,previous);saved=true;}
 fs.renameSync(stage,live);
}catch(error){if(saved&&!fs.existsSync(live))fs.renameSync(previous,live);throw error;}
console.log(`Updated the local preview: ${live}`);
