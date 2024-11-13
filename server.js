const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'dist', 'edon-ng')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'edon-ng', 'index.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
