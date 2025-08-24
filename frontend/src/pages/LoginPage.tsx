import React from "react";
import LoginForm from "../components/LoginForm";
import "./Login.css";

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;


