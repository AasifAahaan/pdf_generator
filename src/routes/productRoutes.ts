import { Router } from 'express';
import { addProductsAndGeneratePDF, downloadPdf, handleAllListOfPdf } from '../controllers/productController';
import { isUser } from '../middlewares';


const router = Router();

router.post("/product", isUser, addProductsAndGeneratePDF)
router.get("/products", isUser, handleAllListOfPdf)
router.get("/download/pdf/:id", isUser, downloadPdf)


export default router;