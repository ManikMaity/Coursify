const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


mongoose.connect("mongodb+srv://manikmaityhaker2003:w0K2cWAQAnjTreKl@cluster0.bajhd.mongodb.net/course-app-database")
.then(() => {
    console.log("Connected");
})
.catch(err => {
    console.log(err);
}) 


// Defining the schema 

const User = {
    username : String,
    email : String,
    password : String,
    isAdmin : Boolean
}

const Admin = {
    username : String,
    email : String,
    password : String,
}


const Course = {
    title : String,
    description : String,
    price : Number,
    imageLink : String,
    published : Boolean,
    publishedBy : ObjectId,
    purchasedBy : Array
}


// Defining the model
const UserModel = mongoose.model("users", User);
const CourseModel = mongoose.model("courses", Course);
const AdminModel = mongoose.model("admin", Admin);

module.exports = {UserModel, CourseModel, AdminModel};