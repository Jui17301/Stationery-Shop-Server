import { Request, Response } from 'express';

import { orderValidationSchema } from './order.zodValidation';
import { orderService } from './order.service';
import { formatErrorResponse } from '../../error/formattedError';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const zodParsedValidation = orderValidationSchema.parse(orderData);
    const result = await orderService.createOrder(zodParsedValidation);
    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: formatErrorResponse(error),
    });
  }
};
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await orderService.calculateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: revenue,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: formatErrorResponse(error),
    });
  }
};

export const OrderController = {
  createOrder,
  calculateRevenue,
};
