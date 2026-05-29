"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const order_service_1 = require("../services/order.service");
class OrdersController {
    static async list(req, res, next) {
        try {
            const status = String(req.query.status || '');
            const search = String(req.query.search || '');
            const sort = String(req.query.sort || 'desc');
            const orders = await order_service_1.OrderService.list({ status, search, sort });
            res.json(orders);
        }
        catch (error) {
            next(error);
        }
    }
    static async get(req, res, next) {
        try {
            const orderId = Number(req.params.id);
            const order = await order_service_1.OrderService.get(orderId);
            res.json(order);
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const order = await order_service_1.OrderService.createManualOrder(req.body);
            res.status(201).json(order);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const orderId = Number(req.params.id);
            const { status } = req.body;
            const order = await order_service_1.OrderService.updateStatus(orderId, status);
            res.json(order);
        }
        catch (error) {
            next(error);
        }
    }
    static async printOrder(req, res, next) {
        try {
            const orderId = Number(req.params.id);
            const ticket = await order_service_1.OrderService.printOrder(orderId);
            res.json({ ticket });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map