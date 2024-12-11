import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import StripeButton from "../components/StripeButton";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    const API_URL = "https://api.artic.edu/api/v1/products?page=5";

    try {
      const response = await axios.get(API_URL);
      setProducts(response.data.data); // Extract "data" array from the API response
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <Navbar />
    <div className="container">
      <h1 className="text-center my-4">Miscellaneous Products</h1>
      <div className="row">
        {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image_url}
                className="card-img-top"
                alt={product.title}
                style={{
                    objectFit: "cover",
                    height: "250px",
                }}
                />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  <div
                    dangerouslySetInnerHTML={{ __html: truncateDescription(product.description, 10)}}
                  />
                </p>
                <p className="card-text">
                  <strong>Price: </strong>{product.price_display ? product.price_display.replace(/<[^>]*>/g, '') : "$0.00"}
                </p>
                {/* <a
                  href={product.web_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View Details
                </a> */}

                <StripeButton priceId="price_1QUjPuSDfaeqN3M5tUpup7vY"/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ProductsPage;
