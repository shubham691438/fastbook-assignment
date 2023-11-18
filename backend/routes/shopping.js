const { google } = require('googleapis');
require('dotenv').config();
const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, MERCHANT_ID } = process.env;
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const express = require('express');
const router = express.Router();

const Product = require('../models/ProductModel');

let tokens = null;

// Creating an OAuth2 client
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, CALLBACK_URL);

// Defining the necessary scopes for the Content API
const scopes = [
  'https://www.googleapis.com/auth/content',
];

// Generating the URL for user consent
function getGoogleAuthURL() {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  return url;
}

router.get('/auth/google', (req, res) => {
  res.redirect(getGoogleAuthURL());
});

// Handling the OAuth callback and exchanging the code for tokens
router.get('/auth/google/callback', async (req, res) => {
  try {
    const code = req.query.code;

    // Exchanging the authorization code for tokens
    const tokenResponse = await oauth2Client.getToken(code);
    tokens = tokenResponse.tokens;
    oauth2Client.setCredentials(tokens);

    // storing the refresh token in your database for future access
    const refreshToken = tokens.refresh_token;

    res.redirect('/shopping/add-product');
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Fetch product data from MongoDB and upload it to Google Shopping
router.get('/add-product', async (req, res) => {
  try {
    
    const productData = await Product.findOne({ offerId: "book123" }).select({ _id: 0, __v: 0, 'shipping._id': 0 }).lean();

    if (!productData) {
      return res.status(404).json({ error: "Product not found in MongoDB" });
    }

    console.log(productData);
    
    try {
      const response = await axios.post(`https://content.googleapis.com/content/v2.1/5300359134/products`, productData, {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Product added:', response.data);
      res.status(200).json({ msg: "Data added successfully", productData });
    } catch (googleApiError) {
      console.error('Error adding product to Google Content API:' ,googleApiError);
      res.status(500).json({ error: googleApiError });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// Set the OAuth2 client for global authentication
google.options({
  auth: oauth2Client,
});

module.exports = router;
