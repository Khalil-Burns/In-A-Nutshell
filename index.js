/*
 *  Authors: Khalil Burns and Matthew Lim
 *  
 *  File Description: "main" file, controls all requests to the server
 *  
 *  Method Descriptions are shown as comments above each method (get and post)
 */
'use strict'; //helps debugging, doesn't allow creating variables on the fly

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
} = require('./controllers/QuestionController'); //"import" all question functions
const { 
    register, 
    signIn, 
    curUser, 
    logOut 
} = require('./controllers/UserController'); //"import" all user functions
const { 
    getTags, 
    addTag
} = require('./controllers/TagController'); //"import" all tag functions

const { render } = require('ejs');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.set('view-engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

//homepage
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

//question page
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

//about page
app.get('/about', async (req, res, next) => {
    res.render(`${__dirname}/about.html`);
});



//like a question (does not display a webpage)
app.get('/like', async (req, res, next) => {
    await like(req, res, next);
    res.send('complete like');
});

//unlike a question (does not display a webpage)
app.get('/unlike', async (req, res, next) => {
    await unlike(req, res, next);
    res.send('complete unlike');
});

//dislike a question (does not display a webpage)
app.get('/dislike', async (req, res, next) => {
    await dislike(req, res, next);
    res.send('complete dislike');
});

//undislike a question (does not display a webpage)
app.get('/undislike', async (req, res, next) => {
    await undislike(req, res, next);
    res.send('complete undislike');
});



//like a answer (does not display a webpage)
app.get('/likeAns', async (req, res, next) => {
    await likeAns(req, res, next);
    res.send('complete like');
});

//unlike a answer (does not display a webpage)
app.get('/unlikeAns', async (req, res, next) => {
    await unlikeAns(req, res, next);
    res.send('complete unlike');
});

//dislike a answer (does not display a webpage)
app.get('/dislikeAns', async (req, res, next) => {
    await dislikeAns(req, res, next);
    res.send('complete dislike');
});

//undislike a answer (does not display a webpage)
app.get('/undislikeAns', async (req, res, next) => {
    await undislikeAns(req, res, next);
    res.send('complete undislike');
});



//signup (does not display a webpage)
app.post('/signup', async(req, res, next) => {
    const data = await register(req, res, next);
    res.send( { error: data.error, user: data.user } );
});

//signin (does not display a webpage)
app.post('/signin', async(req, res, next) => {
    const data = await signIn(req, res, next);
    res.send( { error: data.error, user: data.user } );
});

//logout (does not display a webpage)
app.post('/logout', async(req, res, next) => {
    const data = await logOut(req, res, next);
    res.send( { error: data.error } );
});

//ask a question (does not display a webpage)
app.post('/ask', async(req, res, next) => {
    addQuestion(req, res, next);
    res.send('success');
});

//answer a question (does not display a webpage)
app.post('/answer', async(req, res, next) => {
    addAnswer(req, res, next);
    res.send('success')
});

// set up server
app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
