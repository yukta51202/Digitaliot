var express = require('express');
var app = express();
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

app.use(express.static(__dirname));

const fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io')(http);

const mysql = require('mysql2');
var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "yukta51202",
    database : "digitaliot",
    multipleStatements : true
});

mysqlConnection.connect((err) => {
    if(err)
        throw err;
    console.log("Database Established");
})

var data = [];

app.post('/form',(req,res) => {
    var name = req.body.name;
    var company = req.body.company;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;
    
    var msg = { "Name": name, "Company": company, "Email": email, "Phone": phone, "Message": message};
    data.push(msg);
    let sql = "INSERT INTO USER SET ?";
    let query = mysqlConnection.query(sql, msg, err => {
        if(err){
            console.log(err);
        }
        console.log("Succesfully added data to the database");
    })
})

var server = http.listen(1000, () =>{
    console.log('Listening the server on port no.: ', server.address().port);
})
