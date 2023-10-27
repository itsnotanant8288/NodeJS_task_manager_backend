
const CONFIG = require('./config');

module.exports = {
   secret: CONFIG.jwt_encryption,
};

// module.export ={
//  secret:"secret-key"
// };