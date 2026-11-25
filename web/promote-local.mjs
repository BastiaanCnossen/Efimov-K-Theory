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
// Keep one rollback bundle after a successful replacement. Only timestamped
// archives inside this project's output directory are eligible for pruning.
const output=path.join(root,'output');
const archives=fs.readdirSync(output,{withFileTypes:true})
 .filter(item=>item.isDirectory()&&/^web-previous-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z$/.test(item.name))
 .map(item=>item.name).sort().reverse();
const retained=saved?path.basename(previous):archives[0];
for(const name of archives){
 if(name===retained)continue;
 const target=path.resolve(output,name);
 if(path.dirname(target)!==output)throw new Error(`Unexpected archive path ${target}`);
 try{fs.rmSync(target,{recursive:true,force:true});}
 catch(error){console.warn(`Could not remove old preview ${name}: ${error.message}`);}
}
