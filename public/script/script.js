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