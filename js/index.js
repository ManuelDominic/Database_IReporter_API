function userLogin() {

	let loginemail = document.getElementById('loginemail').value;
	let loginpassword = document.getElementById('loginpassword').value;
	let messageLogin = document.getElementById("errorlogin");
	let newLogin = {email: loginemail, password: loginpassword}

	fetch('http://127.0.0.1:5000/api/v1/auth/login', {
		method: 'POST',
	    mode: "cors",
		headers:{
			'Accept':'application/json',
			'content-type':'application/json'
		},
	  body: JSON.stringify(newLogin)
	})
	.then(function(response) {
      if (response.status === 401) {
        response.json().then((data) => 
            messageLogin.innerHTML = data.message)
      }
      else if (response.status === 406) {
      	response.json().then((data) => 
            messageLogin.innerHTML = data.message)
      }
      else if (response.status === 200) {
      	response.json().then((data) => 
        	messageLogin.innerHTML = data.message)
        	window.setTimeout(function () {
            window.location.replace("../index.html");
        }, 800);
      }
    })
    .catch(error => console.log(error.error));
}
