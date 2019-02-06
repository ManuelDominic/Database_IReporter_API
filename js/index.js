function userLogin() {

  let loginemail = document.getElementById('loginemail').value;
  let loginpassword = document.getElementById('loginpassword').value;
  let login = document.getElementById("Login").elements;
  let messageLogin = document.getElementById("errorlogin");
  let sucessLogin = document.getElementById("goodlogin");
  let newLogin = {email: loginemail, password: loginpassword}

  fetch('https://ireporter-api-v3.herokuapp.com/api/v1/auth/login', {
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
          messageLogin.innerHTML = data.message);
      }      
      if (response.status === 406) {
        response.json().then((data) => {
        for (var key in data.error) {
          if (data.error.hasOwnProperty(key)) {
            if (loginemail === "" && loginpassword === "") {
                    messageLogin.innerHTML = data.error.fields;
              }
            else if (loginemail === "") {
                messageLogin.innerHTML = data.error.email;
              }
            else if (loginpassword === ""){
                messageLogin.innerHTML = data.error.password;
              }
          }
        }
      });
    }      
    if (response.status === 200) {
      response.json().then((data) => {
        sucessLogin.innerHTML = data.message
      if (loginemail === "ireportermanueldominic@gmail.com" && loginpassword === "admin123") {
       window.setTimeout(function () {
        window.location.replace("templates/admin/home.html");
      }, 800);
    }
      else {
       window.setTimeout(function () {
        window.location.replace("templates/user/home.html");
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

    fetch('https://ireporter-api-v3.herokuapp.com/api/v1/auth/signup', {
      method: 'POST',
        mode: "cors",
      headers:{
        'Accept':'application/json',
        'content-type':'application/json'
      },
      body: JSON.stringify(newSignup)
    })
    .then(function(response) {
        if (response.status === 404) {
          response.json().then((data) => 
              messageSignup.innerHTML = data.message);
        }
        if (response.status === 406) {
          response.json().then((data) => {
          for (var key in data.error){
            if (data.error.hasOwnProperty(key)) {
              if(data.error.fields){
                  messageSignup.innerHTML = data.error.fields;
                  break;

              }
              document.getElementById(key+"Error").innerHTML = data.error[key];
             }
            }
          }
        );
      }
      if (response.status === 201) {
        response.json().then((data) => {
          sucessSignup.innerHTML = data.message
        });
    }

  })
}


