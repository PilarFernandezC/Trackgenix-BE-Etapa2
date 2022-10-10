const express = require('express');
const employees = require('../data/employees.json');
const employeesRouter = express.Router();
const fs = require ('fs')
employeesRouter.get('/getAll', (req,res) => {
        res.send(employees)
})
employeesRouter.get('/getEmployee/:id',(req,res) => {
    const employeeId = req.params.id;
   const findEmployee = employees.find((employee) => employee.id == employeeId);
   if(findEmployee){
    res.send(findEmployee)
    }else{
    res.send("Employee dosen't exist");
    }
})
employeesRouter.put('/editEmployee/:id',(req,res) => {
    const employeeId = req.params.id;
    const employeeEdit = req.body;
    const employeeFilter = employees.filter((employee) => `${employee.id}` !== employeeId)
    console.log(employeeFilter)
    employeeFilter.push(employeeEdit);
    fs.writeFile('src/data/employees.json', JSON.stringify(employeeFilter),(err) => {
        if(err){
            res.status(400).send('Error')
        }else{
            res.send('user updating')
        }
    })
    // if (employeeFilter){
    //     if(employeeEdit.id != "" || employeeEdit.first_name != "" || employeeEdit.last_name != "" || employeeEdit.email != "" || employeeEdit.password != "" || employeeEdit.phone != ""){
    // res.send(employeeFilter);
    //     }else{
    //         res.send("body incomplete")
    //     }
    // }
    // console.log(employeeEdit.last_name)
})
employeesRouter.get('/')
module.exports = employeesRouter;