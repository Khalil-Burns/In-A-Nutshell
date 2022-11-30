'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoutes = require('./routes/user-routes');
const {  } = require('./controllers/');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.set('view-engine', 'html');
app.engine('html', require('ejs').renderFile)
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRoutes.routes);

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));