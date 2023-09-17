import React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <div>
        <Typography variant={"h6"}> Academaster </Typography>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Button
            onClick={() => {
              navigate("/signin");
            }}
            variant="contained"
          >
            Sign in
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
            variant="contained"
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
