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