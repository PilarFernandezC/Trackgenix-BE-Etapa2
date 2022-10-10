const express = require("express");
const router = express.Router();
const projects = require("../data/projects.json");
const fs = require('fs')

router.get("/getByName/:name", (req, res) => {
    const projectName = req.params.name
    const filteredProject = projects.filter((project) => project.name.includes(projectName))
    if (filteredProject) {
        res.send(filteredProject)
    } else {
        res.send("Nothing found")
    }
})

router.delete("/delete/:id", (req, res) => {
    const projectId = req.params.id
    const filteredProject = projects.filter((project) => project.id !== projectId)
    fs.writeFile('src/data/projects.json', JSON.stringify(filteredProject), (err) => {
        if (err) {
            res.send("Cannot delete project")
        } else {
            res.send("Project deleted")
        }
    })
})

router.post("/modify/:id", (req, res) => {
    const changeProject = req.body
    const projectId = req.params.id
    const newProject = projects.filter((project) => project.id !== projectId)
    newProject.push(changeProject)
    fs.writeFile('src/data/projects.json', JSON.stringify(newProject), (err) => {
        if (err) {
            res.send("Cannot modify project")
        } else {
            res.send("Project modified")
        }
    })
})

module.exports = router;