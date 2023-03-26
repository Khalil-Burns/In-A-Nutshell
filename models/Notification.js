/*
 *  Authors: Khalil Burns and Matthew Lim
 *  
 *  File Description: Notification class (see constructor for details)
 *
 */

class Notification {
    constructor(id, img, text, timeCreated) {
        this.id = id;
        this.img = img;
        this.text = text;
        this.timeCreated = timeCreated;
    }
}

module.exports = Notification;
