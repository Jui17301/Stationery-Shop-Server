import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (searchTerm: string) => {
  let filter = {};
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i'); // Case-insensitive regex
    filter = {
      $or: [{ name: regex }, { brand: regex }, { category: regex }],
    };
  }
  const result = await Product.find(filter);
  return result;
};
const getSingleProduct = async (id: string) => {
  const result = await Product.findById(id).select('-__v');
  return result;
};
const updateProduct = async (id: string, data: IProduct) => {
  const result = await Product.findByIdAndUpdate(id, data, {
    new: true,
  }).select('-__v');
  return result;
};
const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const productService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
