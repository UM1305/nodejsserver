const express = require('express');
var sql = require("mssql/msnodesqlv8");
const bodyparser = require('body-parser');
var cors = require('cors')
var app = express();

//Configuring express server
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors())

//cors block
var whitelist = ['http://localhost:4200']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } 
  } else {
    corsOptions = { origin: false } 
  }
  callback(null, corsOptions) 
}

var port =5000;

    const dbConfig = {
    "server":"UMAPATHY",
    "user":"um1305",
    "password":"11307142001",
    "database":"users",
    "driver":"msnodesqlv8",
    "port":1433,
    "options":{
        "trustedConnection":true,
    }
}

    // connect to your database
    sql.connect(dbConfig, function (err) {

        if (err) console.log(err);

        else console.log('connected');
    });


    // Login User
    app.post('/login',(req,res,err)=>{

        let name = req.body.name;
        let password = req.body.password;

        try{
            console.log(name,'name');
            console.log(password,'pass');
            if(name == '' || password == '')
            {
                var s ={message : 'First You Have To Register'}
                return res.send(s)
            }

            var requests = new sql.Request();
            requests.input('name',sql.VarChar(1000),name)
            requests.input('password',sql.VarChar(1000),password)
            requests.execute('check_token',(err,result)=>{
                if(err){
                    console.log(err,'login err#');
                    var s ={message : err.message}
                    res.status(404).send(s)
                }
                else{
                    console.log(result,'login#');
                    res.send(result.recordset)
                }
            })
        }
        catch(err){
            res.send('Error While Execute The Procedure')
        }
    })

    // Register User
    app.post('/register',(req,res,err)=>{

        let name = req.body.user_name;
        let email = req.body.email;
        let phone = req.body.phone_number;
        let password = req.body.pass_word;
        
        try{

            if(name =='' || email == '' || phone == '' || password == '')
            {
                var s ={message : 'Fill Out All The Form Completely'}
                return res.send(s)
            }
            
            var requests = new sql.Request();
            requests.input('name',sql.VarChar(1000),name)
            requests.input('email',sql.VarChar(1000),email)
            requests.input('phonenumber',sql.Int,phone)
            requests.input('password',sql.VarChar(1000),password)
            requests.execute('regis',(err,result)=>{
                if(err){
                    console.log(err,'register err#');
                    // res.send(err)
                }
                else{
                    console.log(result,'registerresult#');
                    res.send(result)
                }
            })
        }
        catch(err){
            res.send('Error While Execute The Procedure')
        }
    })

    // Booking Details
    app.post('/book',(req,res,err)=>{

        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let location = req.body.location;
        let date = req.body.bookingdate;
        let suggestion = req.body.feedback;
        let food = req.body.food;
        
        try{

            if(name =='' || email == '' || phone == '' || location == '' || date == '' || suggestion == '' || food == '')
            {
                var s ={message : 'Fill Out All The Form Completely'}
                return res.send(s)
            }
            
            var requests = new sql.Request();
            requests.input('name',sql.VarChar(1000),name)
            requests.input('email',sql.VarChar(1000),email)
            requests.input('phonenumber',sql.Int,phone)
            requests.input('location',sql.VarChar(1000),location)
            requests.input('bookingdate',sql.SmallDateTime,date)
            requests.input('suggestion',sql.VarChar(1000),suggestion)
            requests.input('food',sql.VarChar(3),food)
            requests.execute('booking',(err,result)=>{
                if(err){
                    console.log(err,'register err#');
                    // res.send(err)
                }
                else{
                    console.log(result,'registerresult#');
                    res.send(result)
                }
            })
        }
        catch(err){
            res.send('Error While Execute The Procedure')
        }
    })

    // Contact Details
    app.post('/contact',(req,res,err)=>{

        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let message = req.body.feedback;
        
        try{

            if(name =='' || email == '' || phone == '' || message == '')
            {
                var s ={message : 'Fill Out All The Form Completely'}
                return res.send(s)
            }
            
            var requests = new sql.Request();
            requests.input('name',sql.VarChar(1000),name)
            requests.input('email',sql.VarChar(1000),email)
            requests.input('phonenumber',sql.Int,phone)
            requests.input('message',sql.VarChar(1000),message)
            requests.execute('contact',(err,result)=>{
                if(err){
                    console.log(err,'register err#');
                    // res.send(err)
                }
                else{
                    console.log(result,'registerresult#');
                    res.send(result)
                }
            })
        }
        catch(err){
            res.send('Error While Execute The Procedure')
        }
    })

    // Booking Status 
    app.post('/status',(req,res,err)=>{

        let phone = req.body.unumber;
        
        try{
            if(phone == '')
            {
                var s ={message : 'Please Enter The Number'}
                return res.send(s)
            }
            var requests = new sql.Request();
            requests.input('phonenumber',sql.Int,phone)
            requests.execute('booking_status',(err,result)=>{
                if(err){
                    console.log(err,'register err#');
                    // res.send(err)
                }
                else{
                    console.log(result,'registerresult#');
                    res.send(result.recordset)
                }
            })
        }
        catch(err){
            res.send('Error While Execute The Procedure')
        }
    })

app.listen(port, () => {
    console.log(`Server is running..${port}`);
});