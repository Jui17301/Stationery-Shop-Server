import express from 'express';
import productRouter from './module/product/product.router';
import orderRouter from './module/order/order.router';

const app = express();
//middleware

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

export default app;
