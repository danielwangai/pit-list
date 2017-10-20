import express from 'express';
import Authenticate from './authenticate';
import userController from '../auth/controller/auth';
import bucketlistsController from '../bucketlists/controllers/bucketlists';

const router = express.Router();

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

router.use('/', Authenticate.loginRequired)

router.route('/bucketlists')
  .post(bucketlistsController.createBucketlist)

export default router;
