import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase';
import AuthDetails from "../AuDetails";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Đăng nhập thành công, có thể thực hiện các hành động sau đây
        console.log(userCredential);
        navigate("/detail"); // Chuyển hướng sau khi đăng nhập thành công
      })
      .catch((error) => {
        // Đăng nhập thất bại, xử lý lỗi
        console.error(error);
        setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.");
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Login to your account</h1>
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
        <button>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <AuthDetails />
      </form>
    </div>
  );
};

export default SignIn;
