import React from 'react'
import TextToImage from './TextToImage'
import { Box, Fab } from '@mui/material'
import NavigationIcon from '@mui/icons-material/Navigation';
import { Link } from 'react-router-dom';
const Home = () => {
  const backend_url=process.env.REACT_APP_BACKEND_URL;

  return (
    <Box sx={{display:'flex',flexDirection:'column',height:'600px', alignItems:"center",justifyContent:'center'}}>
      
      <Link to='/image-to-text'style={{marginTop:'20px'}}>
        <Fab variant="extended"  sx={{width:'400px'}}>
          <NavigationIcon  />
           Image to Text using OCR
        </Fab>
      </Link>
      <Link to='/qrcode-generator' style={{marginTop:'20px'}}>
        <Fab variant="extended" sx={{width:'400px'}}>
          <NavigationIcon  />
           QR Code Generator
        </Fab>
      </Link>
      <Link to={backend_url+"/shopping/auth/google"} style={{marginTop:'20px'}}>
        <Fab variant="extended" sx={{width:'400px'}}>
          <NavigationIcon  />
           Google Shopping Api Demostration
        </Fab>
      </Link>
    </Box>
    
  )
}

export default Home