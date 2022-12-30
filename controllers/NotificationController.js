const firebase = require('../db');
const firestore = firebase.firestore();

const Notification = require('../models/Notification');

// const createNotification = async (req, res, next) => {
//     try {
//         const userId = req.body.user.userID;
//         const data = {
//             'likes': 1,
//             'dislikes': 0,
//             'wordCnt': req.body.wordCnt,
//             'question': req.body.question,
//             'tags': '',
//             'text': req.body.text,
//             'user': req.body.user,
//             'usersLiked': {
//                 [id]: true
//             },
//             'usersDisliked': {}
//         };
//         await firestore.collection('notifications').doc().set(data);
//         //res.send('Record saved successfully');
//     }
//     catch (error) {
//         console.log(error.message);
//         //res.status(400).send(error.message);
//     }
// }