// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {

//     const token = req.headers.authorization;
//     if (token) {
//         const decoded = jwt.verify(token, process.env.key);
//         if (decoded) {
//             const userID = decoded.userID;
//             console.log(decoded)
//             req.body.userID = userID;
//             next();

//         } else {
//             res.send('Unable to decode')
//         }
//     } else {
//         res.send('Please login First')
//     }
// }

// module.exports = { authenticate };