const express = require("express");
const router = express.Router();
const tasks = require("../data/tasks.json");
const fs = require('fs');

router.get("/getAll", (req, res) => {
    res.send(tasks)
})

router.post("/add", (req, res) => {
    const newTask = req.body
    tasks.push(newTask)
    fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
        if (err) {
            res.send("Cannot save new task")
        } else {
            res.send("New task created")
        }
    })
})
module.exports = router;