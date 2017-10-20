import jwt from 'jsonwebtoken';
import Bucketlist from '../models/bucketlist';

const bucketlistsController = {
  createBucketlist: (req, res) => {
    const currentUser = jwt.verify(req.headers['access-token'], process.env.SECRET_KEY);
    let bucketlist = new Bucketlist();

    if(!req.body.name || !req.body.description) {
      return  res.status(400).json({
        status: "fail",
        message: "All fields required."
      })
    }
    Bucketlist.find({ name: req.body.name, user: currentUser.data.id }, (err, bucketlists) => {
      if(!bucketlists.length) {
        // create bucketlist
        bucketlist.name = req.body.name;
        bucketlist.description = req.body.description;
        bucketlist.user = currentUser.data.id;
        bucketlist.save((err, bucketlist) => {
          if(err) {
            return res.status(500).json(err)
          }
          return res.status(201).json({
            status: "fail",
            data: {
              bucketlist: bucketlist,
              message: "Bucketlist was successfully created."
            }
          })
        })
      } else {
        return res.status(409).json({
          status: "fail",
          message: "You have a buketlist with a similar name."
        })
      }
    })
  }
}

export default bucketlistsController;
