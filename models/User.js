/*
 *  Authors: Khalil Burns and Matthew Lim
 *  
 *  File Description: User class (see constructor for details)
 *
 */

class User {
    constructor(username, email, password, profilePicture) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
    }
}

module.exports = User;
