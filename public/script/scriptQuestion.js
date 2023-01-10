function generateAnswers() {
    var answers = document.getElementById("answers");
    answers.innerHTML = "";
    for (var idx = 0; idx < answersArray.length; idx++) {

        var answer = document.createElement('div');
        answer.setAttribute("class", "answer");
        answers.appendChild(answer);

        var table = document.createElement('table');
        table.style = "width: 100%;";
        answer.appendChild(table);

        var tableRow = document.createElement('tr');
        table.appendChild(tableRow);

        var tdButtons = document.createElement('td');
        tdButtons.style.width = "0%";
        tdButtons.style.height = "0%";
        tableRow.appendChild(tdButtons);

        var tdText = document.createElement('td');
        tdText.style.paddingLeft = "2%";
        tableRow.appendChild(tdText);

        if (isUser) {
            var bLike = document.createElement('button');
            bLike.setAttribute("class", "like");
            bLike.answerID = answersArray[idx].id;
            bLike.setAttribute("id", "likeAns-" + bLike.answerID);
            if (likesAns[answersArray[idx].id] == 1) {
                bLike.style.backgroundColor = "grey";
            }
            bLike.innerHTML = `<p>${answersArray[idx].likes}</p> ^`;
            tdButtons.appendChild(bLike);

            var bDislike = document.createElement('button');
            bDislike.setAttribute("class", "dislike");
            bDislike.answerID = answersArray[idx].id;
            bDislike.setAttribute("id", "dislikeAns-" + bDislike.answerID);
            if (likesAns[answersArray[idx].id] == 2) {
                bDislike.style.backgroundColor = "grey";
            }
            bDislike.innerHTML = `v <p>${answersArray[idx].dislikes}</p>`;
            tdButtons.appendChild(bDislike);

            bLike.onclick = function() {
                preLikeAns(this.answerID);
            }
            bDislike.onclick = function() {
                preDislikeAns(this.answerID);
            }
        }
        else {
            var bLike = document.createElement('p');
            bLike.setAttribute("class", "like");
            bLike.innerHTML = `${answersArray[idx].likes} ^`
            tdButtons.appendChild(bLike);

            var bDislike = document.createElement('p');
            bDislike.setAttribute("class", "dislike");
            bDislike.innerHTML = `${answersArray[idx].dislikes} v`
            tdButtons.appendChild(bDislike);
        }

        var wordCnt = document.createElement('p');
        wordCnt.setAttribute("class", "wordCnt");
        wordCnt.wordCnt = answersArray[idx].wordCnt;
        if (parseInt(answersArray[idx].wordCnt, 10) <= 100) {
            wordCnt.color = "green";
        }
        else {
            wordCnt.color = "red";
        }
        wordCnt.innerHTML = `<strong>Word Count: </strong><p style="color: ${wordCnt.color}; display: inline; font-size: large">${wordCnt.wordCnt}</p>`
        wordCnt.style = "float: right; font-size: medium;"
        tdText.appendChild(wordCnt);

        var text = document.createElement('div');
        text.setAttribute("class", "answerText");
        text.answerID = answersArray[idx].id;

        text.innerHTML = `<strong>${answersArray[idx].title}</strong><br>${answersArray[idx].answer}`;
        tdText.appendChild(text);

        var subText = document.createElement('p');
        subText.setAttribute("class", "subText");
        subText.user = {
            userID: answersArray[idx].user.userID,
            displayName: answersArray[idx].user.displayName
        }
        var d = new Date(parseInt(answersArray[idx].timeCreated, 10));
        subText.timeCreated = d.toString();
        subText.innerHTML = `Answered by <a href="/user/${subText.user.userID}">${subText.user.displayName}</a> on ${subText.timeCreated}`
        subText.style.fontSize = "small";
        subText.style.textAlign = "right";

        tdText.appendChild(subText);

        if (idx < answersArray.length - 1) {
            var hr = document.createElement('hr');
            answer.appendChild(hr);
        }
    }
}
function preLikeAns(id) {
    if (!(likesAns[id] == 1)) {
        var amount = 0;
        if (likesAns[id] == 2) {
            amount = 1;
        }
        likeAns(id, amount);
        likesAns[id] = 1;
    }
    else {
        unlikeAns(id);
        likesAns[id] = 0;
    }
}
function preDislikeAns(id) {
    if (likesAns[id] != 2) {
        var amount = 0;
        if (likesAns[id] == 1) {
            amount = 1;
        }
        dislikeAns(id, amount);
        likesAns[id] = 2;
    }
    else {
        undislikeAns(id);
        likesAns[id] = 0;
    }
}

function dropdownOnClick() {
  document.getElementById("userDropdown").classList.toggle("show");
}
function post() {
  var title = document.getElementById("title").value;

  if (!title) {

    submitAnswerPopup.style.display = "block";
    $("#answerPosted > p").text("You didn't type in a title!");
    return;
  }

  var answer = tinymce.get('answerField').getContent();
  document.getElementById("title").value = '';
  var wordCnt = tinymce.activeEditor.plugins.wordcount.getCount();
  tinymce.get('answerField').setContent('');

    submitAnswerPopup.style.display = "block";
    $("#AnswerPosted > p").text("Loading...");

  $.post("/answer",
  {
    title: title,
    answer: answer,
    wordCnt: wordCnt,
    user: {
      userID: userID,
      userEmail: userEmail,
      displayName: displayName
    },
    questionID: questionID,
    questionUser: questionUser, 
    questionTitle: questionTitle,
  }, function () {
    submitAnswerPopup.style.display = "block";
    $("#AnswerPosted > p").text("Answer posted!");
    location.reload();
  });

};

