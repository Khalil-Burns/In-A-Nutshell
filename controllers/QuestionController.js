const firebase = require('../db');
const Question = require('../models/Question');
const firestore = firebase.firestore();

const addQuestion = async (req, res, next) => {
    try {
        const data = {
            'likes': 0,
            'dislikes': 0,
            'wordCnt': req.body.wordCnt,
            'question': req.body.question,
            'tags': '',
            'text': req.body.text,
            'user': req.body.user
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
                doc.id,
                doc.data().likes,
                doc.data().dislikes,
                doc.data().wordCnt,
                doc.data().question,
                doc.data().tags,
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
const getQuestion = async (req, res, next) => {
    var output = [false, 'Question not found!'];
    try {
        const id = req.params.id;
        const data = await firestore.collection('questions').doc(id).get();
        if(data.exists) {
            const question = new Question(
                data.id,
                data.data().likes,
                data.data().dislikes,
                data.data().wordCnt,
                data.data().question,
                data.data().tags,
                data.data().text
            );
            output = [true, question];
        }
        
        //console.log(output);
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
    return(output);
};

const like = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await firestore.collection('users').where("email", "==", data.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().password == data.oldPassword) {
                        doc.ref.update(
                            {
                                'email': data.email,
                                'password': data.newPassword,
                                'username': data.newUsername
                            }
                        );
                        output = [true];
                    }
                    else {
                        output = [false, 'Incorrect Password'];
                    }
                });
            });
        
        return(output);
    }
    catch (error) {
        console.log(error);
        return([false, 'it don\'t work dude. Error: ', error]);
    }
}

module.exports = {
    addQuestion,
    getAllQuestions,
    getQuestion
}