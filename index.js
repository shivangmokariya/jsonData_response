const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Define a simple model
const Item = mongoose.model('Item', { name: String });

app.use(bodyParser.json());


const productsArray = [
  {
    "id": 1,
    "sku": "abc",
    "productName": "name 1",
    "category": 1
  },
  {
    "id": 2,
    "sku": "def",
    "productName": "name 2",
    "category": 2
  },
  {
    "id": 3,
    "sku": "ghi",
    "productName": "name 1",
    "category": 2
  },
  {
    "id": 4,
    "sku": "klm",
    "productName": "name 1",
    "category": 3
  },
  {
    "id": 5,
    "sku": "xyz",
    "productName": "name 1",
    "category": 1
  }
];

const pricingArray = [
  {
    "sku": "abc",
    "price": 10
  },
  {
    "sku": "def",
    "price": 20
  },
  {
    "sku": "ghi",
    "price": 30
  },
  {
    "sku": "klm",
    "price": 40
  },
  {
    "sku": "xyz",
    "price": 50
  }
];

const categoriesArray = [
  {
    "id": 1,
    "name": "category 1"
  },
  {
    "id": 2,
    "name": "category 2"
  },
  {
    "id": 3,
    "name": "category 3"
  },
  {
    "id": 4,
    "name": "category 4"
  },
  {
    "id": 5,
    "name": "category 5"
  }
];


app.get('/items', async (req, res) => {
  try {
    const resultArray = mergeArrays(productsArray, pricingArray, categoriesArray);
    console.log(resultArray);

    res.status(200).json(resultArray);
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function mergeArrays(products, pricing, categories) {
  const mergedArray = products.map(product => {
    const pricingInfo = pricing.find(item => item.sku === product.sku);
    const categoryInfo = categories.find(cat => cat.id === product.category);

    return {
      id: product.id,
      sku: product.sku,
      productName: product.productName,
      category: product.category,
      price: pricingInfo ? pricingInfo.price : null,
    };
  });

  return mergedArray;
}


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