function likeAns(id, amount) {
    var like = document.getElementById(`likeAns-${id}`);
    var likes = like.getElementsByTagName('p')[0];
    console.log(parseInt(likes.innerHTML, 10));
    likes.innerHTML = parseInt(likes.innerHTML, 10) + 1;
    like.style = 'background-color: grey';
  
    var dislike = document.getElementById(`dislikeAns-${id}`);
    var dislikes = dislike.getElementsByTagName('p')[0];
    console.log(parseInt(dislikes.innerHTML, 10));
    dislikes.innerHTML = parseInt(dislikes.innerHTML, 10) - amount;
    dislike.style.removeProperty('background-color');
  
  
    $.post(`/likeAns/${questionID}`, 
    {
        userID: userID,
        ansID: id,
        amount: amount
    });
}
function unlikeAns(id) {
    var like = document.getElementById(`likeAns-${id}`);
    var likes = like.getElementsByTagName('p')[0];
    console.log(parseInt(likes.innerHTML, 10));
    likes.innerHTML = parseInt(likes.innerHTML, 10) - 1;
    like.style.removeProperty('background-color');
  
  
    $.post(`/unlikeAns/${questionID}`, 
    {
        userID: userID,
        ansID: id,
        amount: 0
    });
}
  
function dislikeAns(id, amount) {
    var dislike = document.getElementById(`dislikeAns-${id}`);
    var dislikes = dislike.getElementsByTagName('p')[0];
    console.log(parseInt(dislikes.innerHTML, 10));
    dislikes.innerHTML = parseInt(dislikes.innerHTML, 10) + 1;
    dislike.style = 'background-color: grey';
  
    var like = document.getElementById(`likeAns-${id}`);
    var likes = like.getElementsByTagName('p')[0];
    console.log(parseInt(likes.innerHTML, 10));
    likes.innerHTML = parseInt(likes.innerHTML, 10) - amount;
    like.style.removeProperty('background-color');
  
  
    $.post(`/dislikeAns/${questionID}`, 
    {
        userID: userID,
        ansID: id,
        amount: amount
    });
}
  function undislikeAns(id) {
    var dislike = document.getElementById(`dislikeAns-${id}`);
    var dislikes = dislike.getElementsByTagName('p')[0];
    console.log(parseInt(dislikes.innerHTML, 10));
    dislikes.innerHTML = parseInt(dislikes.innerHTML, 10) - 1;
    dislike.style.removeProperty('background-color');
  
  
    $.post(`/undislikeAns/${questionID}`, 
    {
        userID: userID,
        ansID: id,
        amount: 0
    });
}

function likeQues(id, amount) {
    var like = document.getElementById(`likeQues-${id}`);
    var likes = like.getElementsByTagName('p')[0];
    console.log(parseInt(likes.innerHTML, 10));
    likes.innerHTML = parseInt(likes.innerHTML, 10) + 1;
    like.style = 'background-color: grey';
  
    var dislike = document.getElementById(`dislikeQues-${id}`);
    var dislikes = dislike.getElementsByTagName('p')[0];
    console.log(parseInt(dislikes.innerHTML, 10));
    dislikes.innerHTML = parseInt(dislikes.innerHTML, 10) - amount;
    dislike.style.removeProperty('background-color');
  
  
    $.post(`/like/${id}`, 
    {
      userID: userID,
      amount: amount
    });
}
function unlikeQues(id) {
    var like = document.getElementById(`likeQues-${id}`);
    var likes = like.getElementsByTagName('p')[0];
    console.log(parseInt(likes.innerHTML, 10));
    likes.innerHTML = parseInt(likes.innerHTML, 10) - 1;
    like.style.removeProperty('background-color');
  
  
    $.post(`/unlike/${id}`, 
    {
        userID: userID,
        amount: 0
    });
}
  
function dislikeQues(id, amount) {
    var dislike = document.getElementById(`dislikeQues-${id}`);
    var dislikes = dislike.getElementsByTagName('p')[0];
    console.log(parseInt(dislikes.innerHTML, 10));
    dislikes.innerHTML = parseInt(dislikes.innerHTML, 10) + 1;
    dislike.style = 'background-color: grey';
  
    var like = document.getElementById(`likeQues-${id}`);
    var likes = like.getElementsByTagName('p')[0];
    console.log(parseInt(likes.innerHTML, 10));
    likes.innerHTML = parseInt(likes.innerHTML, 10) - amount;
    like.style.removeProperty('background-color');
  
  
    $.post(`/dislike/${id}`, 
    {
        userID: userID,
        amount: amount
    });
}
function undislikeQues(id) {
    var dislike = document.getElementById(`dislikeQues-${id}`);
    var dislikes = dislike.getElementsByTagName('p')[0];
    console.log(parseInt(dislikes.innerHTML, 10));
    dislikes.innerHTML = parseInt(dislikes.innerHTML, 10) - 1;
    dislike.style.removeProperty('background-color');
  
  
    $.post(`/undislike/${id}`, 
    {
        userID: userID,
        amount: 0
    });
}