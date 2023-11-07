import React, { useState } from 'react'
import QRCode from 'react-qr-code'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const QRCodeGenerator = () => {
    
    const [data,setData]=useState('')

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const upi= data.get('upi')
      const name= data.get('name')
      const amount=data.get('amount')

      
      console.log({
        upi: upi,
        name: name,
        amount:amount
      });

      const params=new URLSearchParams();
      params.set('pn',name);
      params.set('am',amount)

      setData(`upi://pay?pa=${upi}&`+ params.toString())
      console.log(`upi://pay?pa=${upi}&`+ params.toString());
    };
  

  return (
    <div>
       
        
        
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Typography component="h1" variant="h5">
              QR Code Generator
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="upi"
                label="Upi Id"
                name="upi"
      
                autoFocus
              />
              <TextField
                margin="normal"
                
                fullWidth
                name="name"
                label="Name"
                type="name"
                id="name"
      
              />
              <TextField
                margin="normal"
                
                fullWidth
                name="amount"
                label="Amount"
                type="amount"
                id="amount"
      
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Generate
              </Button>
            </Box>
          </Box>
        </Container>
        
        <Box sx={{display:'flex',justifyContent:'center'}}>
        {data.length>0 && (<QRCode value={data} />)}
        </Box>
        
    </div>
  )
}

export default QRCodeGenerator;