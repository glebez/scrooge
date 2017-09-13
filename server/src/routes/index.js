import express from 'express';
import handleRender from '../controllers/serverRenderController';
import { registerUser, validateRegister } from '../controllers/userController';

const router = express.Router();

router.post('/auth/register', validateRegister, registerUser);

router.get('*', handleRender);

export default router;
