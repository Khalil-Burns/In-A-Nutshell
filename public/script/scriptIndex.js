function generateQuestions() {
  var questions = document.getElementById("questions");
  questions.innerHTML = "";
  for (var idx = 0; idx < questionsArray.length; idx++) {

    var question = document.createElement('div');
    question.setAttribute("class", "question");
    questions.appendChild(question);

    var table = document.createElement('table');
    table.style.width = "100%";
    question.appendChild(table);

    var tableRow = document.createElement('tr');
    table.appendChild(tableRow);

    var tdButtons = document.createElement('td');
    tdButtons.style.width = "0%";
    tdButtons.style.height = "0%";
    tableRow.appendChild(tdButtons);

    var tdText = document.createElement('td');
    tableRow.appendChild(tdText);

    if (isUser) {
      var bLike = document.createElement('button');
      bLike.setAttribute("class", "like");
      bLike.questionID = questionsArray[idx].id;
      bLike.setAttribute("id", "like-" + bLike.questionID);
      if (likes[questionsArray[idx].id] == 1) {
        bLike.style.backgroundColor = "grey";
      }
      bLike.innerHTML = `<p>${questionsArray[idx].likes}</p> ^`;
      tdButtons.appendChild(bLike);

      var bDislike = document.createElement('button');
      bDislike.setAttribute("class", "dislike");
      bDislike.questionID = questionsArray[idx].id;
      bDislike.setAttribute("id", "dislike-" + bDislike.questionID);
      if (likes[questionsArray[idx].id] == 2) {
        bDislike.style.backgroundColor = "grey";
      }
      bDislike.innerHTML = `v <p>${questionsArray[idx].dislikes}</p>`;
      tdButtons.appendChild(bDislike);

      bLike.onclick = function() {
        preLike(this.questionID);
      }
      bDislike.onclick = function() {
        preDislike(this.questionID);
      }
    }
    else {
      var bLike = document.createElement('p');
      bLike.setAttribute("class", "like");
      bLike.innerHTML = `${questionsArray[idx].likes} ^`
      tdButtons.appendChild(bLike);

      var bDislike = document.createElement('p');
      bDislike.setAttribute("class", "dislike");
      bDislike.innerHTML = `${questionsArray[idx].dislikes} v`
      tdButtons.appendChild(bDislike);
    }

    var text = document.createElement('button');
    text.setAttribute("class", "questionButton");
    text.questionID = questionsArray[idx].id;
    text.onclick = function() {
      location.href = "/question/" + this.questionID;
    };
    text.innerHTML = `<strong>${questionsArray[idx].question}</strong>`;
    tdText.appendChild(text);

    var subText = document.createElement('p');
    subText.setAttribute("class", "subText");
    subText.user = {
      userID: questionsArray[idx].user.userID,
      displayName: questionsArray[idx].user.displayName
    }

    var d = new Date(parseInt(questionsArray[idx].timeCreated, 10));
    subText.timeCreated = d.toString();
    subText.innerHTML = `Posted by <a href="/user/${subText.user.userID}">${subText.user.displayName}</a> on ${subText.timeCreated}`
    subText.style.fontSize = "small";
    subText.style.textAlign = "right";

    tdText.appendChild(subText);

    if (idx < questionsArray.length - 1) {
      var hr = document.createElement('hr');
      question.appendChild(hr);
    }
  }
}

function dropdownOnClick() {
  document.getElementById("userDropdown").classList.toggle("show");
}
function post() {
  var question = document.getElementById("title").value;

  if (!question) {

    submitQuestionPopup.style.display = "block";
    $("#questionPosted > p").text("You didn't type in a question!");
    return;
  }

  var text = tinymce.get('questionField').getContent();
  document.getElementById("title").value = '';
  var wordCnt = tinymce.activeEditor.plugins.wordcount.getCount();
  tinymce.get('questionField').setContent('');

  submitQuestionPopup.style.display = "block";
  $("#questionPosted > p").text("Loading...");

  $.post("/ask",
  {
    question: question,
    text: text,
    wordCnt: wordCnt,
    user: {
      userID: userID,
      userEmail: userEmail,
      displayName: displayName,
    }
  }, function(data, status) {
    window.location.replace("/");
    submitQuestionPopup.style.display = "block";
    $("#questionPosted > p").text("Question posted!");
  });
};

function preLike(id) {
  if (!(likes[id] == 1)) {
    var amount = 0;
    if (likes[id] == 2) {
      amount = 1;
    }
    like(id, amount);
    likes[id] = 1;
  }
  else {
    unlike(id);
    likes[id] = 0;
  }
}
function preDislike(id) {
  if (likes[id] != 2) {
    var amount = 0;
    if (likes[id] == 1) {
      amount = 1;
    }
    dislike(id, amount);
    likes[id] = 2;
  }
  else {
    undislike(id);
    likes[id] = 0;
  }
}

function like(id, amount) {
  var like = document.getElementById(`like-${id}`);
  var likes = like.getElementsByTagName('p')[0];
  likes.innerHTML = parseInt(likes.innerHTML, 10) + 1;
  like.style = 'background-color: grey';

  var dislike = document.getElementById(`dislike-${id}`);
  var dislikes = dislike.getElementsByTagName('p')[0];
  dislikes.innerHTML = parseInt(dislikes.innerHTML, 10) - amount;
  dislike.style.removeProperty('background-color');


  $.post(`/like/${id}`, 
  {
    userID: userID,
    amount: amount
  });
}
function unlike(id) {
  var like = document.getElementById(`like-${id}`);
  var likes = like.getElementsByTagName('p')[0];
  likes.innerHTML = parseInt(likes.innerHTML, 10) - 1;
  like.style.removeProperty('background-color');


  $.post(`/unlike/${id}`, 
  {
    userID: userID,
    amount: 0
  });
}

function dislike(id, amount) {
  var dislike = document.getElementById(`dislike-${id}`);
  var dislikes = dislike.getElementsByTagName('p')[0];
  dislikes.innerHTML = parseInt(dislikes.innerHTML, 10) + 1;
  dislike.style = 'background-color: grey';

  var like = document.getElementById(`like-${id}`);
  var likes = like.getElementsByTagName('p')[0];
  likes.innerHTML = parseInt(likes.innerHTML, 10) - amount;
  like.style.removeProperty('background-color');


  $.post(`/dislike/${id}`, 
  {
    userID: userID,
    amount: amount
  });
}
function undislike(id) {
  var dislike = document.getElementById(`dislike-${id}`);
  var dislikes = dislike.getElementsByTagName('p')[0];
  dislikes.innerHTML = parseInt(dislikes.innerHTML, 10) - 1;
  dislike.style.removeProperty('background-color');


  $.post(`/undislike/${id}`, 
  {
    userID: userID,
    amount: 0
  });
}