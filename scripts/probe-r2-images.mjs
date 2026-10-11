// Probe real WebP dimensions from R2. Usage:
//   node scripts/probe-r2-images.mjs <prefix> <file1> <file2> ...
// Downloads each file to /tmp (small, one at a time) and parses the WebP
// container header for the exact canvas size. Reports 404s loudly.
import {execFileSync} from 'node:child_process';
import {readFileSync, mkdirSync, rmSync} from 'node:fs';

const BASE='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/';
const prefix=process.argv[2];
const files=process.argv.slice(3);
if(!prefix||!files.length){console.error('usage: node probe-r2-images.mjs <prefix> <files...>');process.exit(1);}

// Minimal WebP dimension parser (RIFF container, VP8X/VP8/VP8L chunks)
function webpSize(buf){
  if(buf.length<30||buf.toString('ascii',0,4)!=='RIFF'||buf.toString('ascii',8,12)!=='WEBP')return null;
  const fourcc=buf.toString('ascii',12,16);
  if(fourcc==='VP8X'){
    // 24-bit width-1 / height-1 at offsets 24 and 27
    const w=1+(buf[24]|buf[25]<<8|buf[26]<<16);
    const h=1+(buf[27]|buf[28]<<8|buf[29]<<16);
    return {w,h};
  }
  if(fourcc==='VP8 '){
    // lossy: frame tag 3 bytes, start code 0x9d 0x01 0x2a at offset 23? then 14-bit dims
    const sync=buf.readUInt16LE(23+3-3); // simplify: search for 0x9d 0x01 0x2a
    for(let i=20;i<40;i++){
      if(buf[i]===0x9d&&buf[i+1]===0x01&&buf[i+2]===0x2a){
        const w=buf.readUInt16LE(i+3)&0x3fff;
        const h=buf.readUInt16LE(i+5)&0x3fff;
        return {w,h};
      }
    }
    return null;
  }
  if(fourcc==='VP8L'){
    // lossless: signature byte 0x2f then 14-bit w-1 / h-1
    const b=buf[21];
    if(b!==0x2f)return null;
    const bits=buf.readUInt32LE(22);
    const w=(bits&0x3fff)+1;
    const h=((bits>>14)&0x3fff)+1;
    return {w,h};
  }
  return null;
}

const dir='/home/z/my-project/scripts/.probe-tmp';
rmSync(dir,{recursive:true,force:true});mkdirSync(dir,{recursive:true});
const out=[];
for(const f of files){
  const url=BASE+prefix+f;
  const dest=dir+'/'+f;
  try{
    execFileSync('curl',['-sS','--max-time','60','-o',dest,'-w','%{http_code} %{size_download}',url],{stdio:['ignore','pipe','pipe']});
    const buf=readFileSync(dest);
    const size=webpSize(buf);
    out.push({file:f,bytes:buf.length,w:size?size.w:null,h:size?size.h:null,url});
    console.log(`${f}\t${size?size.w+'x'+size.h:'PARSE-FAIL'}\t${(buf.length/1024).toFixed(1)}kB`);
  }catch(e){
    console.error(`${f}\tDOWNLOAD-FAIL\t${e.message.split('\n')[0]}`);
    out.push({file:f,error:e.message.split('\n')[0],url});
  }
}
rmSync(dir,{recursive:true,force:true});
console.log('---JSON---');
console.log(JSON.stringify(out));
