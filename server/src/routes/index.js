import express from 'express';
import handleRender from '../controllers/serverRenderController';
import { registerUser, validateRegister, loginUser } from '../controllers/userController';

const router = express.Router();

router.post('/auth/register', validateRegister, registerUser, loginUser);
router.post('/auth/login', loginUser);

router.get('*', handleRender);

export default router;
