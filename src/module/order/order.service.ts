/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { productService } from '../product/product.service';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (orderData: IOrder) => {
  // const result = await Order.create(payload);
  // return result;

  // const { productId, quantity } = orderData;
  // find productId for referencing product:
  const product = await productService.getSingleProduct(orderData.product);
  //product available in product module??
  if (!product) {
    throw new Error('Product not found');
  }
  // Check quantity
  if (orderData.quantity > product.quantity) {
    throw new Error('Insufficient stock available');
  }

  // count available quantity
  product.quantity = product.quantity - orderData.quantity;

  // Update the inStock status if quantity becomes 0
  if (product.quantity === 0) {
    product.inStock = false;
  }

  // Save the updated product to the database
  await product.save();

  // Create the order
  const newOrder = new Order({
    // _id:orderData._id,
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
