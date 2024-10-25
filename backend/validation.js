const { z } = require("zod");

const requireSignupBody = z.object({
  username: z.string().min(1).max(100),
  email: z.string().min(1).max(100),
  password: z.string().min(1).max(100),
});

const requireLoginBody = z.object({
  email: z.string().min(1).max(100),
  password: z.string().min(1).max(100),
});

const requireSignupBodyForAdmin = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username cannot exceed 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .max(100, "Email cannot exceed 100 characters")
    .email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password cannot exceed 100 characters"),
  profileImageLink: z
    .string()
    .min(1, "Profile image link is required")
    .max(200, "Profile image link cannot exceed 200 characters")
    .url("Invalid URL format"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long"),
  role: z
    .string()
    .min(1, "Role is required")
    .max(100, "Role cannot exceed 100 characters"),
  socialLink: z.string().max(100).optional(),
});

const requireAddCourseBody = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description cannot exceed 300 characters"),
  price: z.number().min(0, "Price cannot be lower then 0"),
  imageLink: z
    .string()
    .min(1, "Course image is required")
    .max(200, "Course image linkcannot exceed 100 characters"),
  published: z.boolean(),
  ytPlaylistLink: z
    .string()
    .min(1, "YouTube Playlist link is required")
    .max(200, "YouTube Playlist link cannot exceed 200 characters")
    .regex(
      /^https:\/\/(www\.)?youtube\.com\/playlist\?list=.*$/,
      "Invalid YouTube Playlist link, ex - https://www.youtube.com/playlist?list=PLwGdqUZWnOp00IbeN0OtL9dmnasipZ9x8"
    )
    .optional(),
    CourseOverview : z.string().min(1, "CourseOverview is required"), 
    LearningObjectives : z.array(z.string()).min(1, "LearningObjectives is required"),
    Requirements : z.string().min(1, "Requirements is required"),
    Language : z.string().min(1, "Language is required"),
    DifficultyLevel : z.string().min(1, "DifficultyLevel is required"),
});

const ytPlaylistLink = z.string().min(1, "YouTube Playlist link is required").max(200, "YouTube Playlist link cannot exceed 200 characters").regex(
    /^https:\/\/(www\.)?youtube\.com\/playlist\?list=.*$/,
    "Invalid YouTube Playlist link, ex - https://www.youtube.com/playlist?list=PLwGdqUZWnOp00IbeN0OtL9dmnasipZ9x8"
  );

const courseDetaildsValidator = z.object({
  title: z
    .string()
    .min(5, "Title should be at least 5 characters long")
    .max(200, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(30, "Description should be at least 30 characters long")
    .max(300, "Description cannot exceed 300 characters")
});

module.exports = {requireSignupBody, requireLoginBody, requireAddCourseBody, requireSignupBodyForAdmin, ytPlaylistLink, courseDetaildsValidator};