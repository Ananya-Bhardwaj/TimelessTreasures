import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router";
import { auth } from "../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = ({ admin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Store user object
  const [adminButtonText, setAdminButtonText] = useState("Admin");
  const location = useLocation();

  // Check if user is authenticated
  useEffect(() => {
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
      navigate("/"); // Navigate to Home
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
      <div className="container-fluid">
        <div className="navbar-brand mb-0 h1 me-auto">
          {/* <img
            src={import.meta.env.BASE_URL + "logo.png"}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          /> */}
          Timeless Treasures
        </div>
        <div className="row row-cols-auto">
          <div className="navbar-brand">{user && `Hi ${user.email}`}</div>
          {admin && (
            <button
              onClick={handleAdmin}
              className="btn btn-secondary me-2"
            >
              {adminButtonText}
            </button>
          )}
          <button
            onClick={handleLogout}
            className="btn btn-secondary me-2"
          >
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
