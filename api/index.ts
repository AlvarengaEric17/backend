// Importa a instância do Express que você já exportou no seu app.js
// Ajuste o caminho '../dist/app' se o seu build coloca o JS em outra pasta
const { app } = require('../dist/app');

// A Vercel espera que a exportação padrão seja a função que processa o request
module.exports = app;