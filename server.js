const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();

const port = process.env.PORT || 4200;
const distFolder = path.join(__dirname, 'dist', 'edon-ng');
const indexFile = path.join(distFolder, 'index.html');

app.use(compression());
app.use(express.static(distFolder));

app.get('/*', (req, res) => {
  res.sendFile(indexFile, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
