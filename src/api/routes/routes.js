import express from 'express';
import Authenticate from './authenticate';
import {usersController} from '../auth';
import {bucketlistsController} from '../bucketlists'
import {itemsController} from '../items';

const router = express.Router();

router.route('/register')
  .post(usersController.register)

router.route('/login')
  .post(usersController.login)

router.use('/', Authenticate.loginRequired)

router.route('/bucketlists')
  .post(bucketlistsController.createBucketlist)
  .get(bucketlistsController.all)

router.route('/bucketlists/:id')
  .get(bucketlistsController.getOneBucketlist)
  .put(bucketlistsController.updateBucketlist)
  .delete(bucketlistsController.deleteBucketlist)

router.route('/bucketlists/:id/items')
  .post(itemsController.createItem)
  .get(itemsController.fetchAllItems)

router.route('/bucketlists/:id/items/:itemId')
  .get(itemsController.fetchSingleItem)

export default router;
