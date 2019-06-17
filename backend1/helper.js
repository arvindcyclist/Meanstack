const jwt = require('jsonwebtoken');

module.exports = (headers) =>{
    let token = headers.authorization.split(" ")[1];
    let user = jwt.verify(token,'rsa256');
    return user.doc;
}