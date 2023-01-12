function generateQuestions() {
  console.log(questionsArray);
  var questions = document.getElementById("questions");
  questions.innerHTML = "";
  if (questionsArray.length == 0) {
    questions.innerHTML = "No questions of the specified tag found.";
  }
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

function generateAddTags() {
  addTagList.innerHTML = "";

  for (var idx = 0; idx < tags.length; idx++) {
      var li = document.createElement('li');
      li.style.display = "none";
      addTagList.appendChild(li);

      var button = document.createElement('button');
      button.innerHTML = `${tags[idx]}`;
      button.onclick = function() {
          var input = document.getElementById("inputTag");
          console.log('Search Text' + this.innerHTML);
          input.value = this.innerHTML;
          hideAddTagsDisplay();
      };
      li.appendChild(button);
  }
}
function generateAddTagsDisplay() {
  addTagDiv.innerHTML = "";

  for (var idx = 0; idx < tagsArray.length; idx++) {
    var div = document.createElement('div');
    div.innerHTML = tagsArray[idx];
    div.index = idx;
    addTagDiv.appendChild(div);

    var span = document.createElement('span');
    span.setAttribute('class', 'close');
    span.index = idx;
    span.innerHTML = '&times;';
    span.onclick = function() {removeTag(this.index);}
    span.style.float = 'left';
    div.appendChild(span);
  }
}

function showAddTagsDisplay(filt) {
  addTagList.style.display = 'block';
  li = addTagList.getElementsByTagName("li");
  for (var idx = 0; idx < Math.min(searchDepth, li.length); idx++) {
    li[idx].style.display = 'block';
  }
  if (filt) {
    return;
  }
  filterAddTagsDisplay();
}
function hideAddTagsDisplay() {
  addTagList.style.display = 'none';
  li = addTagList.getElementsByTagName("li");
  for (var idx = 0; idx < li.length; idx++) {
    li[idx].style.display = 'none';
  }
}

/*
*   most of the filter() code: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_list
*/
function filterAddTagsDisplay() {

  var error = document.getElementById("tagsError");
  error.innerHTML = '';

  var input, filter, li, button, i, txtValue;
  input = document.getElementById("inputTag");
  filter = input.value;

  li = addTagList.getElementsByTagName("li");

  var displayCnt = 0;
  if (filter == '') {
    showAddTagsDisplay(true);
    return;
  }

  for (i = 0; i < li.length; i++) {
    button = li[i].getElementsByTagName("button")[0];
    txtValue = button.textContent || button.innerText;
    if (displayCnt >= searchDepth) {
        li[i].style.display = "none";
        continue;
    }
    if (txtValue.indexOf(filter) > -1) {
        li[i].style.display = "";
        displayCnt++;
    } else {
        li[i].style.display = "none";
    }
  }
}

function addTag() {
  var error = document.getElementById("tagsError");
  error.innerHTML = '';

  var input = document.getElementById("inputTag").value;

  if (tagsArray.length == 5) {
    error.innerHTML = 'Can\'t have more than 5 tags';
    return;
  }
  if (tagsAdded[input] == true) {
    error.innerHTML = 'Tag already added';
    return;
  }
  if (input == '') {
    error.innerHTML = 'You didn\'t type in a tag';
    return;
  }

  tagsArray.push(input);
  tagsAdded[input] = true;
  document.getElementById("inputTag").value = '';
  generateAddTagsDisplay();
}
function removeTag(idx) {
  console.log(idx);
  tagsAdded[tagsArray[idx]] = false;
  if (tagsArray.length == 1) {
    tagsArray = [];
  }
  else {
    tagsArray.splice(idx, idx);
  }
  generateAddTagsDisplay();
}

function showTagsPopup() {
  var question = document.getElementById("title").value;

  if (!question) {

      submitQuestionPopup.style.display = "block";
      $("#questionPosted > p").text("You didn't type in a question title!");
      return;
  }

  var error = document.getElementById("tagsError");
  error.innerHTML = "";

  tagsPopup.style.display = "block";
}

function post() {

  var question = document.getElementById("title").value;

  tagsPopup.style.display = "none";

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
    tags: tagsArray,
    wordCnt: wordCnt,
    user: {
      userID: userID,
      userEmail: userEmail,
      displayName: displayName,
    }
  }, function(data, status) {
    tagsArray = [];
    tagsAdded = {};
    submitQuestionPopup.style.display = "block";
    $("#questionPosted > p").text("Question posted!");
    location.reload();
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


  $.get(`/like/?id=${id}&userID=${userID}&amount=${amount}`);
}
function unlike(id) {
  var like = document.getElementById(`like-${id}`);
  var likes = like.getElementsByTagName('p')[0];
  likes.innerHTML = parseInt(likes.innerHTML, 10) - 1;
  like.style.removeProperty('background-color');


  $.get(`/unlike/?id=${id}&userID=${userID}&amount=${0}`);
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


  $.get(`/dislike/?id=${id}&userID=${userID}&amount=${amount}`);
}
function undislike(id) {
  var dislike = document.getElementById(`dislike-${id}`);
  var dislikes = dislike.getElementsByTagName('p')[0];
  dislikes.innerHTML = parseInt(dislikes.innerHTML, 10) - 1;
  dislike.style.removeProperty('background-color');


  $.get(`/undislike/?id=${id}&userID=${userID}&amount=${0}`);
}