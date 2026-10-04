import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml','.json':'application/json','.txt':'text/plain'};
createServer(async(req,res)=>{
 try {
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);return res.end('Forbidden');}
  try {if((await stat(file)).isDirectory()){if(!pathname.endsWith('/')){res.writeHead(301,{Location:pathname+'/'});return res.end();}file+='/index.html';}}
  catch {file=root+'/404.html';res.statusCode=404;}
  res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');
  res.end(await readFile(file));
 }catch{res.writeHead(400);res.end('Bad request');}
}).listen(4173,'0.0.0.0',()=>console.log('Preview: http://localhost:4173'));
