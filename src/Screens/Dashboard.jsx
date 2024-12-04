import React,{useState,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Component/Header';
import VideoSection from '../Component/VideoSection';
import CardAnimation from '../Component/CardAnimation';
import Footer from '../Component/Footer';
import { Box,Typography,Card,CardContent,CardMedia, TextField} from "@mui/material";
import './Dashboard.css'
import VOLTAIRE from '../pictures/VOLTAIRE.jpg'
import AmberAuraWebImage from '../pictures/AmberAuraWebImage.jpg'
import MidnightMirage from '../pictures/MidnightMirage.jpg'
import SERENEWHISPeR from '../pictures/SERENEWHISPeR.jpg'
import { getTopThreeProducts } from '../Config/firebase';
import WhatsAppButton from '../Component/WhatsAppButton';


const Dashboard = () => {
  const navigate = useNavigate()
  const [topThreeProducts,setTopThreeProducts] = useState([])
  const [imgHover, setImgHover] = useState(null);

  useEffect(() =>{
    fetchProducts()
},[])

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getTopThreeProducts();
      setTopThreeProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <div style={{overflow:'hidden'}}>
      <Header />
      <WhatsAppButton />
        <VideoSection />

        <Box sx={{mt: 5 }}>
  <Box sx={{ display: 'flex', flexDirection: { md: "row", xs: 'column' }, justifyContent: "center", gap: 8 }}>
    <Box sx={{ width: { md: '40%', xs: '100%' }, mt: { md: 15, xs: 5 } }}>
      <Typography sx={{ fontWeight: 'bold', color: 'black', ml: { xs: 2 } }} variant='h4'>Voltaire impression tom Ford leather effect spice woody texture premium and luxury fragrance</Typography>
      <Typography  sx={{ color: 'black',fontSize:'22px',mt: 2, ml: { xs: 2 } }}>
      This premium and luxury fragrance combines a Voltaire-inspired sophistication with the rich, tactile allure of Tom Ford’s iconic leather notes. The scent evokes a sense of intellectual depth and timeless elegance, mirroring Voltaire's intellectual legacy. It features a luxurious leather effect, offering both warmth and power, with a velvety smoothness that lingers. The fragrance is further elevated by a spicy-woody texture, blending sharp spices like black pepper and cinnamon with earthy woods such as sandalwood and cedar.
      </Typography>
    </Box>
    <Box sx={{ width: { md: '40%', xs: '111%' }, mt: { md: 14, xs: 1 }}}>
      <Box sx={{ml:{md:20,xs:0}}}>
      <img
        src= {VOLTAIRE}
        alt="Exemple"
        style={{ width: '90%', ml: { xs: 10} }}
      />
      </Box>
    </Box>
  </Box>
  </Box>
  <CardAnimation />

  <Typography variant='h3' sx={{ mt: { md: 10, xs: 5 }, ml: { md: 15, xs: 2 }, fontSize: { xs: 40, md: 50 }, color: 'orange', fontWeight: 'Bold', textAlign:'center' }}>
  Fragrance Types
</Typography>

<Box sx={{ display: 'flex', flexDirection: {md:'row',xs:'column'}, justifyContent: "center" }} >
        <Card sx={{ maxWidth: 345, mt: 5, ml: 2 }}>
          <CardMedia
            sx={{ height: 200 }}
            image='https://static.vecteezy.com/system/resources/thumbnails/049/806/138/small_2x/beautiful-flower-illustration-white-background-free-vector.jpg'
          />
          <CardContent>
            <Typography sx={{ fontWeight: 'bold',textAlign:'center'}} gutterBottom variant="body1" component="div">
            Floral Fragrances
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Atlantic eel cutthroat eel atka mackerel freshwater eel rock bass rocketly gylty
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 345, mt: 5, ml: 2 }}>
          <CardMedia
            sx={{ height: 200 }}
            image='https://www.shutterstock.com/image-vector/fats-icon-indicating-dietary-sources-260nw-2532815121.jpg'
          />
          <CardContent>
            <Typography sx={{ fontWeight: 'bold',textAlign:'center' }} gutterBottom variant="body1" component="div">
            Fresh Fragrances
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Black scalyfin kingfish convict blenny ziege yellow moray whalefish silver drifitinity elpo
            </Typography>
          </CardContent>
        </Card>
</Box>

<Box  sx={{display:'flex',width:'110%', ml:{md:5,xs:2},mt:5,flexDirection:{md:'row',xs:'column'}}}>
        {topThreeProducts.map((item,index) => {
            return (
            <Box key={item.id} sx={{borderRadius: 3,color: '#000',width:{md:'30%',xs:"90%"},mt:3}}>
                <div className="card-container"
                >
                    <div className="card"
                    onMouseEnter={() => setImgHover(index)} 
                    onMouseLeave={() => setImgHover(null)}
                  onClick={() => navigate('/ProductDetail/'+ item.id)}
                    >
                        <div className="discount">20%</div>
                       
                        <img
                        className="product-image"
                        src= {imgHover === index ? item.imageTwo : item.imageOne}
                        alt="Greenley Eau De Parfum"
                        style={{width:'90%',height:'250px'}}
                    /> 
                    
                        <h3 className="product-title">{item.perfumeName}</h3>
                        <p className="product-weight">Weight: <span>{item.weight}ml</span></p>
                        <div className="price-section">
                            <span className="new-price">{item.discountPrice}
                            Rs</span>
                            <span className="old-price">{item.actualPrice} rs</span>
                        </div>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </Box>
                     );
                    })}
           </Box>
      
            <Box>
  <Typography variant='h4' sx={{textAlign:'center',mt:5,color:'black',fontWeight:'bolder'}}>
  Subscribe newsletter and
  </Typography>
  <Typography variant='h4' sx={{textAlign:'center',color:'black',mt:1}}>
  get -20% off
  </Typography>
  <Typography variant='body1' sx={{textAlign:'center',color:'black',mt:2}}>
  Sprays play a crucial role in manufacturing, from cooling systems in industrial machinery to lubrication processes and the creation of various products.
  </Typography>
  <TextField sx={{mt:3,width:{md:"30%",xs:"70%"},ml:{md:"35%",xs:4},'& .MuiOutlinedInput-root': {
          borderRadius: 8,     '& fieldset': {
            borderColor: 'black', // Set border color here
          },
        }}} placeholder='Enter email Address' />
</Box>

<Footer />
    </div>



  );
};

export default Dashboard;
