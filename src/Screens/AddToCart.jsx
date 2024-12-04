import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { sendOrderEmail } from "../Config/firebase"; // Import the function to send email via Firebase
import { useLocation } from 'react-router-dom';
import { getAuth } from "firebase/auth"; // Import Firebase auth to get the user

const AddToCart = () => {
  const location = useLocation();
  const { productDetails } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    street: "",
  });
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null); // State to store userId

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle quantity change
  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : prev));
  };

  // Calculate subtotal
  const subtotal = productDetails.discountPrice * quantity;

  // Get userId when the component mounts (ensure user is logged in)
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid); // Set the userId when user is logged in
    }
  }, []);

  // Handle form submission
  const handlePlaceOrder = async () => {
    if (!userId) {
      alert("You need to be logged in to place an order.");
      return;
    }

    const orderDetails = {
      userId, // Include userId to associate the order with the user
      ...formData,
      productName: productDetails.perfumeName,
      productImage: productDetails.imageOne,
      pricePerItem: productDetails.discountPrice,
      quantity,
      subtotal,
    };

    // Send data to Firebase and email
    await sendOrderEmail(orderDetails);
    alert("Order placed successfully!");
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Left Section - User Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Enter Your Details
            </Typography>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Street Address"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Right Section - Product Details */}
          <Grid item xs={12} md={6}>
            <Box>
              <img
                src={productDetails.imageOne}
                alt="Product"
                style={{
                  width: "20%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
            <Typography variant="h6" sx={{ mt: 2, color: "black" }}>
              {productDetails.perfumeName}
            </Typography>
            <Typography>Price: ${productDetails.discountPrice}</Typography>
            <Box display="flex" alignItems="center" sx={{ my: 2 }}>
              <Typography>Quantity</Typography>
              <IconButton onClick={() => handleQuantityChange("decrease")}>
                <Remove />
              </IconButton>
              <TextField
                variant="outlined"
                value={quantity}
                size="small"
                inputProps={{ style: { textAlign: "center" }, readOnly: true }}
                sx={{ width: "50px", mx: 1 }}
              />
              <IconButton onClick={() => handleQuantityChange("increase")}>
                <Add />
              </IconButton>
            </Box>
            <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddToCart;
