import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ArtworksChicago = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArtworks = async () => {
    const API_URL = "https://api.artic.edu/api/v1/artworks?page=1&fields=id,title,thumbnail,description,artist_title,image_id";

    try {
      const response = await axios.get(API_URL);
      setArtworks(response.data.data); // Extract "data" array from the API response
    } catch (err) {
      setError("Failed to fetch artworks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const truncateDescription = (description, lineLimit) => {
    // Create a temporary DOM element to extract text
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
  
    // Truncate based on character limit for 3 lines (you may adjust the limit as needed)
    const characterLimit = 150; // Adjust this limit based on expected line length
    return plainText.length > characterLimit
      ? plainText.slice(0, characterLimit) + "..."
      : plainText;
  };  

  if (loading) return <p>Loading artworks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <Navbar />
    <div className="container">
      <h1 className="text-center my-4">Artworks</h1>
      <div className="row">
        {artworks.map((artwork) => (
            <div className="col-md-4 mb-4" key={artwork.id}>
            <div className="card h-100">
              {/* {artwork.thumbnail && artwork.thumbnail.lqip && (
                <img
                src={artwork.thumbnail.lqip}
                className="card-img-top"
                alt={artwork.thumbnail.alt_text || "Artwork"}
                  style={{ objectFit: "cover", height: "200px" }}
                  />
                  )} */}
              {
                  artwork.image_id && (
                      <img
                      src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                      className="card-img-top"
                      alt={artwork.title}
                      />
                    )
                }
              <div className="card-body">
                <h5 className="card-title">{artwork.title || "Untitled"}</h5>
                <p className="card-text">
                  <strong>Artist:</strong> {artwork.artist_title || "Unknown"}
                </p>
                <p className="card-text">
                  <strong>Description:</strong>{" "}
                  {artwork.description ? (
                        <span>
                            {truncateDescription(artwork.description, 3)}
                        </span>
                        ) : (
                        "No description available."
                        )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ArtworksChicago;
