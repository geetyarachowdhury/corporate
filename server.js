const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/employeeDB", { useUnifiedTopology: true,   useNewUrlParser: true })

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String
})

const Employee = mongoose.model("Employee", employeeSchema);

app.get("/", (req, res) => {
    console.log("cool")
})

app.route("/employees").get(function(req, res){
    Article.find({}, function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        } else{
            res.send(err);
        }
    });
})
.post((req, res) => {
    const newEmployee = new Employee({
        name: req.body.name,
        email: req.body.email,
    })

    newEmployee.save((err) => {
        if(!err){
            res.send("done dona done!");
        } else{
            res.send(err);
        }
})
});

app.listen(5000, () => {
    console.log("port connected successfully");
});