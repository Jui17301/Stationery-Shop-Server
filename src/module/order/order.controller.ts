import { Request, Response } from 'express';
import { orderService } from './order.service';

//   try {
//     const { email, order, quantity, totalPrice } = req.body;

//     const newOrder = new Order({
//       email,
//       order,
//       quantity,
//       totalPrice
//     });

//     const savedOrder = await newOrder.save();

//     res.status(201).json({
//       message: "Order created successfully",
//       success: true,
//       data: savedOrder
//     });
//   } catch (error:any) {
//     res.status(500).json({
//       message: "Something went wrong",
//       success: false,
//       error: error.message
//     });
//   }
// };
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity } = req.body;

    // Basic validation
    if (!email || !product || !quantity) {
      return res.status(400).json({
        message: 'Missing required fields: email, product, and quantity',
        success: false,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email format',
        success: false,
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        message: 'Quantity must be greater than 0',
        success: false,
      });
    }

    // Call service to create order
    const order = await orderService.createOrder(req.body);

    // Format response
    const formattedOrder = {
      id: order.id,
      email: order.email,
      product: order.product,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: formattedOrder,
    });
  } catch (error: any) {
    if (error.status === 404) {
      res.status(404).json({
        message: error.message,
        success: false,
      });
    } else if (error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: error.errors,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
        success: false,
        error: error.message || 'Internal server error',
      });
    }
  }
};
export const getRevenue = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const totalRevenue = await orderService.revenueOrder();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue, // Return the revenue in the response
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      status: false,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack, // Include error details for debugging
      },
    });
  }
};
