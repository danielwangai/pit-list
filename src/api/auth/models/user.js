import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const SALT_FACTOR = 10;
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

UserSchema.pre('save', function(next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);
    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// password validation
UserSchema.methods.validatePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// email validation
// UserSchema.path('email').validate((email) => {
//   return regex.test(email);
// }, 'Invalid email format.')

const User = mongoose.model('User', UserSchema);
export default User;
