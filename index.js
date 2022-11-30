'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');

const _dir = 'C:/Users/khali/OneDrive/Documents/In-A-Nutshell/In-A-Nutshell';
//const userRoutes = require('./routes/question-routes');
//const {  } = require('./controllers/QuestionController');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.set('view-engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(_dir, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

//app.use('/api', userRoutes.routes);

app.get('/', function (req, res, next) {
    res.sendFile('C:/Users/khali/OneDrive/Documents/In-A-Nutshell/In-A-Nutshell/index.html');
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));