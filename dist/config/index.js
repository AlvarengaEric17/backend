"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const rawWooUrl = process.env.WOO_URL || '';
const normalizedWooUrl = rawWooUrl.replace(/\/+$|\s+$/g, '');
const wooApiPath = '/wp-json/wc/v3';
const wooUrl = normalizedWooUrl.includes(wooApiPath) ? normalizedWooUrl : `${normalizedWooUrl}${wooApiPath}`;
exports.config = {
    port: Number(process.env.PORT || 4000),
    jwtSecret: process.env.JWT_SECRET || 'changeme',
    pollIntervalMs: Number(process.env.POLL_INTERVAL_MS || 7000),
    printAutomatic: process.env.PRINT_AUTOMATIC === 'true',
    cacheTtlSeconds: Number(process.env.API_CACHE_TTL_SECONDS || 10),
    woo: {
        url: wooUrl,
        consumerKey: process.env.WOO_CONSUMER_KEY || '',
        consumerSecret: process.env.WOO_CONSUMER_SECRET || ''
    }
};
//# sourceMappingURL=index.js.map