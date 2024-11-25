import { Router } from 'express';
import { OrderController } from './order.controller';


export const orderRouter = Router();

orderRouter.post('/',OrderController.createOrder);
// orderRouter.get('/revenue',OrderController.);

export default orderRouter;
