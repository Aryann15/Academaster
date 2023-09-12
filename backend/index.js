const express = require("express");
const app = express();
const jwt = require ('jsonwebtoken')
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const secretKey = "tears_on_my_keyboard"

const generateJwt = (user) => {
  const payload = {username: user.username}
  return jwt.sign(payload,secretKey,{expiresIn:'1h'})
}

const authenticateJwt = (req,res,next) => {
  const token = req.headers.authorization

  if (token){
    jwt.verify(token,secretKey,(err,user) =>{
      if (err){
        return res.sendStatus(403);
      }
      req.user= user
      next();
    })
  }else{
    return res.sendStatus(401);
  }
}

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
const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const user = USERS.find(
    (a) => a.username === username && a.password === password
  );
  if (user) {
    req.user=user; 
    next();
  } else {
    res.status(403).json({ message: "user authentication failed!" });
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
    const token = generateJwt(admin)
    res.json({ message: " Admin created succesfully",token });
  }
});

app.post("/admin/login", (req, res) => {
  const {username,password} = req.headers;
  const admin = ADMINS.find(a => a.username ==username && a.password == password)
  if (admin){
    const token= generateJwt(admin)
    res.json({ message: " logged in successfully", token });
  }else{
    res.status(403).json({message : "admin authentication failed "})
  }
});

app.post("/admin/courses",authenticateJwt, (req, res) => {
  const course = req.body;
  course.id = Date.now(); //use timestamp as course ID
  COURSES.push(course);
  res.json({ message: "Course created successfully", courseId: course.id });
});

app.put("/admin/courses/:courseId", authenticateJwt, (req, res) => {
  const courseId = Number(req.params.courseId);
  const course = COURSES.find((c) => c.id === courseId);
  if (course) {
    Object.assign(course, req.body);
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

app.get("/admin/courses",authenticateJwt , (req, res) => {
  res.json({ courses: COURSES });
});
//user routes

app.post("/user/signup", (req, res) => {
  const user = { ...req.body, purchasedCourses: [] };
  const existingUser = USERS.find((a) => a.username === user.username);
  if (existingUser) {
    res
      .status(403)
      .json({ message: "Someone with that username already exists" });
  } else {
    USERS.push(user);
    res.json({ message: "User created successfully" });
  }
});
app.post("/user/login", userAuthentication, (req, res) => {
  res.json({ message: "Logged in successfully" });
});

app.get("/user/courses", userAuthentication, (req, res) => {
  res.json({ courses: COURSES.filter((c) => c.published) });
});

app.post("/user/courses/:courseId", userAuthentication, (req, res) => {
  const courseId = Number(req.params.courseId);
  const course = COURSES.find((c) => c.id === courseId && c.published);
  if (course) {
    req.user.purchasedCourses.push(courseId);
    res.json({ message: "Course purchased successfully " });
  } else {
    res.status(404).json({ message: "Course not found or not available!" });
  }
});

app.get("/user/purchasedCourses",userAuthentication, (req, res) => {
  var purchasedCourseId = req.user.purchasedCourses;
  var purchasedCourses = []
  for (let i=0; i< COURSES.length; i++){
    if (purchasedCourseId.indexOf(COURSES[i].id)!==-1){
      purchasedCourses.push(COURSES[i])
    }
  }
  res.json({purchasedCourses})
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
