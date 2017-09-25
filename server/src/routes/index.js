import express from 'express';
import passport from 'passport';
import handleRender from '../controllers/serverRenderController';
import { registerUser, validateRegister, loginUser } from '../controllers/userController';

const router = express.Router();

router.post('/auth/register', validateRegister, registerUser, loginUser);
router.post('/auth/login', loginUser);

router.get('/api/portfolio', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user);
  },
);

router.get('*', handleRender);

export default router;
