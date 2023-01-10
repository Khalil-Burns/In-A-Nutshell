'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');

const { 
    addQuestion, 
    addAnswer, 
    getAllQuestions, 
    getAllQuestionsByTagAny,
    getQuestion, 
    like, 
    unlike, 
    dislike, 
    undislike, 
    likeAns, 
    unlikeAns, 
    dislikeAns, 
    undislikeAns 
} = require('./controllers/QuestionController');
const { 
    register, 
    signIn, 
    curUser, 
    logOut 
} = require('./controllers/UserController');
const { 
    getTags, 
    addTag
} = require('./controllers/TagController');

const { render } = require('ejs');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.set('view-engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res, next) => {
    if (req.query.filter) {
        var questions = await getAllQuestionsByTagAny(req, res, next);
    }
    else {
        var questions = await getAllQuestions(req, res, next);
    }
    const user = await curUser(req, res, next);
    const tags = await getTags(req, res, next);

    res.render(`${__dirname}/index.html`,  { data: { questions: questions, user: user.user, tags: tags }});
});
app.get('/question/:id', async (req, res, next) => {
    var data = await getQuestion(req, res, next);
    const user = await curUser(req, res, next);
    const tags = await getTags(req, res, next);

    if (data[0]) {
        res.render(`${__dirname}/question.html`,  { data: { question: data[1], user: user.user, tags: tags }});
    }
    else {
        res.send('Question not found!');
    }
});
app.get('/about', async (req, res, next) => {
    res.render(`${__dirname}/about.html`);
})

app.post('/like/:id', async (req, res, next) => {
    await like(req, res, next);
    res.send('complete like');
});
app.post('/unlike/:id', async (req, res, next) => {
    await unlike(req, res, next);
    res.send('complete unlike');
});
app.post('/dislike/:id', async (req, res, next) => {
    await dislike(req, res, next);
    res.send('complete dislike');
});
app.post('/undislike/:id', async (req, res, next) => {
    await undislike(req, res, next);
    res.send('complete undislike');
});

app.post('/likeAns/:id', async (req, res, next) => {
    await likeAns(req, res, next);
    res.send('complete like');
});
app.post('/unlikeAns/:id', async (req, res, next) => {
    await unlikeAns(req, res, next);
    res.send('complete unlike');
});
app.post('/dislikeAns/:id', async (req, res, next) => {
    await dislikeAns(req, res, next);
    res.send('complete dislike');
});
app.post('/undislikeAns/:id', async (req, res, next) => {
    await undislikeAns(req, res, next);
    res.send('complete undislike');
});


app.post('/signup', async(req, res, next) => {
    const data = await register(req, res, next);
    res.send( { error: data.error, user: data.user } );
});
app.post('/signin', async(req, res, next) => {
    const data = await signIn(req, res, next);
    res.send( { error: data.error, user: data.user } );
});
app.post('/logout', async(req, res, next) => {
    const data = await logOut(req, res, next);
    res.send( { error: data.error } );
});

app.post('/ask', async(req, res, next) => {
    addQuestion(req, res, next);
    res.send('success');
});
app.post('/answer', async(req, res, next) => {
    addAnswer(req, res, next);
    res.send('success')
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));