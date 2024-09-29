import React, { useState } from 'react'
import Login from '../components/Login';
import Register from '../components/Register';

function Signup() {

    const [showRegister, setShowRegister] = useState(false);
    
   
  return (
    <div>
      {showRegister ? <Register setShowRegister={setShowRegister}/> : <Login setShowRegister={setShowRegister}/> }
    </div>
  )
}

export default Signup
