"use strict";
// import { app, config } from './app';
Object.defineProperty(exports, "__esModule", { value: true });
// const port = config.port;
// app.listen(port, () => {
//   console.log(`Backend executando em http://localhost:${port}`);
// });
// src/server.ts
const app_1 = require("./app"); // Importando de ./app.ts
const port = app_1.config.port;
app_1.app.listen(port, () => {
    console.log(`Backend executando em http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map