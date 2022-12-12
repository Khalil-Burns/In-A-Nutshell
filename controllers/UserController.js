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
        output = { user: auth.currentUser };
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
      console.log(err);
    }

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
    register,
    signIn,
    curUser
}