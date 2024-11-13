const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();

// Use compression to optimize delivery of static assets
app.use(compression());

// Serve static files from the Angular app's `dist` directory
app.use(express.static(path.join(__dirname, 'dist', 'edon-ng')));

// Handle all other routes by serving the index.html file
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'edon-ng', 'index.html'));
});

// Start the app by listening on the default Heroku port or 4200
app.listen(process.env.PORT || 4200, () => {
    console.log('Server is running...');
});
