const firebase = require('../db');
const Question = require('../models/Question');
const firestore = firebase.firestore();
const { 
  GoogleAuthProvider, 
  getAuth, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getRedirectResult
} = require("firebase/auth");
const {
  getAuth: getAdminAuth,
} = require('firebase-admin/auth');

const signInWithGoogle = async (req, res, next) => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await signInWithPopup(auth, provider);
  }
  catch (err) {
    console.log(err);
  }
   /*.then((result) => {
     // This gives you a Google Access Token. You can use it to access the Google API.
     const credential = GoogleAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;
     // The signed-in user info.
     const user = result.user;
     // ...
   }).catch((error) => {
     // Handle Errors here.
     const errorCode = error.code;
     const errorMessage = error.message;
     // The email of the user's account used.
     const email = error.customData.email;
     // The AuthCredential type that was used.
     const credential = GoogleAuthProvider.credentialFromError(error);
     // ...
   });*/
  }

  async function register(req, res) {
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
      await firestore.doc(`users/${credential.user.uid}`);//.set({ secureNote });
      jsonConcat(output, { token });
    } catch (err) {
      var { code } = err;
      code = code.replace('auth/', '');
      jsonConcat(output, { 'error': code });
    }

    console.log(output);
    return(output);
  }
  async function signIn(req, res) {
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
      await firestore.doc(`users/${credential.user.uid}`);//.set({ secureNote });
      jsonConcat(output, { token });
    } catch (err) {
      var { code } = err;
      code = code.replace('auth/', '');
      jsonConcat(output, { 'error': code });
    }

    console.log(output);
    return(output);
  }

  //help function
  function jsonConcat(o1, o2) {
    for (var key in o2) {
     o1[key] = o2[key];
    }
    return o1;
   }

module.exports = {
    signInWithGoogle,
    register
}