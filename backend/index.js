const express = require ('express')
const app = express()

app.use(express.json)

let ADMINS =[]
let USERS = []
let COURSES = []

//admin routes

app.post('/admin/signup',(req,res) => {

})
app.post('/admin/login',(req,res) => {
    
})
app.post('/admin/courses',(req,res) => {
    
})
app.put('/admin/courses/:courseId',(req,res) => {
    
})
app.get('/admin/courses',(req,res) => {
})


app.listen(3000,() => {
    console.log('Server is running on port 3000');
})