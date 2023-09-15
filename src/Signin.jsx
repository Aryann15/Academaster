import React from "react";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
const Signin = () => {
  return (
    <div>
      {" "}
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
            fullWidth={true}
            id={"username"}
            label="Username"
            variant="outlined"
          />
          <br /> <br />
          <TextField
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
              let username = document.getElementById("username").value;
              let password = document.getElementById("password").value;
              fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  username,
                  password,
                }),
                headers: {
                  "Content-type" : "application/json" 
                }
              });
            }}
            size="large"
            variant="contained"
          >
            {" "}
            Sign in
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
