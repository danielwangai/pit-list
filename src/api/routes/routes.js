import express from 'express';
import userController from '../auth/controller/auth';

const router = express.Router();

router.route('/register')
  .post(userController.register)



export default router;
