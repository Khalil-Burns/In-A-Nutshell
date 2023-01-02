var closeAnswerPopup = document.getElementById("closeAnswer");
var submitAnswerPopup = document.getElementById("submitPopup");

var closeSignInPopup = document.getElementById("closeSignIn");
var signInPopup = document.getElementById("signInPopup");

var closeSignUpPopup = document.getElementById("closeSignUp");
var signUpPopup = document.getElementById("signUpPopup");

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

  $.post("/answer",
  {
    title: title,
    answer: answer,
    wordCnt: wordCnt,
    user: {
      userID: userID,
      userEmail: userEmail
    },
    questionID: questionID
  });

  submitAnswerPopup.style.display = "block";
  $("#AnswerPosted > p").text("Answer posted!");
};

function likeAns(id, amount) {
    var like = document.getElementById(`likeAns-${id}`);
    var likes = like.getElementsByTagName('p')[0];
    console.log(parseInt(likes.innerHTML, 10));
    likes.innerHTML = parseInt(likes.innerHTML, 10) + 1;
    like.style = 'background-color: red';
  
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
    dislike.style = 'background-color: red';
  
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
    like.style = 'background-color: red';
  
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
    dislike.style = 'background-color: red';
  
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

closeAnswerPopup.onclick = function() {
  submitAnswerPopup.style.display = "none";
}
closeSignInPopup.onclick = function() {
  signInPopup.style.display = "none";
}
closeSignUpPopup.onclick = function() {
  signUpPopup.style.display = "none";
}

window.onclick = function(event) {
  if (!event.target.matches('.dropdownButton')) {
    var dropdowns = document.getElementsByClassName("dropdownOnClick");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

window.onclick = function(event) {
  if (event.target == submitAnswerPopup) {
    submitAnswerPopup.style.display = "none";
  }
  else if (event.target == signInPopup) {
    signInPopup.style.display = "none";
  }
  else if (event.target == signUpPopup) {
    signUpPopup.style.display = "none";
  }
}