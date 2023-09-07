const express = require("express");
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: "Admin authentication failed! " });
  }
};

//admin routes

app.post("/admin/signup", (req, res) => {
  const admin = req.body;
  const existingAdmin = ADMINS.find((a) => a.username === admin.username);
  if (existingAdmin) {
    res.status(403).json({ message: "admin already exists" });
  } else {
    ADMINS.push(admin);
    res.json({ message: " Admin created succesfully" });
  }
});

app.post("/admin/login", adminAuthentication, (req, res) => {
  res.json({ message: " logged in successfully" });
});

app.post("/admin/courses", adminAuthentication, (req, res) => {
  const course = req.body;
  course.id = Date.now(); //use timestamp as course ID
  COURSES.push(course);
  res.json({ message: "Course created successfully", courseId: course.id });
});

app.put("/admin/courses/:courseId",adminAuthentication, (req, res) => {
  const courseId = Number(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId)
  if (course){
    Object.assign(course,req.body);
    res.json ({ message: "Course updated successfully"});
  }else {
    res.status(404).json ({ message : "Course not found"})
  }
});

app.get("/admin/courses",adminAuthentication, (req, res) => {
  res.json({ courses: COURSES})
});
//user routes

app.post("/user/signup", (req, res) => {});
app.post("/user/login", (req, res) => {});
app.get("/user/courses", (req, res) => {});
app.post("/user/courses/:courseId", (req, res) => {});
app.get("/user/purchasedCourses", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
