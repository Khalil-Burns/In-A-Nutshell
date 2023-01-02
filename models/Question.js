class Question {
    constructor(id, user, likes, dislikes, wordCnt, question, tags, text, usersLiked, answers, timeCreated) {
        this.id = id;
        this.user = user;
        this.likes = likes;
        this.dislikes = dislikes;
        this.wordCnt = wordCnt;
        this.question = question;
        this.tags = tags;
        this.text = text;
        this.usersLiked = usersLiked;
        this.answers = answers;
        this.timeCreated = timeCreated;
    }
}

module.exports = Question;