const express = require("express");
const JWT = require("jsonwebtoken");
const { UserModel, CourseModel, AdminModel } = require("./db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const cors = require("cors");
const e = require("express");

const app = express();
app.use(express.json());
app.use(cors());

// **************************** Constant values *************************
const saltRound = 5;
const JWT_SECRECT = "manikmaity";

// ************************* input validations ******************************
// signup validation
const requireSignupBody = z.object({
  username: z.string().min(1).max(100),
  email: z.string().min(1).max(100),
  password: z.string().min(1).max(100),
});

const requireLoginBody = z.object({
  email: z.string().min(1).max(100),
  password: z.string().min(1).max(100),
});

const requireAddCourseBody = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
  price: z.number().min(1),
  imageLink: z.string().min(1).max(200),
  published: z.boolean(),
});

// ************************ Middleware ******************************

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

// ***************************** User routes ********************************

app.get("/user", auth, (req, res) => {
  try{
    const user = req.user;
    res.json({username : user.username})
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
})

app.post("/user/signup", async (req, res) => {
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

app.post("/user/login", async (req, res) => {
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
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// All courses
app.get("/user/courses", auth, async (req, res) => {
  try {
    const allCourses = await CourseModel.find();
    res.json(allCourses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Purchase a course
app.post("/user/courses/:courseId", auth, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const user = req.user;
    const course = await CourseModel.findByIdAndUpdate(courseId, {
      $push: { purchasedBy: user._id },
    });
    res.json(course);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// All purchase courses
app.get("/user/purchasedCourses", auth, async (req, res) => {
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

// ************************ Admin routes ******************************

app.post("/admin/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // Input validation
    const inputValidated = requireSignupBody.safeParse(req.body);
    if (!inputValidated.success) {
      throw new Error(`${inputValidated.error.errors[0].message}`);
    }

    const all = await AdminModel.find();

    // Admin already exits
    const admin = await AdminModel.findOne({
      email,
    });
    if (admin) {
      console.log(all);
      throw new Error("Admin already exits");
    }

    await AdminModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, saltRound),
    });

    res.json({ msg: "Admin account created😊" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/admin/login", async (req, res) => {
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

// Create a course
app.post("/admin/courses/add", adminAuth, async (req, res) => {
  try {
    const admin = req.admin;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const published = req.body.published;

    const inputValidated = requireAddCourseBody.safeParse(req.body);
    if (!inputValidated.success) {
      throw new Error(`${inputValidated.error.errors[0].message}`);
    }

    await CourseModel.create({
      title,
      description,
      price,
      imageLink,
      published,
      publishedBy: admin._id,
      purchasedBy: [],
    });

    res.json({ msg: "Course created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit course
app.put("/admin/courses/:courseId", adminAuth, async (req, res) => {
  try {
    const admin = req.admin;
    const courseId = req.params.courseId;
    const course = await CourseModel.findById(courseId);

    if (!course) {
      throw new Error("Course not found.");
    }

    if (admin._id.equals(course.publishedBy) === false) {
      console.log(course.publishedBy, admin._id);
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

// Get all uploaded courses
app.get("/admin/courses", adminAuth, async (req, res) => {
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

app.listen(3000);
