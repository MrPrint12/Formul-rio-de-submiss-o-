# 💰 Formulário de Submissão de Depósito

Aplicação web simples para registo de depósitos bancários.

## ⚙️ Funcionalidades
- Submissão de dados: número da conta, talão, valor, banco e data
- Espera de 30 segundos antes da confirmação
- Mensagem automática “Submissão feita com êxito!”
- Armazenamento local em `depositos.json`

## 🚀 Como Executar
1. Instale o Node.js (https://nodejs.org/)
2. Abra a pasta do projeto no terminal
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Execute o servidor:
   ```bash
   npm start
   ```
5. Abra o navegador e aceda a:
   ```
   http://localhost:3000
   ```

## 🧱 Estrutura do Projeto
```
index.html      → Página principal com formulário
server.js       → Backend Node.js com Express
depositos.json  → Ficheiro onde os registos são guardados
package.json    → Configuração do Node.js e comandos
```

⚠️ **Nota:** Este projeto é apenas uma simulação e **não está ligado a bancos reais**.
