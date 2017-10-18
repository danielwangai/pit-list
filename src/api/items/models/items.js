import mongoose from 'mongoose';

const schema = new mongoose.Schema;

const itemSchema = schema({
  name: {
    type: String,
    required: [true, 'Item name is required.']
  },
  bucketlist: {
    type: Schema.Types.ObjectId, ref: 'Bucketlist',
    required: [true, 'Item must belong to a bucketlist.']
  },
  createdAt: {type: Date, default: Date.now() },
  modifiedAt: {type: Date, default: Date.now() }
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
