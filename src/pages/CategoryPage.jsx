import React from 'react';
import './CategoryPage.css';  // Import the CSS file for styling

const CategoryPage = () => {
  return (
    <section className="category-page">
      <h1 className="page-title">Browse Our Categories</h1>
      <div className="category-container">
        
        {/* Category 1 - Antiques */}
        <div className="category-item category-antiques">
          <h2 className="category-title">Antiques</h2>
          <p className="category-description">Explore a wide range of rare and vintage antiques from various eras.</p>
        </div>

        {/* Category 2 - Artworks */}
        <div className="category-item category-artworks">
          <h2 className="category-title">Artworks</h2>
          <p className="category-description">Discover timeless pieces of art from renowned artists and new creators.</p>
        </div>

        {/* Category 3 - Movie Collectables */}
        <div className="category-item category-movie-collectables">
          <h2 className="category-title">Movie Collectables</h2>
          <p className="category-description">Find rare movie memorabilia and collectibles from your favorite films.</p>
        </div>

        {/* Category 4 - Miscellaneous Products */}
        <div className="category-item category-miscellaneous">
          <h2 className="category-title">Miscellaneous Products</h2>
          <p className="category-description">Browse a unique selection of miscellaneous vintage and collectible products.</p>
        </div>

      </div>
    </section>
  );
};

export default CategoryPage;
