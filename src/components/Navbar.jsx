import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router";
import { auth, db } from "../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { getDocs, doc, query, where, collection} from "firebase/firestore";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Store user object
  const [adminButtonText, setAdminButtonText] = useState("Admin");
  const location = useLocation();

  // Checks the user is logged in and if their user data contains the admin password
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }
    console.log(auth.currentUser);
    if (auth.currentUser.email === "ananya.bhar@gmail.com"){
      setAdmin(true);
    }
    
  }, []);

  // Check if user is authenticated
  useEffect(() => {
    if (location.pathname.includes("admin")) {
      setAdminButtonText("Home");
    } else {
      setAdminButtonText("Admin");
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user data
      } else {
        // Redirect to login page if not logged in
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [navigate]);

  // Handle Admin button toggle between Home and Admin routes
  const handleAdmin = () => {
    if (location.pathname.includes("admin")) {
      navigate("/app"); // Navigate to Home
      setAdminButtonText("Admin");
    } else {
      navigate("/admin"); // Navigate to Admin Page
      setAdminButtonText("Home");
    }
  };

  // Handle Logout functionality
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign out
      setUser(null); // Clear user data
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
    <div className="container-fluid d-flex align-items-center">
      {/* Brand with Logo and Text */}
      <div className="d-flex align-items-center me-auto">
        <img
          src={"logo.png"}
          alt="Logo"
          width="80"
          height="70"
          className="d-inline-block align-text-top me-2"
        />
        <span className="navbar-brand mb-0 h1">Timeless Treasures</span>
      </div>
  
      {/* User Info and Buttons */}
      <div className="row row-cols-auto align-items-center">
        <div className="navbar-brand">{user && `Hi ${user.email}`}</div>
        {admin && (
          <button onClick={handleAdmin} className="btn btn-secondary me-2">
            {adminButtonText}
          </button>
        )}
        <button onClick={handleLogout} className="btn btn-secondary me-2">
          Logout
        </button>
      </div>
    </div>
  </nav>
  
  );
};

Navbar.propTypes = {
  admin: PropTypes.bool,
};

export default Navbar;
