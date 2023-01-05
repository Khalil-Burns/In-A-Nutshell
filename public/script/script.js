function generateNotifications() {
    var notifications = document.getElementById("notifications");
    notifications.innerHTML = "<h2>Notifications:</h2>";
    for (var idx = 0; idx < notificationsArray.length; idx++) {
        var notification = document.createElement('div')
        notification.setAttribute('class', 'notification');
        notifications.appendChild(notification);

        var hr = document.createElement('hr');
        notification.appendChild(hr);

        var table = document.createElement('table');
        table.style = "width: 100%;";
        notification.appendChild(table);

        var tableRow = document.createElement('tr');
        table.appendChild(tableRow);

        var tdImg = document.createElement('td');
        tdImg.style.width = "0%";
        tdImg.style.height = "0%";
        tdImg.innerHTML = `<img src="${notificationsArray[idx].img}" alt="">`
        tableRow.appendChild(tdImg);

        var tdText = document.createElement('td');
        tdText.style.paddingLeft = "2%";
        tdText.innerHTML = `<p>${notificationsArray[idx].text}</p>`
        tableRow.appendChild(tdText);
    }
}

function generateTags() {
    tagList.innerHTML = "";
    for (var idx = 0; idx < tags.length; idx++) {
        var li = document.createElement('li');
        li.style.display = "none";
        tagList.appendChild(li);

        var button = document.createElement('button');
        button.innerHTML = `${tags[idx]}`;
        li.appendChild(button);
    }
}
function showTags() {
    tagList.style.display = 'block';
    li = tagList.getElementsByTagName("li");
    for (var idx = 0; idx < Math.min(searchDepth, li.length); idx++) {
        li[idx].style.display = 'block';
    }
    console.log('show tags');
}
function hideTags() {
    tagList.style.display = 'none';
    li = tagList.getElementsByTagName("li");
    for (var idx = 0; idx < li.length; idx++) {
        li[idx].style.display = 'none';
    }
    console.log('hide tags');
}

/*
 *   most of the filter() code: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_list
 */
function filter() {
    console.log('filter');
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value;

    li = tagList.getElementsByTagName("li");

    var displayCnt = 0;
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
    var email = document.getElementById("signInEmail").value;
    var password = document.getElementById("signInPassword").value;
    var error = document.getElementById("signInError");
    error.innerHTML = "";
  
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
        email: email,
        password: password
    }, function(data, status) {
        if (!data.error) {
            location.reload();
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
            location.reload();
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

function sort(array, sortBy, isAsc) {
    quicksort(array, 0, array.length - 1, sortBy, isAsc);
    return(array);
}
function quicksort(array, left, right, sortBy, isAsc) {
    var mid = partition(array, left, right, sortBy, isAsc);
    if (left < mid - 1) {
        quicksort(array, left, mid - 1, sortBy, isAsc);
    }
    if (right > mid) {
        quicksort(array, mid, right, sortBy, isAsc);
    }
}
function partition(array, left, right, sortBy, isAsc) {
    var pivot = array[(left + right) >>> 1][sortBy];
    while (left <= right) {
        if (isAsc == "true") {
            while (array[left][sortBy] < pivot) { 
                left++; 
            }
            while (array[right][sortBy] > pivot) { 
                right--; 
            }
        }
        else {
            while (array[left][sortBy] > pivot) { 
                left++; 
            }
            while (array[right][sortBy] < pivot) { 
                right--; 
            }
        }
        if (left <= right) {
            var temp = array[left];
            array[left] = array[right];
            array[right] = temp;
            left++;
            right--;
        }
    }
    return left;
}