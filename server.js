const express = require('express');
const logger = require('./logger'); // Importiere den Logger
const app = express();
const port = 5001;

// Middleware für Logging
app.use((req, res, next) => {
  logger.info({ message: 'Request received', method: req.method, url: req.url });
  next();
});

// Endpunkte
app.get('/hello', (req, res) => {
  res.status(200).send('Hello, World!');
  logger.info('Hello endpoint was called');
});

app.get('/error', (req, res) => {
  res.status(404).send('Not Found');
  logger.warn('Error endpoint was called');
});

// Server starten
app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
