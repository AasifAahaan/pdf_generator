import { Router } from 'express';
import { addProductsAndGeneratePDF } from '../controllers/productController';
import { isUser } from '../middlewares';


const router = Router();

router.post("/product", isUser, addProductsAndGeneratePDF)


export default router;