/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { productService } from './product.service';
import { productValidationSchema } from './product.zodValidation';
import { formatErrorResponse } from '../../error/formattedError';

const createProduct = async (req: Request, res: Response): Promise<void> => {
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
        error: formatErrorResponse(error),
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
        success: false,
        error: formatErrorResponse(error),
      });
    }
  }
};

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
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
        error: formatErrorResponse(error),
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
        success: false,
        error: formatErrorResponse(error),
      });
    }
  }
};

const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    const result = await productService.getSingleProduct(productId);
    if (!result) {
      res.status(404).json({
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
      error: formatErrorResponse(error),
    });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    const body = req.body;
    const result = await productService.updateProduct(productId, body);
    res.send({
      message: 'Product updated Successfully!!!',
      status: true,
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error: formatErrorResponse(error),
    });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    await productService.deleteProduct(productId);
    res.send({
      message: 'Product deleted Successfully',
      status: true,
      data: {},
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error: formatErrorResponse(error),
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
