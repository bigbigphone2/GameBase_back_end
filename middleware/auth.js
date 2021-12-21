const jwt = require('jsonwebtoken');
const config = require('config');

// module.exports = function authenticateToken (req, res, next) {
//   const token = req.header('x-auth-token');
//   if (!token) return res.status(401).send('Access denied. No token provided.');

//   try {
//     const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
//     req.user = decoded; 
//     next();
//   }
//   catch (ex) {
//     res.status(400).send('Invalid token.');
//   }
// }
module.exports = function authenticateToken(req, res, next) {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // if (token == null) return res.sendStatus(401)
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    jwt.verify(token,  config.get('jwtPrivateKey'), (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }