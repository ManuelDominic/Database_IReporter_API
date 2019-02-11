
let password = document.getElementById("psw");
let repeatPassword = document.getElementById("psw-repeat");

password.onblur = function(){
  if (password.value !== repeatPassword.value){
    document.getElementById('passwordError').innerHTML = 'Passwords do not match';
    window.setTimeout(function () {
	    document.getElementById("passwordError").style.display = "none";
	  }, 1000);
  }
}
repeatPassword.onkeyup = function(){
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
