const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const { SECRET_KEY } = require('../config/constants/VARIABLES');

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return reject(err);
      const { user } = decoded;

      return resolve(user);
    });
  });
};

const signJwt = (user, expirationTime) => {
  return new Promise((resolve, reject) => {
    const { spotifyId } = user;
    const payload = {
      exp: expirationTime,
      sub: spotifyId,
      iat: +new Date(),
      iss: `internal:spotify:notification`,
      jti: uuidv4(),
      user
    };

    jwt.sign(payload, SECRET_KEY,
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
  });
};

module.exports = {
  signJwt,
  verifyToken,
};
