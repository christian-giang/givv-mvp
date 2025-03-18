const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const EBAY_ACCESS_TOKEN = 'v^1.1#i^1#r^0#p^1#f^0#I^3#t^H4sIAAAAAAAAAOVYa2wURRzvtdfy1ohEKhhz3UJU6u7t7u317lbuwl0fttoXXjlbBMnc7my77d7uuTPb9lBj7YfGGJ4JRZAvNUYxJBpSIWgikGCCBBQNhGDANJqgQmJCIioPjTi3V8q1Eij0Epu4XzYz83/+5v+YGba3aMaS/pr+y3Mc0/IHe9nefIeDm8XOKCosu68gf0FhHptF4BjsXdTr7Cs4vxSBhJYUn4MoaegIunoSmo5EezJIWaYuGgCpSNRBAiIRS2I0XF8n8gwrJk0DG5KhUa7ayiAls15JAJKfU4BXVmSOzOo3ZDYbQcrPc4BnZeALyDLgPQJZR8iCtTrCQMdBimd5L816aM7fzLIix4t8gGE530rKFYMmUg2dkDAsFbLNFW1eM8vW25sKEIImJkKoUG24OtoYrq2samhe6s6SFRrBIYoBttDYUYUhQ1cMaBa8vRpkU4tRS5IgQpQ7lNEwVqgYvmHMPZhvQ817OW9c5n0+nuV4v8eXEyirDTMB8O3tSM+oMq3YpCLUsYpTd0KUoBHvgBIeGTUQEbWVrvRvuQU0VVGhGaSqIuHWcFMTFapoN1WEVUC3qV1dGCJMRyMtdMAvCZLfJym0rPDQ71f8I4oy0kZgHqepwtBlNQ0acjUYOAKJ1XA8NmwWNoSoUW80wwpOW5RNx49iyK9Mb2pmFy3crqf3FSYIEC57eOcdGOXG2FTjFoajEsYv2BAFKZBMqjI1ftGOxZHw6UFBqh3jpOh2d3d3M90exjDb3DzLcu6W+rqo1A4TgCK06VzP0Kt3ZqBV2xUJEk6kijiVJLb0kFglBuhtVEgQOE7wjuA+1qzQ+Nl/TWT57B6bEbnKEI/Xx0q8xJV7/ZJXjntykSGhkSB1p+2AcZCiE8DshDipAQnSEokzKwFNVRY9XoX3+BVIy+UBhRYCikLHvXI5zSkQshDG41LA/39KlImGehRKJsQ5ifWcxXmSBZLVGhA61oJIrCIu1FjVVUJ7rKq+bm2q4dm68la5BXgiXIOPQ8GJZsMtna/QVIJMM9GfCwDSuZ47EGoMhKE8KfeikpGETYamSqmptcEeU24CJk5FrBQZR6Gmkd+kXA0nk7W5qdg5c/Iui8W9+Z27TvUfdalbeoXSgTu1vErzIyIAJFWG9KF0rqcYyUi4DUAOIenpNbbVrnGEtyRyx60U02aRmCCWyOQcOGEmlRRzhrQ0eeIsmYZJnJg4C7lkyJaE70mR3ZkZgqba1o7RXensmQwocUvrnDiLDIE2qRBVyVVjSgUo8TTjsipn7giM7TeDuiTGhMiwTHI9YhrTR+ZmoxPq5ACCTUPToBnjJl16EwkLg7gGp1oNzkEtUkmuO65MsRMS5xN43lvuEwKT8k2yzz9rploHyXXnvIubkHvsu0woz/64PsdRts9xON/hYCtZmitjnygqWOEsmE0hUnsYBHQ5bvQwKlAYUvZ0gC0TMp0wlQSqmf9g3rGX8p7snVnj3v3mqr6y5o5U3vSs56HB1Wzx6APRjAJuVtZrEfvIzZVC7v75c3gv6+H8BEyeD6xkS2+uOrmHnPO2f1+za8P+U4wZPrbu8U+jDcIDV1vZOaNEDkdhHonlvNeuLy5a8dSBb7b8OPDX1qfP7XQuOlrj2NLPo4vXDnWUbProRPfPA+30Y/XD+9cHW8rkD5PMzO5XmYMly95b0rXqxCF17pDz8PvVb7we/OrM2eZz6/b1w3X7zwUdkfVz3aV/Hjwz+Hxij3BmycbuV44Xv/3w7p5lOxZ8PNTV13iRf3de6o9vIytOD/TNni/5+C+Xxz/ftvUks6Uktu3qJ7tmvtxyfPUFbsi4tNdXWr73wuWFXxyh9OGvnb/v3cyXvPjBwnfWD3fUCbRnx3dXS2uGHuXbis9uuubSf512dlrVlVk/OD6LHRiOX3/hl9+MgZ59ziN/735r++k9O4uPMPrizRXnYydP/cRsOHHpmemZPf0HVHWA27gTAAA='; // Replace with your actual eBay access token

app.use(cors()); // Enable CORS for all routes

app.use('/api', (req, res, next) => {
  console.log('Manually adding Authorization header:', `Bearer ${EBAY_ACCESS_TOKEN}`);
  req.headers['Authorization'] = `Bearer ${EBAY_ACCESS_TOKEN}`;
  req.headers['Content-Type'] = 'application/json'; // Ensure correct content type
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type'); // Allow specific headers
  next();
}, createProxyMiddleware({
  target: 'https://api.sandbox.ebay.com',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  logLevel: 'debug', // Log all requests and responses for debugging
  onProxyReq: (proxyReq, req, res) => {
    console.log('Outgoing Headers:', proxyReq.getHeaders());
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('Received Response Status:', proxyRes.statusCode);
    let body = '';
    
    proxyRes.on('data', chunk => {
      body += chunk;
    });

    proxyRes.on('end', () => {
      console.log('Response Body:', body);
    });
  }
}));

app.listen(3001, () => {
  console.log('Proxy server is running on http://localhost:3001');
});
