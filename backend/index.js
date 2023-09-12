const express = require("express");
const app = express();
const jwt = require ('jsonwebtoken')
const mongoose = require ('mongoose')
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const secretKey = "tears_on_my_keyboard"

//mongoose schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref:'Course'}]
})

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
})

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
})

//mongoose models
const User = mongoose.model('User',userSchema)
const Admin = mongoose.model('Admin',adminSchema)
const Course = mongoose.model('Course', courseSchema)


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

mongoose.connect('mongodb+srv://aryan158:chidori@cluster0.5gp1qta.mongodb.net/')

//admin routes

app.post("/admin/signup", async (req, res) => {
  const {username,password} = req.body;
  const admin = await Admin.findOne({username});
  if (admin) {
    res.status(403).json({ message: "admin already exists" });
  } else {
    const obj = {username: username,password:password}
    const newAdmin = new Admin (obj);
    await newAdmin.save();
    const token = jwt.sign({username , role: 'admin'}, secretKey, {expiresIn: '1h'})
    res.json({ message: " Admin created succesfully",token });
  }
});

app.post("/admin/login", async (req, res) => {
  const {username,password} = req.headers;
  const admin =  await Admin.findOne({username, password})
  if (admin){
    const token= jwt.sign({username , role:'admin'}, secretKey, { expiresIn: '1h'})
    res.json({ message: " logged in successfully", token });
  }else{
    res.status(403).json({message : "admin authentication failed "})
  }
});

app.post("/admin/courses",authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  course.id = Date.now(); //use timestamp as course ID
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
  const user = req.body;
  const existingUser = USERS.find((a) => a.username === user.username);
  if (existingUser) {
    res.status(403).json({ message: "Someone with that username already exists" });
  } else {
    const token = generateJwt(user);
    USERS.push(user);
    res.json({ message: "User created successfully",token });
  }
});
app.post("/user/login",(req, res) => {
  const {username,password} =req.headers;
  const user = USERS.find(u => u.username == username && u.password ==password)
  if (user){
    const token = generateJwt(user);
    res.json({ message: "Logged in successfully",token});
  }
  else{
    res.status(403).json({message: "user authentication failed"})
  }  
});

app.get("/user/courses",authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});

app.post("/user/courses/:courseId",authenticateJwt, (req, res) => {
  const courseId = Number(req.params.courseId);
  const course = COURSES.find((c) => c.id === courseId );
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);
    if (user){
      if(!user.purchasedCourses){
        user.purchasedCourses =[];
      }
      user.purchasedCourses.push(course)
      res.json({message:" course purchased successfully"})
    }else{
      res.status(403).json({message: "User not found"})
    }
  }else{
    res.status(404).json({message: "course not found"})
  }
});

app.get("/user/purchasedCourses",authenticateJwt, (req, res) => {
  const user = USERS.find(u => u.username === req.user.username);
  if (user && user.purchasedCourses)
  {
    res.json({purchasedCourses: user.purchasedCourses})
  }
  else{
    res.status(403).json({message: "no courses purchased"})
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



// mongodb+srv://aryan158:chidori@cluster0.5gp1qta.mongodb.net/