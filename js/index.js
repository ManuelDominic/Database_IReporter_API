
function register() {
  window.setTimeout(function () {
        window.location.replace("templates/user/signup.html");
      }, 100);
}

function signin() {
  window.setTimeout(function () {
        window.location.replace("../../index.html");
      }, 100);
}

function userLogin() {

	let loginemail = document.getElementById('loginemail').value;
	let loginpassword = document.getElementById('loginpassword').value;
  let messageLogin = document.getElementById("errorlogin");
	let sucessLogin = document.getElementById("goodlogin");
	let newLogin = {email: loginemail, password: loginpassword}

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/auth/login', {
	// fetch('http://127.0.0.1:5000/api/v3/auth/login', {
		method: 'POST',
	    mode: "cors",
		headers:{
			'content-type':'application/json'
		},
	  body: JSON.stringify(newLogin)
	})
	.then(function(response) {
      if (response.status === 401) {
        response.json().then((data) => {
          messageLogin.innerHTML = data.message
          window.setTimeout(function () {
            messageLogin.style.display = "none";
          }, 2000);
        })
      }      
      if (response.status === 406) {
      	response.json().then((data) => {
        for (var key in data.error) {
          if (data.error.hasOwnProperty(key)) {
            if (loginemail === "" && loginpassword === "") {
                messageLogin.innerHTML = data.error.fields;
                window.setTimeout(function () {
                  messageLogin.style.display = "none";
                }, 1000);
              }
            else if (loginemail === "") {
                messageLogin.innerHTML = data.error.email;
                window.setTimeout(function () {
                  messageLogin.style.display = "none";
                }, 2000);
              }
            else if (loginpassword === ""){
                messageLogin.innerHTML = data.error.password;
                window.setTimeout(function () {
                  messageLogin.style.display = "none";
                }, 2000);
              }
          }
        }
      });
    }      
    if (response.status === 200) {
    	response.json().then((data) => {
      	sucessLogin.innerHTML = data.message
        window.setTimeout(function () {
          sucessLogin.style.display = "none";
        }, 1000);
        sessionStorage.setItem("token", data.token);
      if (loginemail === "ireportermanueldominic@gmail.com") {
    	 window.setTimeout(function () {
        window.location.replace("templates/admin/dash.html");
      }, 800);
    }
      else {
       window.setTimeout(function () {
        window.location.replace("templates/user/dash.html");
      }, 800);
    }
  })
}
 })
  .catch(error => console.log(error.error));
}

function userSignup() {
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let uname = document.getElementById('uname').value;
    let email = document.getElementById('email').value;
    let Phone = document.getElementById('Phone').value;
    let psw = document.getElementById('psw').value;
    let pswrepeat = document.getElementById('psw-repeat').value;
    let messageSignup = document.getElementById("messageSignup");
    let sucessSignup = document.getElementById("sucessSignup");
    let newSignup = {
      firstName:fname,
      lastName:lname,
      userName:uname,
      email:email,
      password:psw,
      phoneNumber:Phone
    }

    fetch('https://ireporter-api-v3.herokuapp.com/api/v3/auth/signup', {
    // fetch('http://127.0.0.1:5000/api/v3/auth/signup', {
      method: 'POST',
        mode: "cors",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(newSignup)
    })
    .then(function(response) {
        if (response.status === 400) {
          response.json().then((data) => {
            messageSignup.innerHTML = data.message
            window.setTimeout(function () {
              document.getElementById("messageSignup").style.display = "none";
            }, 3000);
          })
        }
        if (response.status === 406) {
          response.json().then((data) => {
          for (var key in data.error){
            if (data.error.hasOwnProperty(key)) {
              if(data.error.fields){
                  messageSignup.innerHTML = data.error.fields;
                  window.setTimeout(function () {
                    document.getElementById("messageSignup").style.display = "none";
                  }, 3000);
                  break;

              }
              document.getElementById(key+"Error").innerHTML = data.error[key];
              window.setTimeout(function () {
                document.getElementById(key+"Error").style.display = "none";
              }, 3000);
             }
            }
          });
      }
      if (response.status === 201) {
        response.json().then((data) => {
          sucessSignup.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("sucessSignup").style.display = "none";
          }, 3000);
        });
    }

  })
}


