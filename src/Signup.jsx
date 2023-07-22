import React from "react";
import "./Signup.css";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
const Signup = () => {
  return (
    <div>
      {" "}
      <center>
        <div style={{ paddingTop: 150, marginBottom: 10 }}>
            <Typography variant={'h6'}>
          Welcome to Academaster! Sign Up Below!
          </Typography></div>
      </center>
      <center>
      <Card varint="outlined" style={{width:400 , padding: 20}}>
          <TextField fullWidth={true} id="outlined-basic" label="Username" variant="outlined" />
          <br /> <br />
          <TextField fullWidth={true} id="outlined-basic" label="Password" variant="outlined" />
          <br />
          <br /><br />
          <Button size="large" variant="contained"> Sign Up</Button>
          </Card>
      </center>
    </div>
  );
};

export default Signup;
