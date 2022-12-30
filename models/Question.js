class Question {
    constructor(id, likes, dislikes, wordCnt, question, tags, text, usersLiked, answers) {
        this.id = id;
        this.likes = likes;
        this.dislikes = dislikes;
        this.wordCnt = wordCnt;
        this.question = question;
        this.tags = tags;
        this.text = text;
        this.usersLiked = usersLiked;
        this.answers = answers;
    }
}

module.exports = Question;