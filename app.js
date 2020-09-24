const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Employee = require("./api");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', function(request, response){
    Employee.find((err, employees) => response.format({
      json: () =>{
      response.status(200).json(employees);
    },
    html: () => {
      response.render('employee', { employees: employees});
    }
    }));
  });

  app.post('/', (request, response) => {
    console.log(request.body);
    var newEmployee = new Employee ({
        name: request.body.name,
        email: request.body.email
    })
    Employee.create(newEmployee);
    response.status(201).json();
    newEmployee.save(function(err){

        if(!err){
    
          res.redirect("/");
    
        }
    
      });
});


app.listen(5000, () => {
    console.log("port is connected to 5000")
})