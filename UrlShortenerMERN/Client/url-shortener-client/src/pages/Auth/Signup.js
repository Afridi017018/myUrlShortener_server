import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import img from "../../assets/image/logo.png"

import "./auth.css"

const Signup = () => {



    const [signupPayload, setSignupPayload] = useState({
        name: "",
        email: "",
        password: "",
    });


    const handleSignup = () => {
        fetch(`http://localhost:4000/user/reg`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupPayload),

        })
            .then(response => response.json())
            .then(data => {
                alert(data.message)
            })

    }

    return (
        <div className="auth">
            <div className="auth__container">
                <img src={img} alt="" />
                <div className="auth__form">
                    <TextInput
                        label="Full name"
                        value={signupPayload.name}
                        onChange={(val) =>
                            setSignupPayload({
                                ...signupPayload,
                                name: val,
                            })
                        }
                        placeholder="John Doe"
                    />
                    <TextInput
                        label="Email"
                        value={signupPayload.email}
                        onChange={(val) =>
                            setSignupPayload({
                                ...signupPayload,
                                email: val,
                            })
                        }
                        placeholder="xyz@email.com"
                    />
                    <TextInput
                        label="Password"
                        value={signupPayload.password}
                        onChange={(val) =>
                            setSignupPayload({
                                ...signupPayload,
                                password: val,
                            })
                        }
                        type="password"
                    />
                </div>
                <div className="auth__action">
                    <Button
                        label="Sign up"
                        onClick={handleSignup}
                    />
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;