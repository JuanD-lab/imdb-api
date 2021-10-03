const jwt = require('jsonwebtoken')

const verifyToken = ((req, res, next) => {
    const token = req.headers['access-token'];

if (token) {
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {      
    if (err) {
      return res.json({ mensaje: 'Token inválido' });    
    } else {
      req.decoded = decoded;    
      next();
    }
  });
} else {
  res.send({ 
      mensaje: 'Token no proporcionado.' 
  });
}
});

module.exports = {verifyToken}