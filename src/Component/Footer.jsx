import React from 'react'
import {Box, Typography} from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import WebsiteLogo from '../pictures/WebsiteLogo.png'

const Footer = () => {
  return (
    <div>
      <Box sx={{width:"100%",background:'black',mt:5,display:'flex',flexDirection:{md:"row",xs:'column'}}}>
        <Box sx={{width:{md:'25%',xs:'70%'},color:'white',ml:5,pt:3}}>
        <img width={"200px"} src={WebsiteLogo} alt="" />
          <Typography sx={{mt:0}}>
          Precision sprayers ensure targeted application, minimizing environmental impact while maximizing crop yield and health. Furthermore, irrigation systems utilize sprays to distribute water efficiently.
          </Typography>
        </Box>
        <Box sx={{width:'20%',color:'white',ml:5,pt:5,pl:{md:2,xs:0}}}>
        <Typography variant='h5' sx={{fontWeight:'bold'}}>
          Navigation :
          </Typography>
          <Typography sx={{mt:3}}>
            Contact 
            </Typography>
            <Typography sx={{mt:1}}>
            product
            </Typography>
            <Typography sx={{mt:1}}>
            About US 
          </Typography>
        </Box>

        <Box sx={{width:'20%',color:'white',ml:5,pt:5}}>
        <Typography variant='h5' sx={{fontWeight:'bold'}}>
         About Us :
          </Typography>
          <Typography sx={{mt:3}}>
            Home 
            </Typography>
            <Typography sx={{mt:1}}>
            product
            </Typography>
            <Typography sx={{mt:1}}>
            contact 
          </Typography>
        </Box>

        <Box sx={{width:'20%',color:'white',ml:5,pt:5}}>
        <Typography variant='h5' sx={{fontWeight:'bold'}}>
         share :
          </Typography>
          <Box sx={{display:'flex',gap:2}}>
            <a
           href="https://www.instagram.com/chain.perfumes/"  // Replace with your WhatsApp number
           target="_blank" 
            >
            <InstagramIcon sx={{mt:3,color:'white'}} />
            </a>
            <YouTubeIcon sx={{mt:3}} />
            <a
          href="https://www.facebook.com/Chain.Perfumes"  // Replace with your WhatsApp number
          target="_blank"                   // Open in a new tab
            >
            <FacebookIcon sx={{mt:3,color:'white'}} />
            </a>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Footer
