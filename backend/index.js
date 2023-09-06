const express = require("express");
const app = express();

app.use(express.json);

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
    res.status(403).json({ message: "Admina uthentication failed! " });
  }
};

/ /admin routes

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
  res.json({ message: "" });
});
app.post("/admin/courses", (req, res) => {});
app.put("/admin/courses/:courseId", (req, res) => {});
app.get("/admin/courses", (req, res) => {});

//user routes

app.post("/user/signup", (req, res) => {});
app.post("/user/login", (req, res) => {});
app.get("/user/courses", (req, res) => {});
app.post("/user/courses/:courseId", (req, res) => {});
app.get("/user/purchasedCourses", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
