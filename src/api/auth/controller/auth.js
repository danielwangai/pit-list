import User from '../models/user';
import bcrypt from 'bcrypt';

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
              status: "fail",
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
  }
}

export default userController;
