import express from 'express';
import passport from 'passport';
import handleRender from '../controllers/serverRenderController';
import { registerUser, validateRegister, loginUser } from '../controllers/userController';
import { savePortfolio, getPortfolio } from '../controllers/portfolioController';

const router = express.Router();

router.post('/auth/register', validateRegister, registerUser, loginUser);
router.post('/auth/login', loginUser);

router.post('/api/portfolio',
  passport.authenticate('jwt', { session: false }),
  savePortfolio,
);

router.get('/api/portfolio',
  passport.authenticate('jwt', { session: false }),
  getPortfolio,
);

router.get('*', handleRender);

export default router;
