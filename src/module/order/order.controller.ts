/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { Order } from './order.model';
import { productService } from '../product/product.service';

const createOrder = async (req:Request,res:Response) => {
  
  try {
    const orderData = req.body;
    // find productId for referencing product:
    const product = await productService.getSingleProduct(
      orderData.productId
    )
    //product available in product module??
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
       // Check quantity
  if (orderData.quantity > product.quantity) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient quantity available in inventory',
    });
  }

    // count available quantity
    product.quantity = product.quantity-orderData.quantity;

    // Update the inStock status if quantity becomes 0
    if (product.quantity === 0) {
      product.inStock = false;
    }

    // Save the updated product to the database
    await product.save();

    // Create the order
    const newOrder = new Order({
      email:orderData.email,
      product: orderData.productId,
      quantity:orderData.quantity,
      totalPrice:orderData.totalPrice,
    });

    const savedOrder = await newOrder.save();

    // Respond with the newly created order
    res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: savedOrder,
    });
  
  
  } 

catch(error){
  res.status(500).json({
        message: 'Something went wrong',
        success: false,
        error: error.message || 'Internal server error',
      });
}
}


export const OrderController={
  createOrder,
  
}
