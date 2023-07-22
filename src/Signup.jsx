import React from 'react'
import './Signup.css'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
const Signup = () => {
  return (
    <div> <center>
        <div style={{marginTop:150,
        marginBottom:10}}>
Welcome to Academaster! Sign Up Below!
        </div>

</center>
<center>


    <div style={{
        border: '2px solid black',
        width:400,
        marginTop: 150
    }}>
        
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
       <br />
       Password = <input type="text" ></input>
       <br />
       <Button variant='contained'> Sign Up</Button>
       </div></center></div> 
  )
}

export default Signup