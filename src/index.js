const https = require('https');
const fs = require('fs');
const crypto = require('crypto');
const cors = require('cors');
const express = require('express');

const app = express(); // Inicializa o Express

// Lê os arquivos de certificado e chave
const certificado = fs.readFileSync('/etc/letsencrypt/archive/mostbr.com.br.server-node.mostbr.com.br/cert1.pem');
const chave = fs.readFileSync('/etc/letsencrypt/archive/mostbr.com.br.server-node.mostbr.com.br/privkey1.pem');
const ca = fs.readFileSync('/etc/letsencrypt/archive/mostbr.com.br.server-node.mostbr.com.br/chain1.pem');

// Configuração do CORS
const corsOptions = {
    origin: ['https://app.flutterflow.io', 'https://app.mostbr.com.br'],
    optionsSuccessStatus: 200
};

// Opções para o servidor HTTPS
const credentials = { 
    key: chave, 
    cert: certificado, 
    ca: ca 
};

// Configuração do middleware do Express
app.use(cors(corsOptions));
app.use(express.json());

// Definição de rotas
app.get('/uuid', (req, res) => {
    const uuid = crypto.randomUUID();
    res.status(200).json({ uuid });
});

// Criação do servidor HTTPS
const server = https.createServer(credentials, app);

const PORT = 3000; // Porta do servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando em https://localhost:${PORT}`);
});