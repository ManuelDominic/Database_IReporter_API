
let password = document.getElementById("psw");
let repeatPassword = document.getElementById("psw-repeat");

password.onblur = function(){
  if (password.value !== repeatPassword.value){
    document.getElementById('passwordError').innerHTML = 'Passwords do not match';
  }
}
repeatPassword.onkeyup = function(){
  if (password.value !== repeatPassword.value){
    document.getElementById('passwordError').style.display = 'block';
    document.getElementById('passwordError').innerHTML = 'Passwords do not match';
  } else {
    document.getElementById('passwordError').style.display = 'none';
  }
}
