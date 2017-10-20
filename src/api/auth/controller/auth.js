import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

const userController = {
  register: (req, res) => {
    console.log("REQUEST\n\n", req.body);
    if(!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({
        status: "fail",
        message: "All fields required."
      })
    }
    User.find({ email: req.body.email }, (err, users) => {
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
            return res.status(201).json({
              status: "success",
              data: {
                user: user,
                message: "Account successfully created."
              }
            })
          }
        })
      } else {
        return res.status(409).json({
          status: "fail",
          message: "A user with a similar email exists."
        });
      }
    })
  },
  login: (req, res) => {
    return User.findOne(
      {email: req.body.email},
      (err, user) => {
      if(err) { return res.status(500).json(err) }
      if(!user) {
        return res.status(404).send({
          status: "fail",
          message: 'User Not Found',
        });
      }
      const validPassword = bcrypt.compareSync(
        req.body.password, user.password
      )
      if(validPassword) {
        const token = jwt.sign({
          data: {
            id: user._id,
            username: user.firstName,
            email: user.email
          }
        }, secretKey, {"expiresIn": 24*3600})
        return res.status(200).json(Object.assign({}, {
          id: user._id,
          username: user.username,
          email: user.email
        }, {token}));
      }
      return res.status(401).send({
        status: "fail",
        message: "Invalid password"
      });
    })
  }
}

export default userController;
