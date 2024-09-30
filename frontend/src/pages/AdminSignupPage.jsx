import React, { useState } from 'react'
import AdminRegister from '../components/admin/AdminRegister';
import AdminSignin from '../components/admin/AdminSignin';

function AdminSignupPage() {

  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      {showRegister ? <AdminRegister setShowRegister={setShowRegister}/> : <AdminSignin setShowRegister={setShowRegister}/>}
    </div>
  )
}

export default AdminSignupPage
