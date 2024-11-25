/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { productService } from './product.service';
import { productValidationSchema } from './product.zodValidation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const zodParsedDate = productValidationSchema.parse(payload);
    const product = await productService.createProduct(zodParsedDate);
    const formattedProduct = {
      _id: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      category: product.category,
      description: product.description,
      quantity: product.quantity,
      inStock: product.inStock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
    res.json({
      message: 'Product created Successfully',
      success: true,
      data: formattedProduct,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: error.name,
          errors: error.errors,
        },
        stack: error.stack,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
        success: false,
        error: {
          name: error.name || 'Error',
          message: error.message || 'An unexpected error occurred',
        },
        stack: error.stack,
      });
    }
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const products = await productService.getAllProducts(searchTerm as string);
    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      category: product.category,
      description: product.description,
      quantity: product.quantity,
      inStock: product.inStock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
    res.status(200).json({
      message: 'Products retrieved successfully',
      status: true,
      data: formattedProducts,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: error.name,
          errors: error.errors,
        },
        stack: error.stack,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
        success: false,
        error: {
          name: error.name || 'Error',
          message: error.message || 'An unexpected error occurred',
        },
        stack: error.stack,
      });
    }
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getSingleProduct(productId);
    if (!result) {
      return res.status(404).json({
        message: 'Product not found',
        status: false,
      });
    }

    res.status(200).json({
      message: 'Product retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      status: false,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const body = req.body;
    const result = await productService.updateProduct(productId, body);
    res.send({
      message: 'Product is updated Successfully!!!',
      status: true,
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await productService.deleteProduct(productId);
    res.send({
      status: true,
      message: 'Product deleted Successfully',
      data: {},
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
