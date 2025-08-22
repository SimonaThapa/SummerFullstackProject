import { NavLink } from "react-router-dom";
import { AuthContext, type IAuthContext } from "../App";
import { useContext } from "react";
import "./Navbar.css";

function Navbar() {
  const { isAuth } = useContext<IAuthContext>(AuthContext);

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          About Us
        </NavLink>

        {isAuth ? (
          <>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
              Profile
            </NavLink>
            <NavLink to="/questionset/list" className={({ isActive }) => (isActive ? "active" : "")}>
              QuestionSet
            </NavLink>
            <button onClick={logoutHandler}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
              Register
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
              Login
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
