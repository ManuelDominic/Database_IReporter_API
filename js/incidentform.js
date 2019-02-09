

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

    fetch('http://127.0.0.1:5000/api/v1/intervention', {
      method: 'POST',
        mode: "cors",
      headers:{
        'Accept':'application/json',
        'content-type':'application/json'
      },
      body: JSON.stringify(newIntervention)
    })
    .then(function(response) {
        if (response.status === 404) {
          response.json().then((data) => 
              messageError.innerHTML = data.message)
        }
        if (response.status === 406) {
          response.json().then((data) => {
          for (var key in data.error){
            if (data.error.hasOwnProperty(key)) {
              if(data.error.fields){
                  messageError.innerHTML = data.error.fields;
                  break;

              }
              document.getElementById(key+"Error").innerHTML = data.error[key];
              setTimeout(function(){
                 document.getElementById(key+"Error").innerHTML = '';
                },3000);
             }
            }
          }
        );
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

    fetch('http://127.0.0.1:5000/api/v1/red-flags', {
      method: 'POST',
        mode: "cors",
      headers:{
        'Accept':'application/json',
        'content-type':'application/json'
      },
      body: JSON.stringify(newRedflag)
    })
    .then(function(response) {
        if (response.status === 404) {
          response.json().then((data) => 
              messageError.innerHTML = data.message)
        }
        if (response.status === 406) {
          response.json().then((data) => {
          for (var key in data.error){
            if (data.error.hasOwnProperty(key)) {
              if(data.error.fields){
                  messageError.innerHTML = data.error.fields;
                  break;

              }
              document.getElementById(key+"Error").innerHTML = data.error[key];
              setTimeout(function(){
                 document.getElementById(key+"Error").innerHTML = '';
                },3000);
             }
            }
          }
        );
      }
      if (response.status === 201) {
        response.json().then((data) => {
          sucessRedflag.innerHTML = data.message;
        });
    }

  })
}