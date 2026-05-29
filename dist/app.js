"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.app = void 0;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = require("./routes/auth.route");
const orders_route_1 = require("./routes/orders.route");
const error_middleware_1 = require("./middleware/error.middleware");
const logger_middleware_1 = require("./middleware/logger.middleware");
const config_1 = require("./config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return config_1.config; } });
const app = (0, express_1.default)();
exports.app = app;
// 1. Configuração de CORS: 
// Permitimos todas as origens para desenvolvimento. 
// Em produção, substitua '*' pelo domínio do seu frontend.
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// 2. Parsers de corpo da requisição
app.use((0, express_1.json)());
// 3. Logger de requisições (deve vir antes das rotas)
app.use(logger_middleware_1.requestLogger);
// 4. Rota de Health Check (útil para monitorar se o backend está vivo)
app.get('/api/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        env: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});
// 5. Rotas da API
app.use('/api/auth', auth_route_1.authRouter);
app.use('/api/orders', orders_route_1.ordersRouter);
// 6. Middleware de tratamento de erros (deve ser o último a ser declarado)
app.use(error_middleware_1.errorHandler);
//# sourceMappingURL=app.js.map