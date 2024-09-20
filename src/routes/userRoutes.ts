import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/userController';
import { loginValidation, registerValidation } from '../validators/userValidator';

const router = Router();

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);


export default router;