import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
const Signin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <div>
      {email}{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 150,
          marginBottom: 10,
        }}
      >
        <Typography variant={"h6"}>Welcome Back ! Sign in Below!</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            fullWidth={true}
            id={"username"}
            label="Username"
            variant="outlined"
          />
          <br /> <br />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            fullWidth={true}
            id={"password"}
            label="Password"
            variant="outlined"
            type={"password"}
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
                localStorage.setItem("token",data.token)
              }
              fetch("http://localhost:3000/admin/signin", {
                method: "POST",
                body: JSON.stringify({
                  username:email,
                  password:password,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }).then(callback1);
            }}
            size="large"
            variant="contained"
          >
           
            Sign in
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
