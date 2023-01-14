/*
 *  Authors: Khalil Burns and Matthew Lim
 *  
 *  File Description: read and write for notifications
 *  
 *  Method Descriptions:
 *      createNotification(id, text, img): add a notification to the user's notification collection
 *          id: id of the user
 *          text: display text for the notification
 *          img: img source for icon display
 *      getAllNotifications(id): get all of the notifications from a specific user's notification collection
 *          id: id of the user
 */

const firebase = require('../db');
const firestore = firebase.firestore();

const Notification = require('../models/Notification');

const createNotification = async (id, text, img) => {
    try {
        const userID = id;
        const data = {
            'img': img,
            'text': text,
            'timeCreated': Date.now()
        };
        await firestore.collection('users').doc(userID).collection('notifications').add(data);
        //res.send('Record saved successfully');
    }
    catch (error) {
        console.log(error.message);
        //res.status(400).send(error.message);
    }
}

const getAllNotifications = async (id) => {
    try {
        var answers = await firestore.collection('users').doc(id).collection('notifications').orderBy("timeCreated", "desc");
        var data = await answers.get();

        var notificationsArray = [];

        if (data.empty) {
            return;
        }
        data.forEach(doc => {
            const notification = new Notification(
                doc.id,
                doc.data().img,
                doc.data().text,
                doc.data().timeCreated
            );
            //console.log(doc.collection('answers').get());
            notificationsArray.push(notification);
        });
        return(notificationsArray);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    createNotification,
    getAllNotifications
}
