"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const config_1 = require("../config");
const woo_service_1 = require("./woo.service");
const manual_orders_storage_1 = require("../storage/manual-orders.storage");
const printer_util_1 = require("../utils/printer.util");
const cache = new node_cache_1.default({ stdTTL: config_1.config.cacheTtlSeconds, checkperiod: 5 });
class OrderService {
    static async list(params) {
        const cacheKey = 'orders-list';
        let orders = cache.get(cacheKey);
        if (!orders) {
            const [wooOrders, manualOrders] = await Promise.all([
                woo_service_1.WooService.fetchOrders(),
                manual_orders_storage_1.ManualOrderStorage.list()
            ]);
            orders = [...manualOrders, ...wooOrders];
            cache.set(cacheKey, orders);
        }
        if (config_1.config.printAutomatic) {
            const knownIds = cache.get('known-order-ids') || [];
            const freshOrders = orders.filter((order) => order.status === 'novo' && !knownIds.includes(order.id));
            freshOrders.forEach((order) => {
                console.log('Impressão automática de pedido recebido:', order.number);
                console.log((0, printer_util_1.formatPrintTicket)(order));
            });
            const allKnownIds = Array.from(new Set([...knownIds, ...freshOrders.map((order) => order.id)]));
            cache.set('known-order-ids', allKnownIds);
        }
        if (params.status) {
            orders = orders.filter((order) => order.status === params.status);
        }
        if (params.search) {
            const query = params.search.toLowerCase();
            orders = orders.filter((order) => order.number.toLowerCase().includes(query) ||
                order.customerName.toLowerCase().includes(query) ||
                order.phone.toLowerCase().includes(query));
        }
        if (params.sort === 'asc') {
            orders = orders.slice().sort((a, b) => a.date.localeCompare(b.date));
        }
        return orders;
    }
    static async get(orderId) {
        const cacheKey = `order-${orderId}`;
        let order = cache.get(cacheKey);
        if (!order) {
            const manualOrder = await manual_orders_storage_1.ManualOrderStorage.get(orderId);
            if (manualOrder) {
                order = manualOrder;
            }
            else {
                order = await woo_service_1.WooService.fetchOrderById(orderId);
            }
            cache.set(cacheKey, order);
        }
        return order;
    }
    static async createManualOrder(orderData) {
        const order = await manual_orders_storage_1.ManualOrderStorage.create(orderData);
        cache.del('orders-list');
        cache.del(`order-${order.id}`);
        return order;
    }
    static async updateStatus(orderId, status) {
        const manualOrder = await manual_orders_storage_1.ManualOrderStorage.get(orderId);
        let order;
        if (manualOrder) {
            order = await manual_orders_storage_1.ManualOrderStorage.update(orderId, {
                status,
                wooStatus: 'manual'
            });
        }
        else {
            order = await woo_service_1.WooService.updateOrderStatus(orderId, status);
        }
        cache.del('orders-list');
        cache.del(`order-${orderId}`);
        return order;
    }
    static async printOrder(orderId) {
        const order = await OrderService.get(orderId);
        return (0, printer_util_1.formatPrintTicket)(order);
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map