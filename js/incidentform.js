function createIntervention() {

    let title = document.getElementById('title').value;
    let comment = document.getElementById('comment').value;
    let long = document.getElementById('long').value;
    let lat = document.getElementById('lat').value;
    let messageError = document.getElementById("messageError");
    let sucessIntervention = document.getElementById("sucessIntervention");
    let newIntervention = {
      title:title,
      comment:comment,
      latitude:lat,
      longtitude:long
    }
    fetch('https://ireporter-api-v3.herokuapp.com/api/v3/intervention', {
      method: 'POST',
        mode: "cors",
      headers:{
        'Accept':'application/json',
        'content-type':'application/json',
        'token': sessionStorage.getItem("token")
      },
      body: JSON.stringify(newIntervention)
    })
    .then(function(response) {
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
            }, 1000);
          })
              
        }
        if (response.status === 406) {
          response.json().then((data) => {
          for (var key in data.error){
            if (data.error.hasOwnProperty(key)) {
              if(data.error.fields){
                  messageError.innerHTML = data.error.fields
                  window.setTimeout(function () {
                    document.getElementById("messageError").style.display = "none";
                  }, 1000);
                  break;

              }
                document.getElementById(key+"Error").innerHTML = data.error[key];
                window.setTimeout(function () {
                document.getElementById(key+"Error").style.display = "none";
              }, 1000);
             }
            }
          });
      }
      if (response.status === 201) {
        response.json().then((data) => {
          sucessIntervention.innerHTML = data.message
        });
    }

  })
}



function createRedflag() {

    let title = document.getElementById('title').value;
    let comment = document.getElementById('comment').value;
    let long = document.getElementById('long').value;
    let lat = document.getElementById('lat').value;
    let messageError = document.getElementById("messageError");
    let sucessRedflag = document.getElementById("sucessRedflag");
    let newRedflag = {
      title:title,
      comment:comment,
      latitude:lat,
      longtitude:long
    }

    fetch('https://ireporter-api-v3.herokuapp.com/api/v3/red-flags', {
      method: 'POST',
        mode: "cors",
      headers:{
        'Accept':'application/json',
        'content-type':'application/json',
        'token': sessionStorage.getItem("token")
      },
      body: JSON.stringify(newRedflag)
    })
    .then(function(response) {
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
              }, 1000);
            })
        }
        if (response.status === 406) {
          response.json().then((data) => {
          for (var key in data.error){
            if (data.error.hasOwnProperty(key)) {
              if(data.error.fields){
                  messageError.innerHTML = data.error.fields
                  window.setTimeout(function () {
                    document.getElementById("messageError").style.display = "none";
                  }, 1000);
                  break;

              }
              document.getElementById(key+"Error").innerHTML = data.error[key];
              window.setTimeout(function () {
                document.getElementById(key+"Error").style.display = "none";
              }, 1000);
             }
            }
          });
      }
      if (response.status === 201) {
        response.json().then((data) => {
          sucessRedflag.innerHTML = data.message;
          window.setTimeout(function () {
            document.getElementById("sucessRedflag").style.display = "none";
          }, 1000);
        });
    }

  })
}