import React from "react";
import RegisterForm from "../RegisterForm";
import "./RegisterForm.css";

function RegisterPage() {
  return (
    <div className="register-page">   {/* full-page background + centering */}
      <div className="register-card"> {/* styled card */}
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;


