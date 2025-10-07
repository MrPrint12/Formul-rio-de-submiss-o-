const express = require('express'); const fs = require('fs'); const path = require('path'); const app = express(); const PORT = 3000;

app.use(express.json());

const USER = 'mrprint'; const PASS = 'hackserver';

app.use((req, res, next) => { const auth = req.headers.authorization; if (!auth) { res.setHeader('WWW-Authenticate', 'Basic realm="Área restrita"'); return res.status(401).send('Autenticação necessária'); } const b64 = auth.split(' ')[1]; const [user, pass] = Buffer.from(b64, 'base64').toString().split(':'); if (user === USER && pass === PASS) { return next(); } res.setHeader('WWW-Authenticate', 'Basic realm="Área restrita"'); return res.status(401).send('Usuário ou senha inválidos'); });

const filePath = path.join(__dirname, 'depositos.json');

function lerDepositos(){ if(fs.existsSync(filePath)){ return JSON.parse(fs.readFileSync(filePath, 'utf8')); } return []; }

app.post('/api/deposito/check', (req,res)=>{ const { numeroConta, numeroTalao } = req.body; const dados = lerDepositos(); if(dados.some(d => d.numeroConta === numeroConta || d.numeroTalao === numeroTalao)){ return res.json({ ok:false, message:'Número de conta ou talão já registado.' }); } return res.json({ ok:true }); });

app.post('/api/deposito', (req,res)=>{ const { numeroConta, numeroTalao, valor, data, banco } = req.body; if(!numeroConta || !numeroTalao || !valor || !data || !banco){ return res.status(400).json({ success:false, message:'Todos os campos são obrigatórios.' }); } let dados = lerDepositos(); dados.push({ numeroConta, numeroTalao, valor, data, banco, dataRegisto: new Date().toISOString() }); fs.writeFileSync(filePath, JSON.stringify(dados, null, 2)); return res.json({ success:true }); });

app.use(express.static(__dirname));

app.listen(PORT, ()=>{ console.log(Servidor a correr em http://localhost:${PORT}); });

app.post('/api/deposito/check', (req,res)=>{
  const { numeroConta, numeroTalao } = req.body;
  const dados = lerDepositos();
  if(dados.some(d => d.numeroConta === numeroConta || d.numeroTalao === numeroTalao)){
    return res.json({ ok:false, message:'Número de conta ou talão já registado.' });
  }
  return res.json({ ok:true });
});

app.post('/api/deposito', (req,res)=>{
  const { numeroConta, numeroTalao, valor, data, banco } = req.body;
  if(!numeroConta || !numeroTalao || !valor || !data || !banco){
    return res.status(400).json({ success:false, message:'Todos os campos são obrigatórios.' });
  }

  let dados = lerDepositos();
  dados.push({ numeroConta, numeroTalao, valor, data, banco, dataRegisto: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));

  return res.json({ success:true });
});

app.use(express.static(__dirname));

app.listen(PORT, ()=>{
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
