const express = require('express');
const app = express();
const port = 3002;

// Sample route for account management
app.get('/accounts', (req, res) => {
  res.json({ message: 'List of accounts' });
});

app.listen(port, () => {
  console.log(`Account Management Service running on http://localhost:${port}`);
});
