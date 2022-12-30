var { firebaseConfig } = require("./config");
var admin = require("firebase-admin");
const { initializeApp } = require('firebase/app');

var serviceAccount = require("./in-a-nutshell-94648-firebase-adminsdk-87bv0-cc2a2a41b3.json");
//const { initializeApp: initializeAppAdmin } = require("firebase-admin");

const db = admin.initializeApp({
  credential: admin.credential.cert(
    serviceAccount
  )
});
const db2 = initializeApp(firebaseConfig);

module.exports = db;