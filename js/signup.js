let firstName = document.getElementById("fname");
let lastName = document.getElementById("lname");
let userName = document.getElementById("uname");
let email = document.getElementById("email");
let phoneNumber = document.getElementById("Phone");
let password = document.getElementById("psw");
let repeatPassword = document.getElementById("psw-repeat");

password.onblur = function(){
  if (password.value !== repeatPassword.value){
    document.getElementById('passwordError').innerHTML = 'Passwords do not match';
    window.setTimeout(function () {
	    document.getElementById("passwordError").style.display = "none";
	  }, 3000);
  }
}
repeatPassword.onkeyup = function(){
  if (password.value !== repeatPassword.value){
    document.getElementById('passwordError').style.display = 'block';
    document.getElementById('passwordError').innerHTML = 'Passwords do not match';
    window.setTimeout(function () {
	    document.getElementById("passwordError").style.display = "none";
	  }, 3000);
  } else {
    document.getElementById('passwordError').style.display = 'none';
  }
}

firstName.onkeyup = function(){
  document.getElementById('firstNameError').style.display = 'block';
  document.getElementById('firstNameError').innerHTML = 'firstName field must have only character strings';
  window.setTimeout(function () {
    document.getElementById("firstNameError").style.display = "none";
  }, 3000); 
}
lastName.onkeyup = function(){
  document.getElementById('lastNameError').style.display = 'block';
  document.getElementById('lastNameError').innerHTML = 'lastName field must have only character strings';
  window.setTimeout(function () {
    document.getElementById("lastNameError").style.display = "none";
  }, 3000);
}
userName.onkeyup = function(){
  document.getElementById('userNameError').style.display = 'block';
  document.getElementById('userNameError').innerHTML = 'userName field must have only character strings';
  window.setTimeout(function () {
    document.getElementById("userNameError").style.display = "none";
  }, 3000);
}
email.onkeyup = function(){
  document.getElementById('emailError').style.display = 'block';
  document.getElementById('emailError').innerHTML = 'Email format must be example@example.com';
  window.setTimeout(function () {
    document.getElementById("emailError").style.display = "none";
  }, 3000);
}
phoneNumber.onkeyup = function(){
  document.getElementById('phoneNumberError').style.display = 'block';
  document.getElementById('phoneNumberError').innerHTML = 'phoneNumber feild must contain 10 digits';
  window.setTimeout(function () {
    document.getElementById("phoneNumberError").style.display = "none";
  }, 3000);
}
password.onkeyup = function(){
  document.getElementById('passwordError').style.display = 'block';
  document.getElementById('passwordError').innerHTML = 'Password must have atleast six alphanumeric characters';
  window.setTimeout(function () {
    document.getElementById("passwordError").style.display = "none";
  }, 3000);
}

