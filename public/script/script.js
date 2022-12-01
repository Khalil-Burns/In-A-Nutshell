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
});*/


// function go() {
//   var xhttp = new XMLHttpRequest();
//   var question = tinymce.get('questionField').getContent();
//   var wordCnt = tinymce.activeEditor.plugins.wordcount.getCount();
//   tinymce.get('questionField').setContent('');

//   xhttp.open("POST", '/', true);
//   xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//   /*xhttp.send(
//     {
//       'text': question, 
//       'wordCnt': wordCnt
//     });*/
//   xhttp.send(`test=${question}&wordCnt=${wordCnt}`);
//   console.log(question);
// }

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
};