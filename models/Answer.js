/*
 *  Authors: Khalil Burns and Matthew Lim
 *  
 *  File Description: Answer class (see constructor)
 *
 */

class Answer {
    constructor(id, user, likes, dislikes, wordCnt, title, answer, usersLiked, timeCreated) {
        this.id = id;
        this.user = user;
        this.likes = likes;
        this.dislikes = dislikes;
        this.wordCnt = wordCnt;
        this.title = title;
        this.answer = answer;
        this.usersLiked = usersLiked;
        this.timeCreated = timeCreated;
    }
}

module.exports = Answer;
