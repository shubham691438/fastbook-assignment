const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  offerId: String,
  title: String,
  description: String,
  link: String,
  imageLink: String,
  contentLanguage: String,
  targetCountry: String,
  feedLabel: String,
  channel: String,
  availability: String,
  condition: String,
  googleProductCategory: String,
  gtin: String,
  price: {
    value: String,
    currency: String,
  },
  shipping: [
    {
      country: String,
      service: String,
      price: {
        value: String,
        currency: String,
      },
    },
  ],
  shippingWeight: {
    value: String,
    unit: String,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
