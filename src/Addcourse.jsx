import React from "react";
import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
const Addcourse = () => {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  return (
    <div>
      {title}
      {desc}
      {price}
      <TextField
        onChange={(e) => setTitle(e.target.value)}
        fullWidth={true}
        id={"coursename"}
        label="Course name"
        variant="outlined"
      />
      <TextField
        onChange={(e) => setDesc(e.target.value)}
        fullWidth={true}
        id={"description"}
        label="description"
        variant="outlined"
      />
      <TextField
        onChange={(e) => setPrice(e.target.value)}
        fullWidth={true}
        id={"price"}
        label="Price"
        type="Number"
        variant="outlined"
      />
      <Button
        onClick={() => {
          function callback1(res) {
            res.json().then(callback2);
          }
          function callback2(data) {
            localStorage.setItem("token",data.token)
          }
          fetch("http://localhost:3000/admin/courses", {
            method: "POST",
            body: JSON.stringify({
                title : title,
                description: desc,
                
                imageLink: " ",
                published: true
            }),
            headers: {
              "Content-type": "application/json",
              "authorization": localStorage.getItem("token")
            },
          }).then(callback1);
        }}
      >
        {" "}
        Add course
      </Button>
    </div>
  );
};

export default Addcourse;
