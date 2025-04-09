import 'dotenv/config';
import express from 'express';
import { StudentModel } from '../models/student.js';
const app = express();
app.use(express.json());

let id=0;

app.post('/', async (req, res) =>{
    let student = new StudentModel({  
        id: ++id,  
        name: req.body.name,
        age: req.body.age,
        department: req.body.department,
    });
    try{
        const newStudent = await student.save();
        res.status(201).json(newStudent);
        console.log(`Student created: ${newStudent}`);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

app.get('/', async (req, res) =>{
    try{
        const students = await StudentModel.find();
        res.status(200).json(students);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

app.get('/:id', async (req, res) =>{
        try{
            const student = await StudentModel.findById(req.params.id);
            res.status(200).json(student);
            if(!student){
                return res.status(404).json({message: 'Student not found'});
            }

        }
        catch(err){
            res.status(500).json({message: err.message});
        }
        
})

app.put('/:id', async (req,res)=>{
    try{
        const student = await StudentModel.findById(req.params.id);
        if(!student){
            return res.status(404).json({message: 'Student not found'});
        }
        student.name= req.body.name;
        student.age= req.body.age;
        student.department = req.body.department;
        student.admissionDate = req.body.admissionDate;
        const updatedStudent = await student.save();
        res.status(200).json(updatedStudent);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

app.delete('/:id', async (req,res)=>{
    try{
        const student = await StudentModel.findById(req.params.id);
        if(!student){
            return res.status(404).json({message: 'Student not found'});
        }
        await student.deleteOne();
        id--;
        res.status(200).json({message: 'Student deleted, Below is the deleted student', student});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})


export default app;
