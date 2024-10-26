require("dotenv").config();
const express = require("express");
const { requireSignupBody, requireLoginBody } = require("../validation");
const { CourseModel, UserModel, AdminModel } = require("../db");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { firstCharToUpper } = require("../util");
const userRouter = express.Router();

const saltRound = process.env.SALT_ROUND;
const JWT_SECRECT = process.env.JWT_SECRECT;

async function auth(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      throw new Error("Token is not provided");
    }

    const decodedData = JWT.verify(token, JWT_SECRECT);
    const user = await UserModel.findOne({
      email: decodedData?.email,
    });
    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

userRouter.get("/", auth, (req, res) => {
  try {
    const user = req.user;
    res.json({ username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.post("/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // Input validation
    const inputValidated = requireSignupBody.safeParse(req.body);
    if (!inputValidated.success) {
      throw new Error(`${inputValidated.error.errors[0].message}`);
    }

    // User already exits
    const user = await UserModel.findOne({
      email,
    });
    if (user) {
      throw new Error("User already exits");
    }

    await UserModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, saltRound),
      isAdmin: false,
    });

    res.json({ msg: "User created😊" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const inputValidated = requireLoginBody.safeParse(req.body);
    if (!inputValidated.success) {
      throw new Error(`${inputValidated.error.errors[0].message}`);
    }

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email is incorrect");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Password is incorrect");
    }

    const token = JWT.sign({ email: email }, JWT_SECRECT);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// All courses
userRouter.get("/courses", auth, async (req, res) => {
  try {
    const allCourses = await CourseModel.find();
    const courses = allCourses.map((course) => {
      return {
        _id: course._id,
        title: course.title,
        imageLink: course.imageLink,
        price: course.price,
        published : course.published,
        totalDuration : course.totalDuration,
        CourseOverview : course.CourseOverview,
        Language : course.Language,
        DifficultyLevel : course.DifficultyLevel,
        purchased : course.purchasedBy.includes(req.user._id)
      }
    })

    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Purchase a course
userRouter.post("/courses/:courseId", auth, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const user = req.user;
    // cheack if user already purchased this course
    const findCourse = await CourseModel.findById(courseId);

    if (findCourse.purchasedBy.includes(user._id)) {
      throw new Error("You have already purchased this course");
    }

    const course = await CourseModel.findByIdAndUpdate(courseId, {
      $push: { purchasedBy: user._id },
    });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// All purchase courses
userRouter.get("/purchasedCourses", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const allCourses = await CourseModel.find();
    const purchasedCourses = allCourses.filter((course) =>
      course.purchasedBy.includes(userId)
    );
    res.json(purchasedCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search in courses
userRouter.post("/search", auth, async (req, res) => {
  try {
    const query = req.query.q || ""; 
    const { free, difficulty, duration, language } = req.body;
    
    // Initial filter data
    let allCourses = await CourseModel.find({
      title: { $regex: new RegExp(query, 'i') }
    });

    // more filter 
    if (free) {
      allCourses = allCourses.filter((course) => {
        return course.price == 0
      });
    }

    if (difficulty) {
      allCourses = allCourses.filter((course) => course.DifficultyLevel.toLowerCase() === difficulty.toLowerCase());
    }
    if (language) {
      allCourses = allCourses.filter((course) => course.Language.toLowerCase() === language.toLowerCase());
    }
    
    if (duration) {
      allCourses = allCourses.filter(course => {
        const hours = course.totalDuration / 3600;
        switch (duration) {
          case "<1":
            return hours < 1;
          case "1-3":
            return hours >= 1 && hours <= 3;
          case "3-6":
            return hours >= 3 && hours <= 6;
          case ">6":
            return hours > 6;
          default:
            return true;
        }
      });
    }

    const courses = allCourses.map((course) => {
      return {
        _id: course._id,
        title: course.title,
        imageLink: course.imageLink,
        price: course.price,
        published : course.published,
        totalDuration : course.totalDuration,
        CourseOverview : course.CourseOverview,
        Language : course.Language,
        DifficultyLevel : course.DifficultyLevel,
        purchased : course.purchasedBy.includes(req.user._id)}
      });

    res.json(courses);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


// Get course data
userRouter.get("/watch/:courseid", auth, async (req, res) => {
  try {
    const courseId = req.params.courseid;
    const userId = req.user._id;
    const courseData = await CourseModel.findById(courseId);

    const isPurchased = courseData?.purchasedBy.findIndex(
      (user) => user.toString() == userId
    );
    if (isPurchased == -1) {
      throw new Error("You dont have the access");
    }

    res.json(courseData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get course deatails
userRouter.get("/courses/:courseId", auth, async (req, res) => {
  try{
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const course = await CourseModel.findById(courseId);
    const instructorId = course.publishedBy.toString();
    const instructor = await AdminModel.findById(instructorId);
    const {title, price, imageLink, totalDuration, CourseOverview, LearningObjectives, Requirements, Language, DifficultyLevel, purchasedBy } = course;
    const {username : instructorName, profileImageLink} = instructor;
    res.json({ 
      title, 
      price, 
      imageLink, 
      totalDuration, 
      CourseOverview, 
      LearningObjectives, 
      Requirements, 
      Language, 
      DifficultyLevel, 
      instructorName, 
      profileImageLink,
      purchased : purchasedBy.includes(userId)
     });
  }
  catch(err){
    console.log(err);
    res.status(500).json({ error: err.message });
  }

})

module.exports = {userRouter};
