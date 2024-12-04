import React from 'react'
import Header from '../Component/Header'
import Banner from '../pictures/Banner.jpg'
import {Box, Typography} from '@mui/material'
import voltile from '../pictures/voltile.jpg'
import Footer from '../Component/Footer'
import WhatsAppButton from '../Component/WhatsAppButton'

const AboutUs = () => {
  return (
    <div style={{overflow:'hidden'}}>
      <Header />
      <WhatsAppButton />
      <img width={"100%"} src={Banner} alt="" />
      <Box sx={{display:'flex',width:'100%',ml:{md:10,xs:4},mt:5,flexDirection:{md:'row',xs:"column"}}}>
        <Box sx={{width:{md:'50%',xs:'80%'}}}>
          <img style={{width:'70%'}} src={voltile} alt="" />
        </Box>
        <Box sx={{width:{md:'40%',xs:"100%"}}}>
          <Typography variant='h3' sx={{fontSize:{md:50,xs:25}}}>
            
          The Chain Perfume Experience
          </Typography>
          <Typography sx={{mt:2,mr:{md:0,xs:5}}} variant='body1'>
          At Chain Perfume, we are dedicated to creating unique, high-quality fragrances that captivate the senses and leave a lasting impression. Our scents are carefully crafted using the finest ingredients, blending art and craftsmanship to offer an unforgettable olfactory experience. Inspired by both classic and modern influences, each fragrance is designed to evoke emotion, power, and elegance. We believe that a fragrance is more than just a scent—it’s an expression of identity and luxury. Join us on a journey of discovery, where every bottle tells a story and every scent leaves its mark.
          </Typography>
        </Box>
      </Box>
      <Footer />
    </div>
  )
}

export default AboutUs
