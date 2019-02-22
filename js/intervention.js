function updateIncident(id){

  let myForm = document.getElementById('myForm');
  let sucessIntervention = document.getElementById('sucessIntervention');
  let messageError = document.getElementById('messageError');
  let comment = document.getElementById('comment').value;
  let latitude = document.getElementById('lat').value;
  let longtitude = document.getElementById('long').value;
  let newEdit = {
    comment:comment,
    latitude:latitude,
    longtitude:longtitude
  }
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/intervention/'+ id +'/record', {
      method: 'PATCH',
      mode: "cors",
      headers:{
        'content-type':'application/json',
        'token': sessionStorage.getItem("token")
      },
      body: JSON.stringify(newEdit)
    }).then(function(response) {
      if (response.status === 401) {
        response.json().then((data) => {
          window.setTimeout(function () {
            window.location.replace("../../index.html");
          }, 800);
        })
      }
      if (response.status === 406) {
        response.json().then((data) => {
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          alert(data.message)          
     });
    }
  })
}


function editIncident(id){
  let myForm = document.getElementById('myForm');
  let messageError = document.getElementById("messageError");
  let sucessIntervention = document.getElementById("sucessIntervention");
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/intervention/' + id, {
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
      if (response.status === 200) {
        response.json().then((data) => {
          records = data.data
          let output = `
            <span onclick="document.getElementById('myForm').style.display='none'" class="close" title="Close Modal">&times;</span>
            <div class="modal-content form">
              <form action="#" class="form-container">
                <h1>Upadte Record</h1>
                <h2><span style="color:darkgreen">Record-Number</span> ${id}</h2> 
                <p id="sucessIntervention" style="color: green"></p>
                <p id="messageError" style="color: red"></p>
                <h4>${records.status_}</h4>
                <label class="label"><i class="fa fa-institution"></i> Title</label>
                <output class="output">${records.title}</output>
                <br>
                <p id="longtitudeError" style="color: red"></p>
                <p id="latitudeError" style="color: red"></p>
                <label class="label"><i class="fa fa-address-card-o"></i> Location</label>
                <input type="location" class="output" id="lat" style="float:left;" value="${records.latitude}">
                <input type="location" class="output" id="long" style="float:left;" value="${records.longtitude}">
                <h4>click on the map to find location</h4>
                <pre id='info'></pre>
                <div class="output" id='map'></div>
                <label class="label"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
                 <textarea type="text" id="comment" class="output">${records.comment}</textarea>
                <p id="commentError" style="color: red"></p>
                <button type="submit" onclick="updateIncident(${id})" class="btn">Update</button>
                <br>
              </form>
              <script src="../../js/map.js"></script>
              <script src="../../js/incidentform.js"></script>
            </div>
          `
          myForm.innerHTML = output;
     });
    }
  })
}


function uploadImage(id){

  let sucessIntervention = document.getElementById('sucessIntervention');
  let messageError = document.getElementById('messageError');
  var formData = new FormData();
  let fileField = document.getElementById('image');
  formData.append('file', fileField.files[0]);
  
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/incident/'+ id +'/addImage', {
      method: 'PATCH',
      mode: "nor-cors",
      headers:{
        'token': sessionStorage.getItem("token")
      },body: formData
    }).then(function(response) {
      if (response.status === 401) {
        response.json().then((data) => {
          window.setTimeout(function () {
            window.location.replace("../../index.html");
          }, 800);
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
      if (response.status === 200) {
        response.json().then((data) => {
          alert(data.message)
     });
    }
  })
}


function viewImage(id){
  let messageError = document.getElementById("messageError");
  let sucessIntervention = document.getElementById("sucessIntervention");
  let myForm = document.getElementById('myForm');

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/intervention/' + id, {
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
      if (response.status === 200) {
        response.json().then((data) => {
          record = data.data
            let output = `                  
                <span onclick="document.getElementById('myForm').style.display='none'" class="close" title="Close Modal">&times;</span>
                <div class="modal-content">
                  <form action="#" class="form-container">
                      <h2><span style="color:darkgreen">Record-Number</span> ${id}</h2>
                      <p id="sucessIntervention"></p>
                      <p id="messageError"></p>
                      <h4>${record.status_}</h4>
                      <label class="label"><i class="fa fa-institution"></i> Title</label>
                      <output class="output">${record.title}</output>
                      <br>
                      <label class="label"><i class="fa fa-address-card-o"></i> Location</label>
                      <output class="output">${record.latitude}, ${record.longtitude}</output>
                      <br>
                      <label class="label"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
                      <output class="output">${record.comment}</output>
                      <br>
                      <input type="file" class="label label-crt" accept="image/*" id="image">
                      <br>
                      <br>
                      <button type="submit" class="btn" onclick="uploadImage(${id})">Add Image</button>
                  </form>
                </div>
              `
            myForm.innerHTML = output;
     });
    }
  })
}



function deleteIncident(id){
  
  let myForm = document.getElementById('myForm');
  let sucessIntervention = document.getElementById('sucessIntervention');
  let messageError = document.getElementById('messageError');

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/intervention/'+ id, {
      method: 'DELETE',
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
      if (response.status === 200) {
        response.json().then((data) => {
          alert(data.message)
          window.setTimeout(function () {
            document.location.reload()
          }, 1000);
     });
    }
  })
}
