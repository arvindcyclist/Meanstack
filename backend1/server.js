const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Issue = require('./Issue')
const Userdata = require('./Issue')
const app = express()
const router = express.Router()
const PORT = process.env.port || 4000
app.use(cors())
app.use(bodyParser.json())
const jwt = require('jsonwebtoken');
const helper =require('./helper');


//uri from mongodb atlas cluster
//"mongodb+srv://arvind123:arvind123@cluster0-5p42d.mongodb.net/test?retryWrites=true"
//mongodb+srv://arvind123:<password>@cluster0-5p42d.mongodb.net/test?retryWrites=true&w=majority
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb+srv://arvind123:arvind123@cluster0-5p42d.mongodb.net/test?retryWrites=true&w=majority'

// MongoClient.connect(url, function(err, db){
//     if (err) throw err;
//     console.log("Database connected")
//     db.close()
// })
mongoose.connect('mongodb+srv://arvind123:arvind123@cluster0-5p42d.mongodb.net/test?retryWrites=true&w=majority',
 {useNewUrlParser : true})
 mongoose.set('useFindAndModify', false)

const connection = mongoose.connection

//We have a pending connection to the test database running on localhost. 
 //We now need to get notified if we connect successfully or if a connection error occurs:
 
connection.on('error', console.error.bind(console, 'connection error'))

connection.once('open', ()=>{
    console.log("MongoDb connection established successfully")
})




//end point only admin user can access 
router.route('/issues').get((req, res) => {
    let user = helper(req.headers);
    if(user.roles == 'admin'){
        Issue.find().then(docs=>{
            res.status(200).send({
                success:true,
                message:docs
            })  
        }).catch(err=>{
            res.status(500).send({
                success:false,
                message:err
            })  
        })
    } else {
        res.status(200).send({
            success:true,
            message:"Access Denied"
        })
    }
})


//get issues by id
router.route('/issues/:id').get((req, res) => {
    Issue.find({_id:req.params.id}, (err, issue) => {
        if (err)
            console.log(err)
        else
            res.json(issue)
    })
})

//get issues by status
router.route('/issues/:status').get((req, res) => {
    
    Issue.find({'status' : req.params.status}, (err, issue) => {
        if (err)
            console.log(err)
        else
            res.json(issue)
            console.log(issue)
    })
})

//add issue
router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body)   //we need object which contains all data coming from request
    // .save() is promisable 
    //mongoose model hence saved to database using save
    issue.save()
        .then(issue =>{
            res.status(200).json({'issue' : 'Added successfully'})
        } 
        ).catch(err => {
            res.status(400).send('Failed to create new record')
        })   

})

router.route('/issues/add/user').post((req, res) => {
    let user = new Userdata(req.body)
    user.save()
        .then(user =>{
            res.status(200).json({'user' : 'Added succesfully'})
        }).catch(err => {
            res.status(400).send('Failed to create user')
        })
})
//update issue
router.route('/issues/update/:id').post((req, res, next) =>{
    Issue.findById(req.params.id, (err, issue) =>{
        console.log("this is testing")
        console.log(issue)
        if (!issue){
            return next(new Error('could not load the document'))}
            //HTTP server tries to use an undefined variable and crashes, that's a programmer error
            //error was coming because i have not passed next in call back
        else{
            issue.title = req.body.title
            issue.responsible = req.body.responsible
            issue.description = req.body.description
            issue.severity = req.body.severity
            issue.status = req.body.status
            issue.save().then(issue => {
                res.json('Update Done')
            }).catch(err =>{
                res.status(400).send('update Failed')
            })
        }
    })
})

router.route('/issues/delete/:id').get((req, res) =>{
    Issue.findByIdAndRemove({_id : req.params.id}, (err, issue) =>{
        if (err)
            res.json(err)
        else
            res.json('Removed Successfully')
    })
})

app.post('/login', (req,res,next)=>{
    console.log(req.body);
    Userdata.findOne({username:req.body.username,password:req.body.password}).then(doc=>{
        console.log(doc);
        let token = jwt.sign({doc},'rsa256');
        res.status(200).send({ success: true, data: token })
    })
})

app.use('/', router)

app.set(PORT)
app.listen(PORT, ()=>{
    console.log("Express Server is running on port "+ PORT)
})