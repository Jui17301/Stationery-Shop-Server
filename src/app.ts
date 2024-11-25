import express, { Request, Response } from 'express';
import productRouter from './module/product/product.router';
// import orderRouter from './module/order/order.router';

const app = express();
//middleware
app.use(express.json());

//Main-routes
app.use('/api/products', productRouter);
// app.use('/api/orders', orderRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Stationery Shop!");
  });

export default app;
