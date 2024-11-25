import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
    },
    brand: {
      type: String,
      required: [true, 'Please enter product brand name'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
    },
    category: {
      type: String,
      enum: {
        values: ['Writing', 'Office Supplies', 'Educational', 'Technology'],
        message: '{VALUE} is incorrect,Please provide a category',
      },
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter description of product'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please enter product quantity'],
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = model<IProduct>('Product', productSchema);
