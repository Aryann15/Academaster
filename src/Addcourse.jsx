import React from "react";
import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
const Addcourse = () => {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  return (
    <div>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 150,
          marginBottom: 10,
        }}
      >
        <Typography variant={"h6"}>ADD COURSE</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint="outlined" style={{ width: 400, padding: 20 }}>
      {/* {title}
      {desc}
      {price} */}
      <TextField
        onChange={(e) => setTitle(e.target.value)}
        fullWidth={true}
        id={"coursename"}
        label="Course name"
        variant="outlined"
      />
      <br /><br />
      <TextField
        onChange={(e) => setDesc(e.target.value)}
        fullWidth={true}
        id={"description"}
        label="description"
        variant="outlined"
      />
      <br /><br />
      <TextField
        onChange={(e) => setPrice(e.target.value)}
        fullWidth={true}
        id={"price"}
        label="Price"
        type="Number"
        variant="outlined"
      />
      <br /><br /><br />
      <Button
      variant="contained"
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
        
        Add course
      </Button>
      </Card>
    
    </div></div>
  );
};
export default Addcourse;
