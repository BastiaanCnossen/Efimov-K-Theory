import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'efimov-preview-test-'));
const output=path.join(fixture,'output');
const stage=path.join(output,'web-staging');
const live=path.join(output,'web');
const script=path.join(fixture,'web/promote-local.mjs');
function candidate(text){
 fs.mkdirSync(path.join(stage,'_meta'),{recursive:true});
 fs.writeFileSync(path.join(stage,'_meta/pilot-validation.json'),'{}');
 fs.writeFileSync(path.join(stage,'index.html'),text);
}
function promote(target=stage){return spawnSync(process.execPath,[script,target],{encoding:'utf8'});}
try{
 fs.mkdirSync(path.dirname(script),{recursive:true});
 fs.copyFileSync(new URL('./promote-local.mjs',import.meta.url),script);
 fs.mkdirSync(live,{recursive:true});fs.writeFileSync(path.join(live,'index.html'),'original');
 for(const stamp of ['2026-10-27T23-06-03-122Z','2026-10-27T23-10-06-470Z'])
  fs.mkdirSync(path.join(output,`web-previous-${stamp}`));
 const manual=path.join(output,'web-previous-manual');fs.mkdirSync(manual);
 candidate('replacement');
 let result=promote();assert.equal(result.status,0,result.stderr);
 assert.equal(fs.readFileSync(path.join(live,'index.html'),'utf8'),'replacement');
 let archives=fs.readdirSync(output).filter(name=>/^web-previous-\d/.test(name));
 assert.equal(archives.length,1);
 assert.equal(fs.readFileSync(path.join(output,archives[0],'index.html'),'utf8'),'original');
 assert(fs.existsSync(manual),'Unrelated output directories must survive pruning.');
 // An unvalidated candidate must leave the live preview and rollback untouched.
 fs.mkdirSync(stage);fs.writeFileSync(path.join(stage,'index.html'),'unvalidated');
 result=promote();assert.notEqual(result.status,0);
 assert.equal(fs.readFileSync(path.join(live,'index.html'),'utf8'),'replacement');
 assert(fs.existsSync(path.join(output,archives[0],'index.html')));
 fs.rmSync(stage,{recursive:true});
 candidate('second replacement');
 result=promote();assert.equal(result.status,0,result.stderr);
 archives=fs.readdirSync(output).filter(name=>/^web-previous-\d/.test(name));
 assert.equal(archives.length,1);
 assert.equal(fs.readFileSync(path.join(output,archives[0],'index.html'),'utf8'),'replacement');
 result=promote(manual);assert.notEqual(result.status,0);
 assert(fs.existsSync(manual));
 console.log('Preview promotion, retention, and failed-validation preservation passed.');
}finally{fs.rmSync(fixture,{recursive:true,force:true});}
