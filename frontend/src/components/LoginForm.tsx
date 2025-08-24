import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext, type IAuthContext } from "../App";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext<IAuthContext>(AuthContext);

  // Handlers for input changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalData = { email, password };
    console.log("Sending login data:", finalData); // Debug payload

    axios
      .post("http://localhost:5000/users/login", finalData)
      .then((response) => {
        const token = response.data.accessToken;

        if (!token) {
          alert("Login failed: No token returned from backend.");
          return;
        }

        // Save token to localStorage
        localStorage.setItem("accessToken", token);

        // Update auth state
        setAuthState((prev) => ({
          ...prev,
          isAuth: true,
          roleState: response.data.role || "guest",
        }));

        // Redirect to home
        window.location.href = "/";
      })
      .catch((error) => {
        // Detailed error handling
        if (error.response) {
          console.error("Response error:", error.response.data);
          alert(
            error.response.data.message ||
              error.response.data.error ||
              JSON.stringify(error.response.data) ||
              `Request failed: ${error.response.status}`
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
          alert("No response from server. Is backend running?");
        } else {
          console.error("Error setting up request:", error.message);
          alert("Error: " + error.message);
        }
      });
  };

  return (
    <div className="login-card">
      <h2>Login Form</h2>
      <p>Login to Continue</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"  // Fixed to match backend
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"  // Fixed to match backend
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
