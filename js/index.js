function userLogin() {

  let loginemail = document.getElementById('loginemail').value;
  let loginpassword = document.getElementById('loginpassword').value;
  let login = document.getElementById("Login").elements;
  let messageLogin = document.getElementById("errorlogin");
  let sucessLogin = document.getElementById("goodlogin");
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
      if (loginemail === "ireporterManuelDominic@gmail.com" && loginpassword === "admin123") {
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