import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import img from "../../assets/image/logo.png"
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';

const Login = ({setIsLoggedIn}) => {

  const navigate = useNavigate();

  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: ""
  });

  const handleLogin = () => {
    fetch(`http://localhost:4000/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify(loginPayload),
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if(!data.isLoggedIn)
        {
          alert(data.message)
        }
        setIsLoggedIn(data.isLoggedIn)
      })

   
        navigate("/dashboard")
    

  }



  // const handleCheck = () => {
  //   fetch('http://localhost:4000/user/check-login', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     credentials: 'include' 
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //     });

  // }

  return (
    <div className="auth">
      <div className="auth__container">
        <img src={img} alt="" />
        <div className="auth__form">
          <TextInput
            label="Email"
            value={loginPayload.email}
            onChange={(val) =>
              setLoginPayload({
                ...loginPayload,
                email: val,
              })
            }
            placeholder="xyz@email.com"
          />
          <TextInput
            label="Password"
            value={loginPayload.password}
            onChange={(val) =>
              setLoginPayload({
                ...loginPayload,
                password: val,
              })
            }
            type="password"
            placeholder="*****"
          />
        </div>
        <div className="auth__action">
          <Button label="Login" onClick={handleLogin} />
          {/* <Button label="Check" onClick={handleCheck} /> */}
          <p>
            No account yet? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;