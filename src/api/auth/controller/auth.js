import User from '../models/user';
import bcrypt from 'bcrypt';
import {jwtjsonwebtoken as jwt} from 'jsonwebtoken';

const userController = {
  register: (req, res) => {
    console.log("REQUEST\n\n", req.body);
    User.findOne({ email: req.body.email }, (err, users) => {
      console.log("REQUEST ((1))\n\n", req.body);
      if(!users.length) {
        const user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.save(() => {
          if(err) {
            res.status(500).json(err)
          } else {
            return res.status(201).json(user)
          }
        })
      } else {
        return res.status(409).json(err);
      }
    })
  }
}

export default userController;
