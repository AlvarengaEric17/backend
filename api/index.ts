// api/index.js
const { app } = require('../src/app');

// Aqui exportamos o app para que a Vercel o use como handler
module.exports = app;