const firebase = require('../db');
const firestore = firebase.firestore();
const FieldValue = require('firebase-admin').firestore.FieldValue;

const Question = require('../models/Question');
const Answer = require('../models/Answer');

const addQuestion = async (req, res, next) => {
    try {
        const id = req.body.user.userID;
        const data = {
            'likes': 1,
            'dislikes': 0,
            'wordCnt': req.body.wordCnt,
            'question': req.body.question,
            'tags': '',
            'text': req.body.text,
            'user': req.body.user,
            'usersLiked': {
                [id]: 1
            }
        };
        const doc = await firestore.collection('questions').add(data);
        //await firestore.collection('questions').doc(doc.id).collection('answers').doc().set({});
        //res.send('Record saved successfully');
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
};
const addAnswer = async (req, res, next) => {
    try {
        const id = req.body.questionID;
        const answerData = {
            'likes': 1,
            'dislikes': 0,
            'wordCnt': req.body.wordCnt,
            'user': req.body.user,
            'title': req.body.title,
            'answer': req.body.answer,
            'usersLiked': {
                [req.body.user.userID]: 1
            }
        };
        //await firestore.collection('questions').doc(req.body.questionID).update("answers", FieldValue.arrayUnion(answerData));
        await firestore.collection('questions').doc(req.body.questionID).collection('answers').add(answerData);
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
                doc.data().text,
                doc.data().usersLiked
            );
            //console.log(doc.collection('answers').get());
            questionsArray.push(question);
        });
        return(questionsArray);
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
};
const getAllAnswers = async (data) => {
    try {
        const answersArray = [];
        if (data.empty) {
            //res.status(404).send('No user record found');
            return([]);
        }
        data.forEach(doc => {
            const answer = new Answer(
                doc.id,
                doc.data().likes,
                doc.data().dislikes,
                doc.data().wordCnt,
                doc.data().title,
                doc.data().answer,
                doc.data().usersLiked
            );
            //console.log(doc.collection('answers').get());
            answersArray.push(answer);
        });
        return(answersArray);
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
        const question = firestore.collection('questions').doc(id)
        const data = await question.get();
        const dataAns = await question.collection('answers').get();
        if(data.exists) {
            const question = new Question(
                data.id,
                data.data().likes,
                data.data().dislikes,
                data.data().wordCnt,
                data.data().question,
                data.data().tags,
                data.data().text,
                data.data().usersLiked,
                await getAllAnswers(dataAns)
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
        // console.log('begin like');
        // const id = req.params.id;
        // const question = firestore.collection('questions').doc(id);

        // const data = (await question.get()).data();

        // data.usersLiked[`${req.body.userID}`] = 1;
        // data.likes = data.likes + 1;
        // data.dislikes = data.dislikes - req.body.amount;

        // await question.update(data);
        // console.log('end like');
        const id = req.params.id;

        await firestore.collection('questions').doc(id).update("likes", FieldValue.increment(1));
        await firestore.collection('questions').doc(id).update("dislikes", FieldValue.increment(-req.body.amount));
        await firestore.collection('questions').doc(id).update(`usersLiked.${req.body.userID}`, 1);
    }
    catch (error) {
        return(error);
    }
}
const unlike = async (req, res, next) => {
    try {
        // console.log('begin unlike');
        // const id = req.params.id;
        // const question = firestore.collection('questions').doc(id);

        // const data = (await question.get()).data();
        // //data.usersLiked[`${req.body.userID}`] = true;
        // delete data.usersLiked[`${req.body.userID}`];
        // data.likes = data.likes - 1;

        // await question.update(data);
        // console.log('end unlike');

        // console.log('begin unlike');
        // const id = req.params.id;
        // const question = firestore.collection('questions').doc(id);

        // const data = (await question.get()).data();
        // //data.usersLiked[`${req.body.userID}`] = true;
        // delete data.usersLiked[`${req.body.userID}`];
        // data.likes = data.likes - 1;

        // await question.update(data);
        // console.log('end unlike');

        const id = req.params.id;

        await firestore.collection('questions').doc(id).update("likes", FieldValue.increment(-1));
        await firestore.collection('questions').doc(id).update(`usersLiked.${req.body.userID}`, 0);
    }
    catch (error) {
        return(error);
    }
}
const dislike = async (req, res, next) => {
    try {
        // console.log('begin dislike');
        // const id = req.params.id;
        // const question = firestore.collection('questions').doc(id);

        // const data = (await question.get()).data();

        // data.usersDisliked[`${req.body.userID}`] = true;
        // data.dislikes = data.dislikes + 1;

        // await question.update(data);
        // console.log('end dislike');
        const id = req.params.id;

        await firestore.collection('questions').doc(id).update("dislikes", FieldValue.increment(1));
        await firestore.collection('questions').doc(id).update("likes", FieldValue.increment(-req.body.amount));
        await firestore.collection('questions').doc(id).update(`usersLiked.${req.body.userID}`, 2);
    }
    catch (error) {
        console.log(error);
        return(error);
    }
}
const undislike = async (req, res, next) => {
    try {
        // console.log('begin undislike');
        // const id = req.params.id;
        // const question = firestore.collection('questions').doc(id);

        // const data = (await question.get()).data();

        // //data.usersDisliked[`${req.body.userID}`] = true;
        // delete data.usersLiked[`${req.body.userID}`];
        // data.dislikes = data.dislikes - 1;

        // await question.update(data);
        // console.log('end undislike');
        const id = req.params.id;

        await firestore.collection('questions').doc(id).update("dislikes", FieldValue.increment(-1));
        await firestore.collection('questions').doc(id).update(`usersLiked.${req.body.userID}`, 0);
    }
    catch (error) {
        return(error);
    }
}

const likeAns = async (req, res, next) => {
    try {
        const id = req.params.id;

        await firestore.collection('questions').doc(id).collection('answers').doc(req.body.ansID).update(`likes`, FieldValue.increment(1));
        await firestore.collection('questions').doc(id).collection('answers').doc(req.body.ansID).update(`dislikes`, FieldValue.increment(-req.body.amount));
        await firestore.collection('questions').doc(id).collection('answers').doc(req.body.ansID).update(`usersLiked.${req.body.userID}`, 1);
    }
    catch (error) {
        return(error);
    }
}
const unlikeAns = async (req, res, next) => {
    try {
        const id = req.params.id;

        await firestore.collection('questions').doc(id).collection('answers').doc(req.body.ansID).update(`likes`, FieldValue.increment(-1));
        await firestore.collection('questions').doc(id).collection('answers').doc(req.body.ansID).update(`usersLiked.${req.body.userID}`, 0);
    }
    catch (error) {
        return(error);
    }
}
const dislikeAns = async (req, res, next) => {
    try {
        const id = req.params.id;

        await firestore.collection('questions').doc(id).collection('answers').doc(req.body.ansID).update(`dislikes`, FieldValue.increment(1));
        await firestore.collection('questions').doc(id).collection('answers').doc(req.body.ansID).update(`likes`, FieldValue.increment(-req.body.amount));
        await firestore.collection('questions').doc(id).collection('answers').doc(req.body.ansID).update(`usersLiked.${req.body.userID}`, 2);
    }
    catch (error) {
        console.log(error);
        return(error);
    }
}
const undislikeAns = async (req, res, next) => {
    try {
        const id = req.params.id;

        await firestore.collection('questions').doc(id).collection('answers').doc(req.body.ansID).update(`dislikes`, FieldValue.increment(-1));
        await firestore.collection('questions').doc(id).collection('answers').doc(req.body.ansID).update(`usersLiked.${req.body.userID}`, 0);
    }
    catch (error) {
        return(error);
    }
}

//helper function
function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

module.exports = {
    addQuestion,
    addAnswer,
    getAllQuestions,
    getQuestion,
    like,
    unlike,
    dislike,
    undislike,
    likeAns,
    unlikeAns,
    dislikeAns,
    undislikeAns
}