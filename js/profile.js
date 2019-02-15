function viewProfile() {
  let myForm = document.getElementById("myForm");
  let user_name = document.getElementById("user_name");
  let phone_number = document.getElementById("phone_number");
  let sucessUser = document.getElementById('sucessUser');
  let messageError = document.getElementById("messageError");

  // fetch('https://ireporter-api-v3.herokuapp.com/api/v3/profile', {
  fetch('http://127.0.0.1:5000/api/v3/profile', {
    method: 'GET',
      mode: "cors",
    headers:{
      'content-type':'application/json',
      'token': sessionStorage.getItem("token")
    }
  }).then(function(response) {
      if (response.status === 401) {
        response.json().then((data) => {
          window.setTimeout(function () {
            window.location.replace("../../index.html");
          }, 800);
        })
      }
      if (response.status === 404) {
        response.json().then((data) => {
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 3000);
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          user = data.data[0]
          user_name.innerHTML = user.user_name
          phone_number.innerHTML = user.phone_number
      });
    }
  })
}

