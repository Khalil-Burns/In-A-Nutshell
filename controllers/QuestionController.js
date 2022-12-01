const firebase = require('../db');
const Question = require('../models/Question');
const firestore = firebase.firestore();

const addQuestion = async (req, res, next) => {
    try {
        const data = {
            'likes': 0,
            'dislikes': 0,
            'wordCnt': req.body.wordCnt,
            'text': req.body.text
        };
        await firestore.collection('questions').doc().set(data);
        //res.send('Record saved successfully');
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
};

const getAllQuestions = async (req, res, next) => {
    try {
        const questions = await firestore.collection('questions');
        const data = await questions.get();
        const questionsArray = [];
        if (data.empty) {
            //res.status(404).send('No user record found');
            return;
        }
        data.forEach(doc => {
            const question = new Question(
                doc.data().likes,
                doc.data().dislikes,
                doc.data().wordCnt,
                doc.data().text
            );
            questionsArray.push(question);
        });
        return(questionsArray);
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
};

module.exports = {
    addQuestion,
    getAllQuestions
}