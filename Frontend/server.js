// server.js (Express server to serve all microapps from a single port)
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve base application
app.use('/', express.static(path.join(__dirname, 'Applications/base-application/build')));

// Serve microapps under their paths
app.use('/login-app', express.static(path.join(__dirname, 'Applications/MicroApplications/login-microapp/build')));
app.use('/preLogin-app', express.static(path.join(__dirname, 'Applications/MicroApplications/preLogin-microapp/build')));
app.use('/account-app', express.static(path.join(__dirname, 'Applications/MicroApplications/account-microapp/build')));

// Fallback to base app for client-side routing
app.get('*', (req, res) => {
  console.log(`Serving base application for path: ${req.path}`);
  res.sendFile(path.join(__dirname, 'Applications/base-application/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ All microapps running at http://localhost:${PORT}`);
});