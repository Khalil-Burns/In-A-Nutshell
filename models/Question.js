class Question {
    constructor(id, likes, dislikes, wordCnt, question, tags, text) {
        this.id = id;
        this.likes = likes;
        this.dislikes = dislikes;
        this.wordCnt = wordCnt;
        this.question = question;
        this.tags = tags;
        this.text = text;
    }
}

module.exports = Question;