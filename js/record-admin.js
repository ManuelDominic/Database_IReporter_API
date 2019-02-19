
window.onload = function loadPage() {
  
  let sucessIntervention = document.getElementById("intervention-admin");
  let sucessRedflag = document.getElementById("redflag-admin");
  let sucessUser = document.getElementById("users-admin");

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/admin/record/number', {
      method: 'GET',
      mode: 'cors',
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
      if (response.status === 200) {
        response.json().then((data) => {
          sucessIntervention.innerHTML = data.intervention
          sucessRedflag.innerHTML = data.redflag
          sucessUser.innerHTML = data.user
     });
    }
  })
}

