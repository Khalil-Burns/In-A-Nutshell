/*var boldButton = document.getElementById("B");

var italicsButton = document.getElementById("I");
var underlineButton = document.getElementById("U");
var askFieldInput = document.getElementById("askFieldInput");

boldButton.addEventListener("click", function(){
  // Toggle the bold class on the text element
  askFieldInput.classList.toggle("bold");
});
italicsButton.addEventListener("click", function(){
  // Toggle the bold class on the text element
  askFieldInput.classList.toggle("italic");
});
underlineButton.addEventListener("click", function(){
  // Toggle the bold class on the text element
  askFieldInput.classList.toggle("underline");
});


function go() {
  var xhttp = new XMLHttpRequest();
  var question = tinymce.get('questionField').getContent();
  var wordCnt = tinymce.activeEditor.plugins.wordcount.getCount();
  tinymce.get('questionField').setContent('');

  xhttp.open("POST", '/', true);
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  /*xhttp.send(
    {
      'text': question, 
      'wordCnt': wordCnt
    });
  xhttp.send(`test=${question}&wordCnt=${wordCnt}`);
  console.log(question);
}*/

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

function loginPopup() {
  var error = document.getElementById("signInError");

  signInPopup.style.display = "block";
  error.innerHTML = "";
};
function signupPopup() {
  var error = document.getElementById("signUpError");

  signUpPopup.style.display = "block";
  error.innerHTML = "";
};

function login() {
  var username = document.getElementById("signInUsername").value;
  var email = document.getElementById("signInEmail").value;
  var password = document.getElementById("signInPassword").value;
  var error = document.getElementById("signInError");
  error.innerHTML = "";

  if (!username) {
    //$("#signInError > p").text("You didn't type in a username!");
    error.innerHTML = "You didn't type in a username!";
    return;
  }
  if (!email) {
    error.innerHTML = "You didn't type in a email!";
    return;
  }
  if (!password) {
    error.innerHTML = "You didn't type in a password!";
    return;
  }

  $.post("/signin",
  {
    username: username,
    email: email,
    password: password
  }, function(data, status) {
    if (!data.error) {
      console.log(data);
      window.location.replace("/");
      signInPopup.style.display = "none";
      submitQuestionPopup.style.display = "block";
      $("#questionPosted > p").text(`Signed in as ${username}!`);
    }
    else {
      error.innerHTML = data.error;
    }
  });

  error.innerHTML = "Loading...";
}

function signup() {
  var username = document.getElementById("signUpUsername").value;
  var email = document.getElementById("signUpEmail").value;
  var password = document.getElementById("signUpPassword").value;
  var error = document.getElementById("signUpError");
  error.innerHTML = "";

  if (!username) {
    //$("#signInError > p").text("You didn't type in a username!");
    error.innerHTML = "You didn't type in a username!";
    return;
  }
  if (!email) {
    error.innerHTML = "You didn't type in a email!";
    return;
  }
  if (!password) {
    error.innerHTML = "You didn't type in a password!";
    return;
  }

  $.post("/signup",
  {
    username: username,
    email: email,
    password: password
  }, function(data, status) {
    if (!data.error) {
      window.location.replace("/");
      signUpPopup.style.display = "none";
      submitQuestionPopup.style.display = "block";
      $("#questionPosted > p").text(`User created as ${username}!`);
    }
    else {
      error.innerHTML = data.error;
    }
  });

  error.innerHTML = "Loading...";
}

function logout() {
  $.post("/logout");
}

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