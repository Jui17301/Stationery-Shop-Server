import { Router } from 'express';
import { productController } from './product.controller';

const productRouter = Router();

productRouter.post('/', productController.createProduct);
productRouter.get('/', productController.getAllProducts);
productRouter.get('/:productId', productController.getSingleProduct);
productRouter.put('/:productId', productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);

export default productRouter;
