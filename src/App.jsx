import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ItemsProvider } from "./contexts/ItemsProvider";
import { ModalsProvider } from "./contexts/ModalsProvider";
import HomePage from "./pages/Home";
import AdminPage from "./pages/Admin";
import LandingPage from "./pages/LandingPage";
import { AutoSignIn } from "./firebase/AutoSignIn";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import ArtworksPage from "./pages/Artworks";
import ArtworksChicago from "./pages/Artworks_Chicago";
import ProductsPage from "./pages/Misc_Sale";
import { auth, db } from "./firebase/config";
import { getDoc, doc } from "firebase/firestore";
import { use } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch admin status after login
  useEffect(() => {
    const checkAdmin = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, "users", auth.currentUser.uid);
      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists() && docSnap.data().role === "admin") {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  // Loader while checking admin status
  if (loading) {
    return <div>Loading...</div>;
  }

  // Providers wrap the app
  const Providers = ({ children }) => (
    <ItemsProvider demo={false}>
      <ModalsProvider>{children}</ModalsProvider>
    </ItemsProvider>
  );

  // ProtectedRoute to prevent access to restricted pages
  // function ProtectedRoute({ children, condition }) {
  //   return condition ? children : <Navigate to="/" />;
  // }

  return (
    <Providers>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Main App */}
          <Route
            path="/app"
            element={
              <>
                <Navbar admin={admin} />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  {/* <Route
                    path="/admin"
                    element={
                      <ProtectedRoute condition={admin}>
                        <AdminPage />
                      </ProtectedRoute>
                    }
                  /> */}
                </Routes>
                <Footer />
              </>
            }
          />
          <Route
            exact
            path={"/register"}
            element={
              <RegisterPage />
            }
          />
           <Route
            exact
            path={"/login"}
            element={
              <LoginPage />
            }
          />

            {/* <Route
            exact
            path={"/register"}
            element={
              <HomePage />
            }
          /> */}
          
          <Route
            path={"/artworks"}
            element={
              <ArtworksChicago />
            }
          />
          <Route
            path={"/admin"}
            element={
              <AdminPage />
            }
          />
          <Route 
            path="/category"
            element={<CategoryPage />}
          />
          <Route 
            path="/antiques"
            element={<HomePage />}
          />
          <Route 
            path="/products"
            element={<ProductsPage />}
          />
        </Routes>
      </Router>
    </Providers>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
