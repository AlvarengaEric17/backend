"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualOrderStorage = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const storageDir = path_1.default.resolve(__dirname, '../../data');
const storageFile = path_1.default.join(storageDir, 'manual-orders.json');
async function ensureStorageDir() {
    await promises_1.default.mkdir(storageDir, { recursive: true });
}
async function readStorage() {
    await ensureStorageDir();
    try {
        const raw = await promises_1.default.readFile(storageFile, 'utf-8');
        return JSON.parse(raw);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return { nextId: -1, orders: [] };
        }
        throw error;
    }
}
async function writeStorage(data) {
    await ensureStorageDir();
    await promises_1.default.writeFile(storageFile, JSON.stringify(data, null, 2), 'utf-8');
}
class ManualOrderStorage {
    static async list() {
        const storage = await readStorage();
        return storage.orders;
    }
    static async get(orderId) {
        const storage = await readStorage();
        return storage.orders.find((order) => order.id === orderId) || null;
    }
    static async create(order) {
        const storage = await readStorage();
        const newOrder = {
            ...order,
            id: storage.nextId,
        };
        storage.nextId -= 1;
        storage.orders.unshift(newOrder);
        await writeStorage(storage);
        return newOrder;
    }
    static async update(orderId, updates) {
        const storage = await readStorage();
        const index = storage.orders.findIndex((order) => order.id === orderId);
        if (index === -1) {
            throw new Error('Pedido manual não encontrado');
        }
        storage.orders[index] = {
            ...storage.orders[index],
            ...updates
        };
        await writeStorage(storage);
        return storage.orders[index];
    }
}
exports.ManualOrderStorage = ManualOrderStorage;
//# sourceMappingURL=manual-orders.storage.js.map