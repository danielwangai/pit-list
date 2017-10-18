import mongoose from 'mongoose';

// import * as Item from '../../items';
// // import User from '../../auth';
// //
// // console.log("test user\n\n", User);

const Schema = mongoose.Schema;

const bucketlistSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Bucketlist name is required.']
  },
  description: {
    type: String,
    required: false
  },
  items: [{
    type: Schema.Types.ObjectId, ref: 'Item'
  }],
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: 'Bucketlist must belong to a user.'
  },
  createdAt: {type: Date, default: Date.now() },
  modifiedAt: {type: Date, default: Date.now() }
})

const Bucketlist = mongoose.model('Bucketlist', bucketlistSchema);
export default Bucketlist;
