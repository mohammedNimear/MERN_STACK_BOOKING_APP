import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext ";
import { useContext } from "react";

const Navbar = () => {
  // hide register sign in  button
  const {user} = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">MD_Booking</span>
        </Link>
        {user ? user.username : (
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>) 
        }
      </div>
    </div>
  );
};

export default Navbar;
