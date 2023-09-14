import React from "react";
import "./Signin.css";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
const Signin = () => {
  return (
    <div>
      {" "}
      <div style={{
        display: "flex", 
        justifyContent: "center",
        paddingTop: 150,
        marginBottom: 10
      }}>
        
            <Typography variant={'h6'}>
          Welcome to Academaster! Sign Up Below!
          </Typography></div>
      
      <div style={{display: "flex", 
        justifyContent: "center",}}>
      <Card varint="outlined" style={{width:400 , padding: 20}}>
          <TextField fullWidth={true} id="outlined-basic" label="Username" variant="outlined" />
          <br /> <br />
          <TextField fullWidth={true} id="outlined-basic" label="Password" variant="outlined" type="passwordcdc"/>
          <br />
          <br /><br />
          <Button size="large" variant="contained"> Sign Up</Button>
          </Card>
      </div>
    </div>
  );
};

export default Signin;
