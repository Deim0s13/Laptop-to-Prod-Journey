import React, { useEffect, useState } from 'react';
import mockProducts from '../mockProducts';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using mock data for now since the backend is not ready
  useEffect(() => {
    try {
      // Simulate fetching data with a timeout
      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 500); // Adding a slight delay to simulate an API call
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Welcome to My Webstore</h1>
      <div className="row">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default Home;