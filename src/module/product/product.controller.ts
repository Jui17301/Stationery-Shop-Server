
import { Request, Response } from "express";
import { productService } from "./product.service";


const createProduct = async(req:Request,res:Response)=>{

    try {
        const payload = req.body
        const product = await productService.createProduct(payload);
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
       
        message:"Product created Successfully!!!",
        success:true,
        data:formattedProduct
    })
    }
    catch (error: any) {
        if (error.name === "ValidationError") {
          res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
              name: error.name,
              errors: error.errors,
            },
            stack: error.stack
          });
        } else {
          res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: {
              name: error.name || "Error",
              message: error.message || "An unexpected error occurred",
            },
            stack: error.stack
          });
        }
      }
}

const getAllProducts = async(req:Request,res:Response)=>{
try {
    const result = await productService.getAllProducts();
    res.send({
        status:true,
        message:"All Products are retrieved Successfully!!!",
        data:result

    })
} 
catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({
        message: "Validation failed",
        success: false,
        error: {
          name: error.name,
          errors: error.errors,
        },
        stack: error.stack
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: {
          name: error.name || "Error",
          message: error.message || "An unexpected error occurred",
        },
        stack: error.stack
      });
    }
  }
}

const getSingleProduct = async(req:Request,res:Response)=>{
    try {
        const productId = req.params.productId
        const result = await productService.getSingleProduct(productId);
        res.send({
            status:true,
            message:"Product is retrieved Successfully!!!",
            data:result
    
        })
    } catch (error) {
        res.json({
            status:false,
            message:'Something went wrong',
            error
        })
    }
    }

    const updateProduct = async(req:Request,res:Response)=>{
        try {
            const productId = req.params.productId;
            const body = req.body
            const result = await productService.updateProduct(productId,body);
            res.send({
                status:true,
                message:"Product is updated Successfully!!!",
                data:result
        
            })
        } catch (error) {
            res.json({
                status:false,
                message:'Something went wrong',
                error
            })
        }
        }

        const deleteProduct = async(req:Request,res:Response)=>{
            try {
                const productId= req.params.productId;
                const result = await productService.deleteProduct(productId);
                res.send({
                    status:true,
                    message:"Product is deleted Successfully!!!",
                    data:result
            
                })
            } catch (error) {
                res.json({
                    status:false,
                    message:'Something went wrong',
                    error
                })
            }
            }

export const productController={
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}