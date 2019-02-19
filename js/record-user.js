 
window.onload = function loadPage() {
  
  let sucessIntervention = document.getElementById("intervention-user");
  let sucessRedflag = document.getElementById("redflag-user");

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/record/number', {
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
     });
    }
  })
}