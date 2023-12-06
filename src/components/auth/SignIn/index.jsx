import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
// import AuthDetails from "../AuDetails";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import "./signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Đăng nhập thành công, có thể thực hiện các hành động sau đây
        console.log(userCredential);

        // Hiển thị thông báo khi đăng nhập thành công
        message.success("Logged in successfully!");
        navigate("/"); // Chuyển hướng sau khi đăng nhập thành công
      })
      .catch(() => {
        // Đăng nhập thất bại, xử lý lỗi
        // console.error(error);
        message.error(
          "Login failed. Please check your login information again."
        );
      });
  };

  return (
    <div className="sign_in">
      <Link to="/">
        {/* <h1 className="sign_in_logo">Slurp</h1> */}
      </Link>
      <form onSubmit={signIn} className="sign_in_form">
        <h2 className="sign_in_signin">Sign In</h2>

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
          <button className="sign_in_form_button">Login</button>
        </div>

        <div className="sign_in_form_register">
          <p className="sign_in_form_register_p">Don't have account?</p>
          <Link to="/sign-up">
            <p className="sign_in_form_register_p1">Register here</p>
          </Link>
        </div>
        {/* <AuthDetails /> */}
      </form>
    </div>
  );
};

export default SignIn;
