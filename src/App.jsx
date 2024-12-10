import React from "react";
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

function App() {
  const demo = true;
  const { admin } = AutoSignIn();

  const Providers = ({ children }) => (
    <ItemsProvider demo={demo}>
      <ModalsProvider>{children}</ModalsProvider>
    </ItemsProvider>
  );

  function ProtectedRoute({ children, condition }) {
    return condition ? children : <Navigate to="/" />;
  }

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
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute condition={admin}>
                        <AdminPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                <Footer />
              </>
            }
          />
          <Route
            exact
            path={ "/login"}
            element={
              <LoginPage />
            }
          />
           <Route
            exact
            path={ "/category"}
            element={
              <CategoryPage />
            }
          />

            <Route
            exact
            path={ "/antiques"}
            element={
              <HomePage />
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
            path={"/artworks"}
            element={
              <ArtworksChicago />
            }
          />
          <Route
            exact
            path={ "/movie-collectables"}
            element={
              <ProductsPage />
            }
          />
          {/* <Route
            exact
            path={ "/ticket"}
            element={
              <ProductsPage />
            } */}
          {/* /> */}
        </Routes>
      </Router>
    </Providers>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
