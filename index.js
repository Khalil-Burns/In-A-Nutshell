'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');

const _dir = 'C:/Users/khali/OneDrive/Documents/In-A-Nutshell/In-A-Nutshell';
//const userRoutes = require('./routes/question-routes');
const { addQuestion, getAllQuestions, getQuestion } = require('./controllers/QuestionController');
const { render } = require('ejs');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.set('view-engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(_dir, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

//app.use('/api', userRoutes.routes);

app.get('/', async (req, res, next) => {
    var questions = await getAllQuestions(req, res, next);
    res.render('C:/Users/khali/OneDrive/Documents/In-A-Nutshell/In-A-Nutshell/index.html',  { questions: questions });
});
app.get('/question/:id', async (req, res, next) => {
    //console.log(req.params.id);
    var data = await getQuestion(req, res, next);
    console.log(data);
    if (data[0]) {
        res.render('C:/Users/khali/OneDrive/Documents/In-A-Nutshell/In-A-Nutshell/question.html',  { data: data[1] });
    }
    else {
        res.send('Question not found!');
    }
});

app.post('/', async (req, res, next) => {
    addQuestion(req, res, next);
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));

module.exports = {
    //addQuestion
};