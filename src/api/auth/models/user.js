import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const regex = "!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.";
const salt = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.']
  },
  password: {
    type: String,
    required: [true, 'password is required.']
  },
  createdAt: {type: Date, default: Date.now() },
  modifiedAt: {type: Date, default: Date.now() }
});

UserSchema.pre('save', (next) => {
  let user = this;
  if(!user.isModified('password')) next();
  bcrypt.genSalt(salt, (err, salt) => {
    if (err)  next(err)
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) next(err);
      user.password = hash;
      next();
    });
  })
})

// email validation
UserSchema.path('email').validate((email) => {
  return regex.test(email);
}, 'Invalid email format.')

const User = mongoose.model('User', UserSchema);
export default User;
