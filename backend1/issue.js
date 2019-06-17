let mongoose = require('mongoose')

const Schema = mongoose.Schema

let Issue = new Schema({
    title : { type : String },
    responsible : { type : String },
    description : { type : String },
    severity : { type : String },
    status : { type : String, default : 'open' }
})

let Userdata = new Schema({
    username : {type : String},
    roles : {type : String}
})


module.exports = mongoose.model('Issue', Issue)  
module.exports = mongoose.model('Userdata', Userdata)

//export default mongoose.model('Issue', Issue) this is not working 
// mongodb atlas automatically creates collection in lower case with plurals of 1st argument in mongoose.model
//Even if name is plural it will take plural in lower case

// let employee = new mongoose.Schema({
//     name : { type : String}
// })
// module.exports = mongoose.model('Emp[loyee', employee)  
