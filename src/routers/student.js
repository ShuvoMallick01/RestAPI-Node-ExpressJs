const express = require('express');
const router = new express.Router();
const Student = require("../models/students");

// 2. We need todefine the Router
router.get("/shuvo", (req, res) => {
    res.send("Hello World!");
})

// Create New Students
// app.post("/student", (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// }) 

router.post("/students", async(req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);

    } catch (e) {
        res.status(400).send(e);
    }
})

// read the data of registered Students 
router.get("/students", async(req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
})

// get the individsual Student data using id
router.get("/students/:id", async(req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        // console.log(studentData);

        if (!studentData) {
            return res.status(404).send();
        } else {
            res.send(studentData);
        }

    } catch (e) {
        res.status(500).send(e);
    }
})

// Update  the students by it ID
router.patch("/students/:id", async(req, res) => {
    try {
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.status(201).send(updateStudents);
    } catch (e) {
        res.status(404).send(e);
    }
})

// Delete  the students by it ID
router.delete("/students/:id", async(req, res) => {
    try {
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);
        if (!_id) {
            res.status(400).send();
        } else {
            res.status(200).send(deleteStudent);
        }
    } catch (e) {
        res.status(500).send(e);
    }
})


module.exports = router;