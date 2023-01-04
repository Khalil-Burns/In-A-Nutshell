const firebase = require('../db');
const firestore = firebase.firestore();
const FieldValue = require('firebase-admin').firestore.FieldValue;

const Tag = require('../models/Tag');

const getTags = async (req, res, next) => {
    try {
        const tagsArray = await firestore.collection('tags').doc('tagsArray').get();
        return(tagsArray.data().Tags);
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
};
const addTag = async (req, res, next) => {
    try {
        const tag = req.body.tag;
        await firestore.collection('tags').doc('tagsArray').update('Tags', FieldValue.arrayUnion(tag));
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
};

module.exports = {
    getTags,
    addTag
}