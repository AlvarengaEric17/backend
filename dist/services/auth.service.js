"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const user_model_1 = require("../models/user.model");
class AuthService {
    static async login(username, password) {
        const user = user_model_1.users.find((item) => item.username === username && item.password === password);
        if (!user) {
            throw new Error('Credenciais inválidas');
        }
        return jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
            role: user.role
        }, config_1.config.jwtSecret, { expiresIn: '8h' });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map