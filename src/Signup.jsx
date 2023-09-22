import React from "react";
import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <div>
      {" "}
      <center>
        <div style={{ paddingTop: 150, marginBottom: 10 }}>
          <Typography variant={"h6"}>
            Welcome to Academaster! Sign Up Below!
          </Typography>
        </div>
      </center>
      <center>
        <Card varint="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            fullWidth={true}
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          <br /> <br />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            fullWidth={true}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <br />
          <br />
          <br />
          <Button
            
            onClick={() => {
              function callback1(res) {
                res.json().then(callback2);
              }
              function callback2(data) {
                localStorage.setItem("token", data.token);
              }
              fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  username: email,
                  password: password,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }).then(callback1);
            }}
            size="large"
            variant="contained"
          >
            Sign Up
          </Button>
        </Card>
      </center>
    </div>
  );
};

export default Signup;
