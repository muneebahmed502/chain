import React, { useState, useEffect } from 'react';
import { getMyAddToCart } from '../Config/firebase';
import { getAuth } from 'firebase/auth';
import { Card, CardContent, Typography, Grid, Button, CircularProgress } from '@mui/material';

const ViewAddToCart = () => {
    const [myCart, setMyCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMyCart();
    }, []);

    const fetchMyCart = async () => {
        const auth = getAuth();
        
        // Check if the user is authenticated before fetching data
        if (!auth.currentUser) {
            setError("User is not authenticated");
            setLoading(false);
            return;
        }
        
        try {
            const fetchedCart = await getMyAddToCart();
            setMyCart(fetchedCart);
        } catch (error) {
            setError("Error fetching products: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>

            <Grid container spacing={3}>
                {myCart.length > 0 ? (
                    myCart.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card elevation={3} style={{ padding: '15px' }}>
                                <CardContent>
                                    <Typography variant="h6">{item.productName}</Typography>
                                    <Typography variant="body1">Price: ₹{item.pricePerItem}</Typography>
                                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                    <Typography variant="body2" style={{ marginTop: '10px' }}>
                                        Subtotal: ₹{item.subtotal}
                                    </Typography>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        style={{ marginTop: '15px' }}
                                    >
                                        Remove from Cart
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6">Your cart is empty.</Typography>
                )}
            </Grid>
        </div>
    );
};

export default ViewAddToCart;
