const express = require('express');
const app = express();
const port = 3002;
require("../SharedServices/Environments/loadEnvironment")();
const cors = require('cors');

app.use(cors());
// Sample route for account management
app.get('/accounts', (req, res) => {
  res.json({ message: 'List of accounts' });
});

app.listen(process.env.ACCOUNT_MICROSERVICE_PORT, () => {
  console.log(`Account Management Service running on http://localhost:${process.env.ACCOUNT_MICROSERVICE_PORT}`);
});
