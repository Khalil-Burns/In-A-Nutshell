/*
 *  Authors: Khalil Burns and Matthew Lim
 *  
 *  File Description: server and firebase database config variables
 */

'use strict';

const dotenv = require('dotenv') //used to get the stuff from .env
const assert = require('assert')

dotenv.config();

const {
    PORT, 
    HOST, 
    HOST_URL, 
    API_KEY, 
    AUTH_DOMAIN, 
    PROJECT_ID, 
    STORAGE_BUCKET, 
    MESSAGING_SENDER_ID,
    APP_ID
} = process.env; //creates and sets these variables to the stuff we made in .env

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
    }
}    
