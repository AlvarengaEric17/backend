// api/index.js
// Importa o app que foi compilado na sua pasta 'dist' (ou 'build')
const { app } = require('../dist/app'); 

// Exporta o app como o padrão. O Express já é uma função (req, res) 
// que a Vercel consegue executar perfeitamente.
module.exports = app;