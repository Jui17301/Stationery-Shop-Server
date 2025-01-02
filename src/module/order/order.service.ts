import { productService } from '../product/product.service';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (orderData: IOrder) => {

  const product = await productService.getSingleProduct(orderData.product);
  if (!product) {
    throw new Error('Product not found');
  }
  if (orderData.quantity > product.quantity) {
    throw new Error('Insufficient stock available');
  }
  //Business logic-1
  product.quantity = product.quantity - orderData.quantity;
  //BusinessLogic -2
  if (product.quantity === 0) {
    product.inStock = false;
  }
  //updated data save to the DB
  await product.save();

  const newOrder = new Order({
    email: orderData.email,
    product: orderData.product,
    quantity: orderData.quantity,
    totalPrice: orderData.totalPrice,
  });

  return await newOrder.save();
};

const calculateRevenue = async () => {
  const result = await Order.aggregate([
    {
      $addFields: {
        productId: { $toObjectId: '$product' },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: {
            $multiply: ['$productDetails.price', '$quantity'],
          },
        },
      },
    },
  ]);

  const totalRevenue = result[0]?.totalRevenue || 0;
  return { totalRevenue };
};

export const orderService = {
  createOrder,
  calculateRevenue,
};
