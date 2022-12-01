var admin = require("firebase-admin");

var serviceAccount = require("./in-a-nutshell-94648-firebase-adminsdk-87bv0-cc2a2a41b3.json");

const db = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = db;