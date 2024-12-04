import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Header from '../Component/Header';
import './Product.css';
import { getAllProducts } from '../Config/firebase';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    getproducts();
  }, []);

  async function getproducts() {
    try {
      const res = await getAllProducts();
      console.log('res', res);
      setproducts(res);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false); // In case of an error, set loading to false
    }
  }

  return (
    <div>
      <Header />
      <Box sx={{ overflow: 'hidden' }}>
        <Typography variant='h3' sx={{ mt: { md: 10, xs: 0 }, ml: { md: "40%", xs: 0 }, fontWeight: 'bold' }}>
          Our Products
        </Typography>

        {/* Show Loader if loading is true */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          // Show products when loading is false
          <Box sx={{ display: 'flex', width: '110%', ml:{md:5,xs:2}, mt: 5 ,  flexWrap: 'wrap',flexDirection:{md:'row',xs:'column'}}}>
            {products.map(item => {
              return (
                <Box key={item.id} sx={{ borderRadius: 3, color: '#000', width:{md:'30%',xs:'70%'},mt:5}}>
                  <div className="card-container">
                    <div className="card" onClick={() => navigate('/ProductDetail/' + item.id)}>
                      <div className="discount">20%</div>

                      <img
                        className="product-image"
                        src={item.imageOne}
                        alt="Greenley Eau De Parfum"
                        style={{ width: '50%', height: '200px' }}
                      />
                      <h3 className="product-title">{item.perfumeName}</h3>
                      <p className="product-weight">Weight: <span>{item.weight}</span></p>
                      <div className="price-section">
                      <span className="new-price">{item.discountPrice} Rs</span>
                        <span className="old-price">{item.actualPrice} rs</span>
                        
                      </div>
                      <button className="add-to-cart">Add to Cart</button>
                    </div>
                  </div>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Product;
