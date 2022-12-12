'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');

//const userRoutes = require('./routes/question-routes');
const { addQuestion, getAllQuestions, getQuestion } = require('./controllers/QuestionController');
const { signInWithGoogle, register, signIn, curUser } = require('./controllers/UserController');
const { render } = require('ejs');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.set('view-engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

//app.use('/api', userRoutes.routes);

app.get('/', async (req, res, next) => {
    var questions = await getAllQuestions(req, res, next);
    const user = await curUser(req, res, next);
    
    res.render(`${__dirname}/index.html`,  { questions: questions, user: user });
});
app.get('/question/:id', async (req, res, next) => {
    //console.log(req.params.id);
    var data = await getQuestion(req, res, next);
    const user = await curUser(req, res, next);
    
    if (data[0]) {
        res.render(`${__dirname}/question.html`,  { data: data[1], user: user });
    }
    else {
        res.send('Question not found!');
    }
});
app.get('/signup', async(req, res, next) => {
    const user = await curUser(req, res, next);
    res.render(`${__dirname}/test.html`, { data: '' });
});
app.post('/signup', async(req, res, next) => {
    req.body = { email: 'khalilburns@gmail.com', password: '123456' };
    //await signInWithGoogle(req, res, next);
    const data = await signIn(req, res, next);
    res.render(`${__dirname}/test.html`, { data: data});
});

app.post('/', async (req, res, next) => {
    addQuestion(req, res, next);
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));