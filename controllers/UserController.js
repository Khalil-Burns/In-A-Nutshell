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
      jsonConcat(output, { user: auth.currentUser });
      const user = await firestore.doc(`users/${auth.currentUser.uid}`).get();//.set({ secureNote });
    }
    else {
      //output = { user: 'null'};
    }
  } catch (err) {
    var { code } = err;
    code = code.replace('auth/', '');
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
    
    jsonConcat(output, { user: credential.user });
  } catch (err) {
    var { code } = err;
    code = code.replace('auth/', '');
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
    const user = await firestore.doc(`users/${credential.user.uid}`).get();//.set({ secureNote });

    jsonConcat(output, { user: credential.user });
  } catch (err) {
    var { code } = err;
    code = code.replace('auth/', '');
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