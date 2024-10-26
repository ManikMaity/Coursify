require("dotenv").config();
const express = require("express");
const {
  requireAddCourseBody,
  requireSignupBodyForAdmin,
  requireLoginBody,
  ytPlaylistLink,
  courseDetaildsValidator,
} = require("../validation");
const { CourseModel, AdminModel } = require("../db");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: axios } = require("axios");
const { formatPlaylistData, getTotalDuration } = require("../util");
const { generateContent } = require("../config/geminiConfig");
const adminRoute = express.Router();

const saltRound = Number(process.env.SALT_ROUND);
const JWT_SECRECT = process.env.JWT_SECRECT;

async function adminAuth(req, res, next) {
  try {
    const adminToken = req.headers.admintoken;

    if (!adminToken) {
      throw new Error("Admin token is not provided");
    }

    const decodedData = JWT.verify(adminToken, JWT_SECRECT);
    const admin = await AdminModel.findOne({
      email: decodedData?.email,
    });
    if (admin) {
      req.admin = admin;
      next();
    } else {
      throw new Error("Admin not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

adminRoute.post("/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const description = req.body.description;
    const profileImageLink = req.body.profileImageLink;
    const socialLink = req.body.socialLink;

    // Input validation
    const inputValidated = requireSignupBodyForAdmin.safeParse(req.body);
    if (!inputValidated.success) {
      throw new Error(`${inputValidated.error.errors[0].message}`);
    }

    // Admin already exits
    const admin = await AdminModel.findOne({
      email,
    });
    if (admin) {
      throw new Error("Admin already exits");
    }

    await AdminModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, saltRound),
      role,
      description,
      profileImageLink,
      socialLink,
    });

    res.json({ msg: "Admin account created😊" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});

adminRoute.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const inputValidated = requireLoginBody.safeParse(req.body);
    if (!inputValidated.success) {
      throw new Error(`${inputValidated.error.errors[0].message}`);
    }

    const admin = await AdminModel.findOne({
      email,
    });

    if (!admin) {
      throw new Error("Email is incorrect");
    }
    if (!bcrypt.compareSync(password, admin.password)) {
      throw new Error("Password is incorrect");
    }

    const adminToken = JWT.sign({ email: email }, JWT_SECRECT);
    res.json({ adminToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

adminRoute.get("/me", adminAuth, (req, res) => {
  try {
    res.json(req.admin);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Extract Data From youtube
adminRoute.get("/courses/yt", adminAuth, async (req, res) => {
  try {
    const url = req.query.url;
    const validation = ytPlaylistLink.safeParse(url);
    if (!validation.success) {
      throw new Error(`${validation.error.errors[0].message}`);
    }
    const response = await axios.get(
      `https://export-youtube-playlist.vercel.app/get-data/?url=${url}&file_type=CSV`
    );
    const data = formatPlaylistData(response);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get course details from ai
adminRoute.post("/courses/ai", adminAuth, async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;

    // Input validation
    const inputValidated = courseDetaildsValidator.safeParse(req.body);
    if (!inputValidated.success) {
      throw new Error(`${inputValidated.error.errors[0].message}`);
    }

    const response = await generateContent(title, description);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a course
adminRoute.post("/courses/add", adminAuth, async (req, res) => {
  try {
    const admin = req.admin;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const published = req.body.published;
    const ytPlaylistLink = req.body.ytPlaylistLink;
    const {CourseOverview, LearningObjectives, Requirements, Language, DifficultyLevel} = req.body;

    const inputValidated = requireAddCourseBody.safeParse(req.body);
    if (!inputValidated.success) {
      throw new Error(`${inputValidated.error.errors[0].message}`);
    }
    const response = await axios.get(
      `https://export-youtube-playlist.vercel.app/get-data/?url=${ytPlaylistLink}&file_type=CSV`
    );
    const data = formatPlaylistData(response);
    const totalDuration = getTotalDuration(data?.videos);

    await CourseModel.create({
      title,
      description,
      price,
      totalDuration,
      imageLink,
      published,
      publishedBy: admin._id,
      purchasedBy: [],
      videos: data.videos,
      CourseOverview,
      LearningObjectives,
      Requirements,
      Language,
      DifficultyLevel
    });

    res.json({ msg: "Course created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});



// Edit course
adminRoute.put("/courses/:courseId", adminAuth, async (req, res) => {
  try {
    const admin = req.admin;
    const courseId = req.params.courseId;
    const course = await CourseModel.findById(courseId);

    if (!course) {
      throw new Error("Course not found.");
    }

    if (admin._id.equals(course.publishedBy) === false) {
      throw new Error("Course isnt published by you");
    }

    const title = req.body.title || course.title;
    const description = req.body.description || course.description;
    const price = req.body.price || course.price;
    const imageLink = req.body.imageLink || course.imageLink;
    const published = req.body.published || course.published;

    await CourseModel.findOneAndUpdate(
      { _id: course._id },
      { title, description, price, imageLink, published }
    );

    res.json({ msg: "Course is updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete course
adminRoute.delete("/courses/delete/:courseId", adminAuth, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    await CourseModel.findByIdAndDelete(courseId);
    res.json({ msg: "Course deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get all uploaded courses
adminRoute.get("/courses", adminAuth, async (req, res) => {
  try {
    const adminId = req.admin._id;
    const courses = await CourseModel.find({
      publishedBy: adminId,
    });

    if (courses) {
      res.json(courses);
    } else {
      throw new Error("You dont have any cources");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { adminRoute };
