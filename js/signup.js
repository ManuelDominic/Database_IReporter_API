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



firstNameCtr.onblur = function(){
  if (firstName.length < 3 && !firstName.match(letters)){
    document.getElementById('firstNameError').innerHTML = 'firstName field must have atleast 3 character strings';
    window.setTimeout(function () {
      document.getElementById("firstNameError").style.display = "none";
    }, 2000); 
  }
  else{
    document.getElementById("firstNameError").style.display = "none";
  }
}

lastNameCtr.onblur = function(){
  if (lastName.length < 3 && !lastName.match(letters)){
    document.getElementById('lastNameError').innerHTML = 'lastName field must have atleast 3 character strings';
    window.setTimeout(function () {
      document.getElementById("lastNameError").style.display = "none";
    }, 2000);
  }
  else{
    document.getElementById("lastNameError").style.display = "none";
  }
}

userNameCtr.onblur = function(){
  if (userName.length < 4 && !userName.match(letters)){
    document.getElementById('userNameError').innerHTML = 'userName field must have atleast 4 character strings';
    window.setTimeout(function () {
      document.getElementById("userNameError").style.display = "none";
    }, 2000);
  }
  else{
    document.getElementById("userNameError").style.display = "none";
  }
}

emailCtr.onblur = function(){
  if (email.toString().length < 12  && !email.match(mail)){
    document.getElementById('emailError').innerHTML = 'Email format must be example@example.com';
    window.setTimeout(function () {
      document.getElementById("emailError").style.display = "none";
    }, 2000);
  }
  else{
    document.getElementById("emailError").style.display = "none";
  }
}

phoneNumberCtr.onblur = function(){
  if (phoneNumber.toString().length != 10  && !phoneNumber.match(numbers)){
    document.getElementById('phoneNumberError').innerHTML = 'phoneNumber feild must contain 10 digits';
    window.setTimeout(function () {
      document.getElementById("phoneNumberError").style.display = "none";
    }, 2000);
  }
  else{
    document.getElementById("phoneNumberError").style.display = "none";
  }
}

passwordCtr.onblur = function(){
  if (password.length < 6  && !password.match(alphanumeric)){
    document.getElementById('passwordError').innerHTML = 'Password must have atleast six alphanumeric characters';
    window.setTimeout(function () {
      document.getElementById("passwordError").style.display = "none";
    }, 2000);
  }
  else{
    document.getElementById("passwordError").style.display = "none";
  }
}


repeatPasswordCtr.onkeyup = function(){
  if (password.value !== repeatPassword.value){
    document.getElementById('passwordError').innerHTML = 'Passwords do not match';
    window.setTimeout(function () {
      document.getElementById("passwordError").style.display = "none";
    }, 1000);
  } else {
    document.getElementById('passwordError').style.display = 'none';
  }
}
