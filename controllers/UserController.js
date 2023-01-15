/*
 *  Authors: Khalil Burns and Matthew Lim
 *  
 *  File Description: controls the sign in state of a user
 *  
 *  Method Descriptions:
 *
 *      curUser(req, res, next): get the current user (if there is one)
 *          req: request (all the request data)
 *          res: result (not used)
 *          next: next (not used)
 *      return: JSON object
 *
 *      register(req, res, next): register new user (if it doesn't already exist), then sign in
 *          req: request (all the request data)
 *          res: result (not used)
 *          next: next (not used)
 *      return: JSON object
 *
 *      signIn(req, res, next): sign in user (if it exists), then sign in
 *          req: request (all the request data)
 *          res: result (not used)
 *          next: next (not used)
 *      return: JSON object
 *
 *      logOut(req, res, next): log out current user
 *          req: request (all the request data)
 *          res: result (not used)
 *          next: next (not used)
 *      return: JSON object
 *
 *      jsonConcat(o1, o2): concats two JSON objects
 *          o1: first JSON object
 *          o2: second JSON object
 *      return: JSON object
 */

const firebase = require('../db');
const Question = require('../models/Question');
const firestore = firebase.firestore();
const {  
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} = require("firebase/auth");
const {
  getAuth: getAdminAuth,
} = require('firebase-admin/auth');
const { 
  createNotification, 
  getAllNotifications,
} = require('./NotificationController');

async function curUser(req, res, next) {
  var output = {};
  const { email, password } = req.body;

  try {
    const auth = getAuth();
    if (auth.currentUser) {
      const adminAuth = getAdminAuth();
      const token = await adminAuth.createCustomToken(
        auth.currentUser.uid
      );
      const userData = await firestore.collection('users').doc(auth.currentUser.uid).get();


      var array = await getAllNotifications(auth.currentUser.uid);

      jsonConcat(output, { user: {
        userID: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        notifications: array,
        displayName: userData.data().displayName
      }
    });
    }
    else {
      //output = { user: 'null'};
    }
  } catch (err) {
    var { code } = err;
    
    console.log(err);
    //code = code.replace('auth/', '');
    jsonConcat(output, { 'error': code });
  }
  return(output);
}

async function register(req, res, next) {
  var output = {};
  const { email, password } = req.body;

  try {
    const auth = getAuth();
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const adminAuth = getAdminAuth();
    const token = await adminAuth.createCustomToken(
      credential.user.uid
    );
    const user = await firestore.doc(`users/${credential.user.uid}`).get();//.set({ secureNote });

    await firestore.collection('users').doc(credential.user.uid).set({
      'displayName': req.body.username
    });

    jsonConcat(output, { user: {
        userID: credential.user.uid,
        userEmail: email,
        notifications: [],
        displayName: req.body.username
      }
    });
  } catch (err) {
    var { code } = err;
    console.log(`error: ${code}`);
    //code = code.replace('auth/', '');
    jsonConcat(output, { 'error': code });
  }
  return(output);
}


async function signIn(req, res, next) {
  var output = {};
  const { email, password } = req.body;

  try {
    const auth = getAuth();

    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const adminAuth = getAdminAuth();
    const token = await adminAuth.createCustomToken(
      credential.user.uid
    );

    const userData = await firestore.collection('users').doc(credential.user.uid).get();

    var array = await getAllNotifications(credential.user.uid);
    
    jsonConcat(output, { user: {
      userID: credential.user.uid,
      userEmail: email,
      notifications: array,
      username: userData.data().displayName
    }
  });
  } catch (err) {
    var { code } = err;
    //code = code.replace('auth/', '');
    jsonConcat(output, { 'error': code });
  }

  return(output);
}

async function logOut(req, res, next) {
  var output = {};
  const { email, password } = req.body;

  try {
    const auth = getAuth();
    signOut(auth);
  } catch (err) {
    var { code } = err;
    code = code.replace('auth/', '');
    jsonConcat(output, { 'error': code });
  }

  return(output);
}

//helper function
function jsonConcat(o1, o2) {
  for (var key in o2) {
    o1[key] = o2[key];
  }
  return o1;
}

module.exports = {
    register,
    signIn,
    curUser,
    logOut
}
