import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopThreeProducts } from '../Config/firebase';
import './CardAnimation.css';
import { Box, Button, Typography } from '@mui/material';
import RedeemIcon from '@mui/icons-material/Redeem';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MidnightMirage from '../pictures/MidnightMirage.jpg';
import SERENEWHISPeR from '../pictures/SERENEWHISPeR.jpg';
import AmberAuraWebImage from '../pictures/AmberAuraWebImage.jpg';
import MIDNIGHWithBox from '../pictures/MIDNIGHWithBox.jpg';
import SERENEWithBOX from '../pictures/SERENEWithBOX.jpg';
import AMBERWithBOX from '../pictures/AMBERWithBOX.jpg';

const CardAnimation = () => {
    const navigate = useNavigate();
    const [topThreeProducts, setTopThreeProducts] = useState([]);
    const [imgHover, setImgHover] = useState(false);
    const [selectedStep, setSelectedStep] = useState(0);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await getTopThreeProducts();
            setTopThreeProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Get the current product based on the selected step
    const currentData = topThreeProducts[selectedStep];

    return (
        <Box sx={{ display: 'flex', flexDirection:{md:'row',xs:'column'}, p: 6, bgcolor: '#1c1c1c', color: '#fff' }}>
            {/* Left Section */}
            <Box sx={{ flex: 1, pr: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>CHAIN</Typography>
                <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2,fontSize:{md:70,xs:30}}}>
                    The World of Perfume Techniques
                </Typography>
                <Typography sx={{ mb: 4, fontSize:{md:'25px',xs:20} }}>
                    The art of perfume painting encapsulates an explosion of colors and creativity.<br />
                    With a swift movement, aerosol cans release a fine mist that transforms <br />
                    ordinary surfaces into vibrant masterpieces.
                </Typography>
                {/* <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                    <Button variant="contained" sx={{ bgcolor: '#fff', color: '#000', borderRadius: '20px', px: 3 }}>Check More Products</Button>
                    <Button variant="outlined" sx={{ color: '#fff', borderColor: '#fff', borderRadius: '20px', px: 3 }}>Play Video</Button>
                </Box> */}
                {/* Features Section */}
                <Box sx={{ display: 'flex', gap: 4,flexDirection:{md:'row',xs:'column'}}}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RedeemIcon />
                        <Typography sx={{ ml: 1, fontSize: '20px' }}>Finished products and gift wrapping</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocalOfferIcon />
                        <Typography sx={{ ml: 1, fontSize: '20px' }}>Large and frequent promotions</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocalShippingIcon />
                        <Typography sx={{ ml: 1, fontSize: '20px' }}>Free shipping on any order from $150</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Right Section (Product Card) */}
            <Box sx={{ flex: '0 0 400px', borderRadius: 3, p: 3, mr:{md:15,xs:0}, color: '#000',width:{xs:'130%'},ml:{md:0,xs:-8}}}>
            <Box sx={{display:'flex',alignItems:{md:'center',xs:'none'}}} className="card-container">
                {/* Card for the currently selected product */}
                {currentData ? (
                   
                        <div className="card" 
                        onMouseEnter={() => setImgHover(true)} onMouseLeave={() => setImgHover(false)}
                        onClick={() => navigate('/ProductDetail/'+ currentData.id)}
                        >
                            <div className="discount">20%</div>

                            <img
                                className="product-image"
                                src={currentData.imageOne}
                                alt={currentData.perfumeName}
                                style={{ width: '100%', height: '200px' }}
                            />
                            <h3 className="product-title">{currentData.perfumeName}</h3>
                            <p className="product-weight">Weight: <span>{currentData.weight}</span></p>
                            <div className="price-section">
                                <span className="new-price">{currentData.discountPrice} Rs</span>
                                <span className="old-price">{currentData.actualPrice} rs</span>
                            </div>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    
                ) : (
                    <Typography>No product available</Typography>
                )}
                
                {/* Stepper Section */}
                <div className="stepper">
                    <div className="arrow" onClick={() => setSelectedStep(Math.max(0, selectedStep - 1))}>↑</div>
                    <div className="step" onClick={() => setSelectedStep(0)}>01</div>
                    <div className="step" onClick={() => setSelectedStep(1)}>02</div>
                    <div className="step" onClick={() => setSelectedStep(2)}>03</div>
                    <div className="arrow" onClick={() => setSelectedStep(Math.min(topThreeProducts.length - 1, selectedStep + 1))}>↓</div>
                </div>
                </Box>
            </Box>
        </Box>
    );
};

export default CardAnimation;
