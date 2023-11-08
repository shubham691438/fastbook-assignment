import React from 'react'
import TextToImage from './TextToImage'
import { Box, Fab, Typography } from '@mui/material'
import ForwardIcon from '@mui/icons-material/Forward';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


const Home = () => {
  const backend_url=process.env.REACT_APP_BACKEND_URL;

  return (
    <Box >
      <Typography align='center' variant='h1' sx={{color:'green'}}>Web Development Internship Assignment</Typography>
      <Box sx={{display:'flex',flexDirection:'column',height:'600px', alignItems:"center",justifyContent:'center'}}>
        
        <Box style={{marginTop:'20px' }}>
          <Link to='/image-to-text'>
            <Fab variant="extended"  sx={{width:'400px'}} >
              <ForwardIcon />
              Image to Text using OCR
            </Fab>
          </Link>
          <Link to='https://youtu.be/mFxAoiITPwI' style={{marginLeft:"20px"}}><Button variant="contained"  endIcon={<SendIcon />}>Video Demonstration</Button></Link>
        </Box>

        <Box style={{marginTop:'20px'}}>
          <Link to='/qrcode-generator' >
            <Fab variant="extended" sx={{width:'400px'}}>
              <ForwardIcon />
              QR Code Generator
            </Fab>
          </Link>
          <Link to='https://youtu.be/S6hMV73zklg' style={{marginLeft:"20px"}}><Button variant="contained"  endIcon={<SendIcon />}>Video Demonstration</Button></Link>
        </Box>

        {/* <Link to={"http://localhost:5000/shopping/auth/google"} style={{marginTop:'20px'}}> */}
        <Link to={"https://youtu.be/kpWsDrz8KZ4"} style={{marginTop:'20px'}}>
          <Fab variant="extended" sx={{width:'400px'}}>
            <ForwardIcon />
            Google Shopping Api Demostration video
          </Fab>
        </Link>
      </Box>
    </Box>
  )
}

export default Home