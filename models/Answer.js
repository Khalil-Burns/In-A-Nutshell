class Answer {
    constructor(id, likes, dislikes, wordCnt, title, answer, usersLiked) {
        this.id = id;
        this.likes = likes;
        this.dislikes = dislikes;
        this.wordCnt = wordCnt;
        this.title = title;
        this.answer = answer;
        this.usersLiked = usersLiked;
    }
}

module.exports = Answer;