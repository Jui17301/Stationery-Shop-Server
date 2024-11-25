import { Router } from 'express';
import { OrderController } from './order.controller';

const orderRouter = Router();

orderRouter.post('/', OrderController.createOrder);
orderRouter.get('/revenue', OrderController.calculateRevenue);

export default orderRouter;
