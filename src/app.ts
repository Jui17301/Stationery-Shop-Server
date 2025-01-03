import express, { Request, Response } from 'express';
import productRouter from './module/product/product.router';
import orderRouter from './module/order/order.router';

const app = express();
//middleware
app.use(express.json());

//Main-routes
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Stationery Shop!');
});

// Route not found is not an error , it is an statement same as API NOT FOUND
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  });
});

export default app;
