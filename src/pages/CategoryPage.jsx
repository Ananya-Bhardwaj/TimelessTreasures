import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryPage.css";

const CategoryPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [galleryContent, setGalleryContent] = useState("");

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Function to fetch and display Virtual Gallery content
  // const handleVirtualGalleryClick = async () => {
  //   try {
  //     const response = await fetch("http://192.168.1.16:9966/"); // Replace with the actual URL
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch the Virtual Gallery content.");
  //     }
  //     const data = await response.text();
  //     setGalleryContent(data);
  //     setShowModal(true);
  //   } catch (error) {
  //     console.error("Error fetching Virtual Gallery content:", error);
  //     setGalleryContent("Unable to load Virtual Gallery content at this time.");
  //     setShowModal(true);
  //   }
  // };

  const handleVirtualGalleryClick = () => {
    // Redirect to the external page
    window.location.href = "http://192.168.1.16:9966/";
  };
  return (
    <>
    <div className="category-pager">
      <section className="category-page">
        <h1 className="page-title">Browse Our Categories</h1>
        <div className="category-container">
          {/* Card 1 */}
          <div
            className="category-item"
            onClick={() => handleNavigation("/antiques")}
          >
            <h2 className="category-title">Antiques</h2>
            <p className="category-description">
              Explore a wide range of rare and vintage antiques from various eras.
            </p>
          </div>
          {/* Card 2 */}
          <div
            className="category-item"
            onClick={() => handleNavigation("/artworks")}
          >
            <h2 className="category-title">Artworks</h2>
            <p className="category-description">
              Discover timeless pieces of art from renowned artists and new creators.
            </p>
          </div>
          {/* Card 3 */}
          <div
            className="category-item"
            onClick={() => handleNavigation("/movie-collectables")}
          >
            <h2 className="category-title">Movie Collectables</h2>
            <p className="category-description">
              Find rare movie memorabilia and collectibles from your favorite films.
            </p>
          </div>
          {/* Card 4 */}
          <div
            className="category-item"
            onClick={() => handleNavigation("/products")}
          >
            <h2 className="category-title">Miscellaneous Products</h2>
            <p className="category-description">
              Browse a unique selection of miscellaneous vintage and collectible products.
            </p>
          </div>
          {/* Virtual Gallery Card */}
          <div
            className="category-item"
            onClick={handleVirtualGalleryClick}
          >
            <h2 className="category-title">Virtual Gallery</h2>
            <p className="category-description">
              Immerse yourself in our exclusive virtual gallery experience.
            </p>
          </div>
        </div>
      </section>

      {/* Modal for Virtual Gallery */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <div
              className="gallery-content"
              dangerouslySetInnerHTML={{ __html: galleryContent }}
            ></div>
          </div>
        </div>

      )}
      </div>
    </>
  );
};

export default CategoryPage;
