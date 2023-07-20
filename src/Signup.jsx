import React from 'react'
import './Signup.css'

const Signup = () => {
  return (
    <div className='container'>
        <div className="centered-element">
       Username = <input type="text" style={{
        padding: 5,
        borderRadius: 8,
    boxShadow:" 0 4 8 rgba(0, 0, 0, 0.1)"}} />
       <br />
       Password = <input type="text" style={{
        padding: 5,
        borderRadius: 8,
    boxShadow:" 0 4 8 rgba(0, 0, 0, 0.1)"}} />
       
       <br />
       <button style={{
        padding: 10,
        
        borderRadius: 8,
    boxShadow:" 0 4 8 rgba(0, 0, 0, 0.1)"}}>Sign up</button>
       </div></div>
  )
}

export default Signup