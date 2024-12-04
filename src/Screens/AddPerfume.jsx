import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/system';
import { postAdToDb } from '../Config/firebase';

const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: '600px',
  margin: 'auto',
  padding: '20px',
  background: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const AddPerfume = () => {
  const navigate = useNavigate()
  const [perfumeName, setPerfumeName] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // Perform validation
      if (
        !perfumeName ||
        !description ||
        !weight ||
        !actualPrice ||
        !discountPrice ||
        !imageOne ||
        !imageTwo ||
        !imageThree
      ) {
        alert('Please fill in all the inputs!');
        return;
      }

      const add = {
        perfumeName,
        description,
        weight,
        actualPrice,
        discountPrice,
        imageOne,
        imageTwo,
        imageThree,
        createdAt: Date.now(), // Add the current server timestamp
      };
      await postAdToDb(add)
      navigate('/')
    } catch (e) {
      alert(e.message);
    }
  };

  const handleImageUpload = (setImageFunc) => (event) => {
    const file = event.target.files[0]; // Select the first file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageFunc(e.target.result); // Set Base64 URL to state
      };
      reader.readAsDataURL(file); // Convert file to Data URL
    }
  };

  return (
    <>
    <FormContainer>
      <Typography variant="h4" gutterBottom align="center">
        Add Perfume
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Perfume Name"
              value={perfumeName}
              onChange={(e) => setPerfumeName(e.target.value)}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Weight (e.g., 100ml)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Actual Price"
              value={actualPrice}
              onChange={(e) => setActualPrice(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Discount Price"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Perfume Image 1
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload(setImageOne)}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Perfume Image 2
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload(setImageTwo)}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Perfume Image 3
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload(setImageThree)}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#4CAF50', color: '#fff' }}
            >
              Submit Perfume
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContainer>

    </>
  );
};

export default AddPerfume;
