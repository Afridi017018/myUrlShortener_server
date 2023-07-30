import React from 'react';

import './Appbar.css'
import img from '../../assets/image/logo.png'
import { Link, useNavigate } from 'react-router-dom';


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
        <img onClick={()=>navigate("/dashboard")} src={img} alt="" />

        <div className="appbar__menus">
        <Link to='/dashboard'>
            <h3 className={window.location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</h3>
          </Link>
          <Link to='/profile'>
            <h3 className={window.location.pathname === '/profile' ? 'active' : ''}>Profile</h3>
          </Link>

           { isLoggedIn &&   <button className='logout' onClick={handleLogout}>Logout</button>  }
        </div>

      </div>
    </div>
  );
};

export default Appbar;