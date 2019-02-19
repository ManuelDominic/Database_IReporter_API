
function createIncident() {

    let title = document.getElementById('title').value;
    let comment = document.getElementById('comment').value;
    let long = document.getElementById('long').value;
    let lat = document.getElementById('lat').value;
    let e = document.getElementById('incident');
    let incidentType = e.options[e.selectedIndex].value;
    let messageError = document.getElementById("messageError");
    let sucessIncident = document.getElementById("sucessIncident");
    let newIncident = {
      title:title,
      comment:comment,
      latitude:lat,
      longtitude:long
    }
    if (incidentType === 'redflag'){
      var url = 'https://ireporter-api-v3.herokuapp.com/api/v3/red-flags';
    }
    else if (incidentType === 'intervention'){
      var url = 'https://ireporter-api-v3.herokuapp.com/api/v3/intervention';
    }

    fetch(url, {
      method: 'POST',
      mode: "cors",
      headers:{
        'content-type':'application/json',
        'token': sessionStorage.getItem("token")
      },
      body: JSON.stringify(newIncident)
    })
    .then(function(response) {
        if (response.status === 401) {
          response.json().then((data) => {
            window.setTimeout(function () {
              window.location.replace("../../index.html");
            }, 2000);
          })
              
        }
        if (response.status === 400) {
          response.json().then((data) => {
            messageError.innerHTML = data.message
            window.setTimeout(function () {
              document.getElementById("messageError").style.display = "none";
            }, 3000);
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
                  }, 2000);
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
          sucessIncident.innerHTML = data.message
          window.setTimeout(function () {
            sucessIncident.style.display = "none";
          }, 3000);
        });
    }

  })
}
