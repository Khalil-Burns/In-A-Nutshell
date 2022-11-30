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
function go() {
    var question =      tinymce.get('questionField').getContent();
    tinymce.get('questionField').setContent('');
    console.log(question);
}