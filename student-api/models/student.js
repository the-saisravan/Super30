import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Student = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    department: String,
    admissionDate:{
        type: Date,
        default: Date.now
    }

})

export const StudentModel = mongoose.model("student",Student);