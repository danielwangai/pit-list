import jwt from 'jsonwebtoken';

const Authenticate = {
  loginRequired: (req, res, next) => {
    const token = req.headers['access-token'];
    if(!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You need to login to access this resource.'
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 'fail',
          message: 'Failed to authenticate.'
        });
      }
      req.decoded = decoded;
      req.user = req.user ? req.user : {};
      req.user.roles = [decoded.data.role];
      next();
    })
  }
}

export default Authenticate;
