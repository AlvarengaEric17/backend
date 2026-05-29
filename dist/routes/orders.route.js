"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const express_1 = require("express");
const orders_controller_1 = require("../controllers/orders.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.ordersRouter = router;
router.use(auth_middleware_1.authMiddleware);
router.get('/', orders_controller_1.OrdersController.list);
router.post('/', orders_controller_1.OrdersController.create);
router.get('/:id', orders_controller_1.OrdersController.get);
router.post('/:id/status', orders_controller_1.OrdersController.updateStatus);
router.post('/:id/print', orders_controller_1.OrdersController.printOrder);
//# sourceMappingURL=orders.route.js.map