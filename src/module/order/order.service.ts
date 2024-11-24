import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  // const result = await Order.create(payload);
  // return result
  // Validate product existence
  const product = await Product.findById(payload.product);
  if (!product) {
    throw { status: 404, message: 'Product not found' };
  }

  // Check stock availability
  if (product.quantity < payload.quantity) {
    throw { status: 400, message: 'Insufficient stock for the product' };
  }

  // Calculate total price
  const totalPrice = product.price * payload.quantity;

  // Create the order
  const order = new Order({
    email: payload.email,
    product: payload.product,
    quantity: payload.quantity,
    totalPrice,
  });

  const savedOrder = await order.save();

  // Deduct stock after successful order creation
  product.quantity -= payload.quantity;
  await product.save();

  return savedOrder;
};

const revenueOrder = async (): Promise<any> => {
  // const revenueResult = await Order.aggregate([

  //     {
  //         $lookup: {
  //           from: "products",
  //           localField: "product",
  //           foreignField: "_id",
  //           as: "productDetails"
  //         },
  //       },
  //       { $unwind: "$productDetails" },
  //       {
  //         $group: {
  //           _id: null,
  //           totalRevenue: {
  //             $sum: {
  //               $multiply: ["$productDetails.price", "$quantity"]
  //             },
  //           },
  //         },
  //       },
  // ])
  // return revenueResult[0]?.totalRevenue || 0;
  try {
    const revenueResult = await Order.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: 'id',
          as: 'productDetails',
        },
      },
      { $unwind: '$productDetails' },
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
    return revenueResult[0]?.totalRevenue || 0;
  } catch (error: any) {
    throw { status: 500, message: 'Error calculating revenue', details: error };
  }
};
export const orderService = { createOrder, revenueOrder };
