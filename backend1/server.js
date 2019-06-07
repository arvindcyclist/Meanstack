const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Issue = require('./Issue')
const app = express()
const router = express.Router()
const PORT = process.env.port || 4000
app.use(cors())
app.use(bodyParser.json())


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

//end point
router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err)
        else 
            res.json(issues)
    })
})


//get issues by id
router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err)
        else
            res.json(issue)
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
app.use('/', router)

app.set(PORT)
app.listen(PORT, ()=>{
    console.log("Express Server is running on port "+ PORT)
})