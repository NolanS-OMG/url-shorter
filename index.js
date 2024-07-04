const express = require("express");

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const config = require("./config.js");

const mongoose = require("mongoose");

const initializeServer = () => {
  console.log("Connected to database!");

  app.set("port", config.port);
  const PORT = app.get('port');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json()); // Permite el uso de JSON

  app.use(express.static(path.join(__dirname, 'client'))); // Permite el uso de archivos estáticos

  const apiRoutes = require("./routes/api.js");
  app.use('/api', apiRoutes);

  const redirectRoutes = require("./routes/redirect.js");
  app.use('/', redirectRoutes);

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log('Server running on port', PORT);
  });
}

mongoose.connect(config.db_uri).then(initializeServer).catch(error => console.log(error));
