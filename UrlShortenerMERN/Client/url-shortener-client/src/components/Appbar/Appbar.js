import React from 'react';

import './Appbar.css'
import img from '../../assets/image/logo.png'
import { useNavigate } from 'react-router-dom';


const Appbar = ({isLoggedIn , setIsLoggedIn}) => {

  const navigate = useNavigate();
  const handleLogout = ()=>{
    fetch(`http://localhost:4000/user/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'

    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setIsLoggedIn(false)
        
      })
   navigate("/login")

  }

  return (
    <div className='appbar'>
      <div className="appbar__inner">
        <img src={img} alt="" />

        <div className="appbar__menus">
          <h3 className="active">Dashboard</h3>
          <h3>Profile</h3>
           { isLoggedIn &&   <button className='logout' onClick={handleLogout}>Logout</button>  }
        </div>

      </div>
    </div>
  );
};

export default Appbar;