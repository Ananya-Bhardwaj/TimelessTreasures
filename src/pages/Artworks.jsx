import React, { useEffect, useState } from "react";
import axios from "axios";

const ArtworksPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch artworks
  const fetchArtworks = async () => {
    const API_URL = process.env.REACT_APP_ARTSY_API_URL;
    const XAPP_TOKEN = process.env.REACT_APP_XAPP;

    try {
      const response = await axios.get(API_URL, {
        headers: {
          "X-XAPP-Token": XAPP_TOKEN,
        }
        // params: {
        //   artist_id: "artist-id-here", // Example: Replace with actual artist ID
        //   // Add other parameters if needed, like partner_id, show_id, etc.
        // },
      });
      setArtworks(response.data._embedded.artworks || []);
    } catch (err) {
      setError("Failed to fetch artworks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  if (loading) return <p>Loading artworks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1 className="text-center my-4">Artworks</h1>
      <div className="row">
        {artworks.map((artwork) => (
          <div className="col-md-4 mb-4" key={artwork.id}>
            <div className="card">
              {artwork._links.image && (
                <img
                  src={artwork._links.image.href.replace("{image_version}", "large")}
                  className="card-img-top"
                  alt={artwork.title}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{artwork.title || "Untitled"}</h5>
                <p className="card-text">Artist: {artwork.artist?.name || "Unknown"}</p>
                <p className="card-text">
                  Date: {artwork.date || "Unknown"} <br />
                  Medium: {artwork.medium || "Unknown"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworksPage;
