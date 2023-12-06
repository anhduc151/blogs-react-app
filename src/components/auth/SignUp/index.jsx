import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        try {
          message.success("Sign Up Successfully!");
          Navigate("/sign-in");
        } catch (error) {
          console.error("Error displaying success message:", error);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("Sign Up Error");
      });
  };

  return (
    <div className="sign_in">
      {/* <form onSubmit={SignUp}>
        <h1>Sign Up</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign Up</button>
      </form> */}
      <Link to="/">
        {/* <h1 className="sign_in_logo">Slurp</h1> */}
      </Link>
      <form onSubmit={handleSignUp} className="sign_in_form">
        <h2 className="sign_in_signin">Sign Up</h2>

        <p className="sign_in_form_p">
          <span className="sign_in_form_span">*</span>Email
        </p>
        <input
          className="sign_in_form_input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p lang="sign_in_form_p">
          <span className="sign_in_form_span">*</span>Password
        </p>
        <input
          className="sign_in_form_input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="sign_in_form_btn">
          <button className="sign_in_form_button">Sign Up</button>
        </div>
        {/* <AuthDetails /> */}
      </form>
    </div>
  );
};

export default SignUp;
