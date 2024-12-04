import React from 'react'
import Header from '../Component/Header'
import {Box, Button, TextField, Typography} from '@mui/material'
import Banner from '../pictures/Banner.jpg'
import Footer from '../Component/Footer'
import WhatsAppButton from '../Component/WhatsAppButton'

const ContactUs = () => {
  return (
    <div style={{overflow:'hidden'}}>
      <Header />
      <WhatsAppButton />
      <Box>
        <img width={"100%"} src={Banner} alt="" />
      </Box>
      <Box sx={{display:'flex',mt:{md:20,xs:10},justifyContent:'center',width:'100%',ml:12,flexDirection:{md:'row',xs:'column'}}}>
        <Box sx={{width:{md:'30%',xs:'70%'}}}>
          <img style={{width:'50%'}} src="https://www.shutterstock.com/image-vector/gpsnavigator-pin-checking-blue-color-260nw-565139857.jpg" alt="" />
          <Typography sx={{ml:{md:8,xs:0},mt:2,fontWeight:'bold'}} variant='h5'>Adress</Typography>
          <Typography sx={{ml:{md:3,xs:0},mt:2,fontWeight:'bold'}} variant='body1'>Gulshan Iqbal block 05</Typography>
        </Box>
        <Box sx={{width:{md:'30%',xs:'70%'},mt:{md:0,xs:3}}}>
          <img style={{width:'30%'}} src="https://media.istockphoto.com/id/1494579261/vector/telephone-handset-simple-circle-icon.jpg?s=612x612&w=0&k=20&c=bpf-J3OuFFZDNS3gQQ25Xgp6PKJ_lhbmvuO-kYgNCSg=" alt="" />
          <Typography sx={{ml:{md:0,xs:0},mt:2,fontWeight:'bold'}} variant='h5'>Phone Number</Typography>
          <Typography sx={{ml:{md:2,xs:0},mt:2,fontWeight:'bold'}} variant='body1'>+92 3472395827</Typography>
        </Box>
        <Box sx={{width:{md:'30%',xs:'70%'},mt:{md:0,xs:3}}}>
        <img style={{width:'35%',}} src="https://png.pngtree.com/png-vector/20220520/ourmid/pngtree-a-round-email-icon-envelope-vector-technology-internet-message-vector-png-image_46264236.jpg" alt="" />
          <Typography sx={{ml:{md:5,xs:0},mt:0,fontWeight:'bold'}} variant='h5'>Email</Typography>
          <Typography sx={{ml:{md:0,xs:0},mt:1,fontWeight:'bold'}} variant='body1'>chainPerfume@gmail.com</Typography>
        </Box>
      </Box>

<Box sx={{mt:{md:15,xs:5},ml:{md:15,xs:1}}}>
  <Typography variant='h4'>
  Send Message
  </Typography>
  <Box sx={{mt:5}}>
  <TextField sx={{width:{md:'30%',xs:'45%'},ml:{md:3,xs:0}}} id="outlined-basic" label="Full Name" variant="outlined" />
  <TextField sx={{width:{md:'30%',xs:'45%'},ml:{md:3,xs:2}}} id="outlined-basic" label="Email" variant="outlined" />
  <br />
  <TextField sx={{width:{md:'62%',xs:'90%'},ml:{md:3,xs:0},mt:4}} id="outlined-basic" label="Subject" variant="outlined" />
  <br />
  <TextField
 sx={{width:{md:'62%',xs:'90%'},ml:{md:3,xs:0},mt:4}}
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
        />
  </Box>
  <Button sx={{ml:3,mt:3,width:{md:'15%',xs:"70%"},border:'1px solid black',background:'white',color:'black',fontWeight:'bold'}} variant='contained'>send</Button>
</Box>
<Footer />
    </div>
  )
}

export default ContactUs
