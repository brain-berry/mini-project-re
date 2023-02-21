var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.json());

dbURL = "mongodb+srv://bensonaugustus7:h3nry321@cluster0.fz8hupi.mongodb.net/faculty";


const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(dbURL,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

    const Schema = mongoose.Schema;

    const dataSchema = new Schema({
        studentName: {
            type: String
        },
        studentID: {
            type: String
        },
        program: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        }
    }, {timestamps: true});
    
    const StudentData = mongoose.model('Data', dataSchema);

module.exports = function(app){
   //render
   app.get('/home', function(req, res){
    //get data from mongodb and pass it to the view
    res.render('home');
});


//read
app.post('/details', urlencodedParser, function(req, res){
    //get data from mongodb and pass it to the view
    const studID = req.body.studId;
    StudentData.find({studentID: studID}, function(err, data){
        if(err) throw err;
        res.render('details', {studData: data});
    });
});

//create
app.post('/home', urlencodedParser, function(req, res){
    //get data from view and add to database
    var newData = StudentData(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
        console.log("Data inserted successfully");
    })
});

}
