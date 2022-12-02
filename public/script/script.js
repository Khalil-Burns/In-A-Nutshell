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

var closePopup = document.getElementsByClassName("close")[0];
var submitQuestionPopup = document.getElementById("submitPopup");

function dropdownOnClick() {
  document.getElementById("userDropdown").classList.toggle("show");
}

function post() {
  var question = document.getElementById("title").value;
  var text = tinymce.get('questionField').getContent();
  document.getElementById("title").value = '';
  var wordCnt = tinymce.activeEditor.plugins.wordcount.getCount();
  tinymce.get('questionField').setContent('');

  $.post("/",
  {
    question: question,
    text: text,
    wordCnt: wordCnt
  });

  submitQuestionPopup.style.display = "block";
};

closePopup.onclick = function() {
  submitQuestionPopup.style.display = "none";
  console.log('yes');
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
}