import { Router } from 'express';
import { createOrder, getRevenue } from './order.controller';

export const orderRouter = Router();

orderRouter.post('/',createOrder);
orderRouter.get('/revenue', getRevenue);

export default orderRouter;
