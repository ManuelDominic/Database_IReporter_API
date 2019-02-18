let firstNameCtr = document.getElementById("fname");
let firstName = document.getElementById("fname").value;
let lastNameCtr = document.getElementById("lname");
let lastName = document.getElementById("lname").value;
let userNameCtr = document.getElementById("uname");
let userName = document.getElementById("uname").value;
let emailCtr = document.getElementById("email");
let email = document.getElementById("email").value;
let phoneNumberCtr = document.getElementById("Phone");
let phoneNumber = document.getElementById("Phone").value;
let passwordCtr = document.getElementById("psw");
let password = document.getElementById("psw").value;
let repeatPasswordCtr = document.getElementById("psw-repeat");
let repeatPassword = document.getElementById("psw-repeat").value;
var letters = /^[A-Za-z]+$/
var numbers = /^[0-9]+$/
var alphanumeric = /^[a-z0-9]+$/
var mail = /\S+@\S+\.\S+/



firstNameCtr.onkeyup = function(){
  if (firstName.length < 3 && !firstName.match(letters)){
    document.getElementById('firstNameError').style.display = 'block';
    document.getElementById('firstNameError').innerHTML = 'firstName field must have only character strings';
    window.setTimeout(function () {
      document.getElementById("firstNameError").style.display = "none";
    }, 1000); 
  }
}

lastNameCtr.onkeyup = function(){
  if (lastName.length < 3 && !lastName.match(letters)){
    document.getElementById('lastNameError').style.display = 'block';
    document.getElementById('lastNameError').innerHTML = 'lastName field must have only character strings';
    window.setTimeout(function () {
      document.getElementById("lastNameError").style.display = "none";
    }, 1000);
  }
}

userNameCtr.onkeyup = function(){
  if (userName.length < 4 && !userName.match(letters)){
    document.getElementById('userNameError').style.display = 'block';
    document.getElementById('userNameError').innerHTML = 'userName field must have only character strings';
    window.setTimeout(function () {
      document.getElementById("userNameError").style.display = "none";
    }, 1000);
  }
}

emailCtr.onkeyup = function(){
  if (email.toString().length < 12  && !email.match(mail)){
    document.getElementById('emailError').style.display = 'block';
    document.getElementById('emailError').innerHTML = 'Email format must be example@example.com';
    window.setTimeout(function () {
      document.getElementById("emailError").style.display = "none";
    }, 1000);
  }
}

phoneNumberCtr.onkeyup = function(){
  if (phoneNumber.toString().length != 10  && !phoneNumber.match(numbers)){
    document.getElementById('phoneNumberError').style.display = 'block';
    document.getElementById('phoneNumberError').innerHTML = 'phoneNumber feild must contain 10 digits';
    window.setTimeout(function () {
      document.getElementById("phoneNumberError").style.display = "none";
    }, 1000);
  }
}

passwordCtr.onkeyup = function(){
  if (password.length < 6  && !password.match(alphanumeric)){
    document.getElementById('passwordError').style.display = 'block';
    document.getElementById('passwordError').innerHTML = 'Password must have atleast six alphanumeric characters';
    window.setTimeout(function () {
      document.getElementById("passwordError").style.display = "none";
    }, 1000);
  }
}

passwordCtr.onblur = function(){
  if (password.value !== repeatPassword.value){
    document.getElementById('passwordError').innerHTML = 'Passwords do not match';
    window.setTimeout(function () {
      document.getElementById("passwordError").style.display = "none";
    }, 1000);
  }
}
repeatPasswordCtr.onkeyup = function(){
  if (password.value !== repeatPassword.value){
    document.getElementById('passwordError').style.display = 'block';
    document.getElementById('passwordError').innerHTML = 'Passwords do not match';
    window.setTimeout(function () {
      document.getElementById("passwordError").style.display = "none";
    }, 1000);
  } else {
    document.getElementById('passwordError').style.display = 'none';
  }
}