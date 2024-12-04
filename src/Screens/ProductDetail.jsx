import React,{useState,useEffect} from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  Rating,
  TextField,
} from '@mui/material';
import { getSingleProduct } from '../Config/firebase';
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { Add, Remove } from '@mui/icons-material';
import ReviewPage from '../Component/ReviewPage';
import Footer from '../Component/Footer';
import AMBERWithBOX from '../pictures/AMBERWithBOX.jpg'
import AmberAuraWebImage from '../pictures/AmberAuraWebImage.jpg'


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [detailItem, setdetailItem] = useState([])
  const [thumbnails, setThumbnails] = useState([]);
  const [mainImage, setMainImage] = useState()


  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) setQuantity((prev) => prev - 1);
    }
  };

// //   Function to handle image change
  const handleImageChange = (image) => {
      setMainImage(image); // Change the image
  };

//   const thumbnails = [
//     'https://static.vecteezy.com/system/resources/previews/021/875/422/non_2x/perfume-bottle-created-with-generative-ai-photo.jpg',
//     'https://royalsperfume.com/cdn/shop/files/sku170267912789540201-1_1800x1800.jpg?v=1727937359',
//     'https://royalsperfume.com/cdn/shop/files/aventos-blue-for-him-aromatas-artimas-creed-aventus-3-1_1015bbc1-4142-48ae-a577-89d5ff07f800_1800x1800.jpg?v=1727937360',
//     'https://royalsperfume.com/cdn/shop/files/social.86909_1800x1800.jpg?v=1724757258',
//   ];

  
  useEffect(() => {
    getDetail()
  }, [])

  async function getDetail() {
    const res = await getSingleProduct(id)
    setdetailItem(res)

    const imageUrls = [
      res.imageOne,
      res.imageTwo,
      res.imageThree
    ];
    setThumbnails(imageUrls);
   setMainImage(res.imageOne)
  }
  console.log(detailItem)

  return (
    <>
    <Box sx={{ p: 4, bgcolor: 'black', color: 'white' }}>
      <Grid container spacing={4}>
        {/* Left Section - Product Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{display:'flex',flexDirection:{md:'row',xs:'column'}}}>
            {/* Thumbnails */}
            <Box
              sx={{
                display: 'flex',
                flexDirection:{md:'column',xs:"row"},
                alignItems: 'center',
                gap: 2,
                mr: 2,
              }}
            >
              {thumbnails.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  style={{
                    cursor: 'pointer',
                    width: 60,
                    border: mainImage === img ? '2px solid #FFD700' : 'none', // Highlight selected thumbnail
                    borderRadius: '8px',
                  }}
                  onClick={() => handleImageChange(img)}
                />
              ))}
            </Box>
            {/* Main Image */}
            <Box
              sx={{
                bgcolor: 'white',
                p: 3,
                borderRadius: 2,
                ml:{md:5,xs:-3},
                width:{md:"60%",xs:"100%"}
              }}
            >
              <img
                src={mainImage}
                alt="Product"
                style={{
                  width: '100%',
                  height: '350px',
                  borderRadius: '16px',
                  transition: 'opacity 0.3s ease-in-out',
                  marginLeft:'%'
                }}
              />
            </Box>
          </Box>
        </Grid>
        
        {/* Right Section - Product Details */}
        <Grid item xs={12} md={6}>
          <Typography sx={{color:'white'}} variant="h4" gutterBottom>
          {detailItem.perfumeName}
          </Typography>
          <Typography variant="body1"  sx={{ mb: 2,color:'white'}}>
        {detailItem.description}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
            <Rating name="rating" value={4} readOnly />
          </Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Rs{detailItem.discountPrice}{' '}
            <Typography component="span" sx={{ textDecoration: 'line-through', ml: 1 }}>
              {detailItem.actualPrice} Rs
            </Typography>
          </Typography>

          {/* Quantity Section */}
          <Box display="flex" alignItems="center" sx={{ my: 2 }}>
            <Typography>Quantity</Typography>
            <IconButton sx={{color:'white'}} onClick={() => handleQuantityChange('decrease')} size="small">
              <Remove sx={{color:'white'}} />
            </IconButton>
            <TextField
              variant="outlined"
              value={quantity}
              size="small"
              inputProps={{ style: { textAlign: 'center',color:'white'}, readOnly: true }}
              sx={{ width: '60px', '& fieldset': {
                borderColor: 'white',}}}
            />
            <IconButton onClick={() => handleQuantityChange('increase')} size="small">
              <Add sx={{color:'white'}} />
            </IconButton>
          </Box>

          {/* Weight Select */}
          <Typography>Weight : {detailItem.weight}</Typography>



          {/* Action Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button onClick={() => navigate('/AddToCart', { state: { productDetails: detailItem } })} fullWidth variant="contained" color="primary" sx={{ bgcolor: 'white',color:"black",ml:{md:20,xs:5},borderRadius:5,mt:5}}>
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{mt:5,display:'flex',width:'100%',flexDirection:{md:"row",xs:'column'}}}>
        <Box sx={{width:'50%',ml:{md:0,xs:-11}}}>
        <img style={{width:"350px",height:"300px",marginLeft:'40%'}} src={detailItem.imageThree} alt="" />
        </Box>
        <Box sx={{width:{md:'40%',xs:"100%"},ml:{md:0,xs:2}}}>
    <Typography>
    
    This premium and luxury fragrance combines a Voltaire-inspired sophistication with the rich, tactile allure of Tom Ford’s iconic leather notes. The scent evokes a sense of intellectual depth and timeless elegance, mirroring Voltaire's intellectual legacy. It features a luxurious leather effect, offering both warmth and power, with a velvety smoothness that lingers. The fragrance is further elevated by a spicy-woody texture, blending sharp spices like black pepper and cinnamon with earthy woods such as sandalwood and cedar. This creates a balanced, dynamic profile that is both bold and refined. Ideal for individuals who appreciate complexity and refinement, it delivers an unforgettable impression of strength and elegance. The result is a fragrance that speaks to those with discerning tastes, offering a scent that is as powerful as it is sophisticated.
    </Typography>
    </Box>
    </Box>

    <Box sx={{mt:5,ml:5}}>
        <Typography variant='h4' sx={{fontWeight:'bold'}}>
        Reviews : 
        </Typography>

        <ReviewPage />
    </Box>
    
    <Footer />
    </>
  );
};

export default ProductDetail;
