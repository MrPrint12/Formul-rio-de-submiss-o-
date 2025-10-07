const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/deposito', (req, res) => {
  const { numeroConta, numeroTalao, valor, data, banco } = req.body;
  if (!numeroConta || !numeroTalao || !valor || !data || !banco) {
    return res.status(400).json({ success: false, message: 'Preencha todos os campos.' });
  }
  const deposito = { numeroConta, numeroTalao, valor, data, banco, dataRegisto: new Date().toISOString() };
  const filePath = path.join(__dirname, 'depositos.json');
  let dados = [];
  if (fs.existsSync(filePath)) {
    dados = JSON.parse(fs.readFileSync(filePath));
  }
  dados.push(deposito);
  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
  res.json({ success: true, message: 'Depósito submetido com sucesso!' });
});

app.listen(PORT, () => console.log(`Servidor a correr em http://localhost:${PORT}`));
