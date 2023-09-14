import React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";


const Navbar = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: 10
    }}>
      <div>
        <Typography variant={"h6"}> Academaster </Typography>
      </div>
      <div style={{display:"flex"}}>
        <div style={{marginRight:10}}>
        <Button variant="contained">Sign in</Button>
        </div>
        <div>
        <Button variant="contained">Sign up</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
