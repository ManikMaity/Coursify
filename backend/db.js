require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString)
.then(() => {
    console.log("Connected");
})
.catch(err => {
    console.log(err);
}) 


// Defining the schema 

const User = new Schema({
    username : String,
    email : String,
    password : String,
    isAdmin : Boolean
})

const Admin = new Schema({
    username : String,
    email : String,
    password : String,
    role : String,
    description : String,
    profileImageLink : String,
    socialLink : String
})


const Course = new Schema({
    title : String,
    description : String,
    price : Number,
    imageLink : String,
    published : Boolean,
    publishedBy : ObjectId,
    purchasedBy : Array,
    videos : Array,
    totalDuration : Number,
    CourseOverview : {
        type : String,
        required : true
    },
    LearningObjectives : {
        type : Array,
        required : true
    },
    Requirements : {
        type : String,
        required : true
    },
    Language : {
        type : String,
        required : true
    },
    DifficultyLevel : {
        type : String,
        required : true
    }
})



// Defining the model
const UserModel = mongoose.model("users", User);
const CourseModel = mongoose.model("courses", Course);
const AdminModel = mongoose.model("admin", Admin);

module.exports = {UserModel, CourseModel, AdminModel};