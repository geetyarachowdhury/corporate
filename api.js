const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));


mongoose.connect("mongodb://localhost:27017/corporateDB", { useNewUrlParser: true, useUnifiedTopology: true }).then(
    ()=> console.log('connected to db')
).catch(
    (err)=> console.error(err)
);


const empSchema = new mongoose.Schema(
    [
        {
            name: String,
            email: String
        }
    ]
    )

const Employee = mongoose.model("Employee", empSchema);

app.route("/employees").get((req, res) => {
    Employee.find({}, function(err, foundEmployees){
        if(!err){
            res.send(foundEmployees);
        } else{
            res.send(err);
        }
    });
}).post((req, res) => {
    const newEmployee = new Employee({
        name: req.body,
        email: req.body
    });

    newEmployee.save(function(err){
        if(!err){
            res.send("done!");
        } else{
            res.send(err);
        }
    });

});


module.exports = Employee;