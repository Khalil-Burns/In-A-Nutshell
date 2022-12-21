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

var closeQuestionPopup = document.getElementById("closeQuestion");
var submitQuestionPopup = document.getElementById("submitPopup");

var closeSignInPopup = document.getElementById("closeSignIn");
var signInPopup = document.getElementById("signInPopup");

var closeSignUpPopup = document.getElementById("closeSignUp");
var signUpPopup = document.getElementById("signUpPopup");

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

  $.post("/a",
  {
    question: question,
    text: text,
    wordCnt: wordCnt,
    user: {
      userID: userID,
      userEmail: userEmail
    }
  });

  submitQuestionPopup.style.display = "block";
  $("#questionPosted > p").text("Question posted!");
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

function like(id) {

}
function dislike(id) {
  
}

closeQuestionPopup.onclick = function() {
  submitQuestionPopup.style.display = "none";
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
  if (event.target == submitQuestionPopup) {
    submitQuestionPopup.style.display = "none";
  }
  else if (event.target == signInPopup) {
    signInPopup.style.display = "none";
  }
}