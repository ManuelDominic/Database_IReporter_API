function deleteIncident(id){
  
  let myForm = document.getElementById('myForm');
  let sucessIntervention = document.getElementById('sucessIntervention');
  let messageError = document.getElementById('messageError');

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/intervention/'+ id, {
  // fetch('http://127.0.0.1:5000/api/v3/intervention/'+ id, {
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
      if (response.status === 404) {
        response.json().then((data) => {
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          sucessIntervention.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("sucessIntervention").style.display = "none";
          }, 800);
     });
    }
  })
}


function updateIncident(id){

  let myForm = document.getElementById('myForm');
  let sucessIntervention = document.getElementById('sucessIntervention');
  let messageError = document.getElementById('messageError');
  let comment = document.getElementById('comment').value;
  let latitude = document.getElementById('latitude').value;
  let longtitude = document.getElementById('longtitude').value;
  let newEdit = {
    comment:comment,
    latitude:latitude,
    longtitude:longtitude
  }
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/intervention/'+ id +'/record', {
  // fetch('http://127.0.0.1:5000/api/v3/intervention/'+ id +'/record', {
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
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          sucessIntervention.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("sucessIntervention").style.display = "none";
          }, 800);
     });
    }
  })
}


function editIncident(id){
  let myForm = document.getElementById('myForm');
  let messageError = document.getElementById("messageError");
  let sucessIntervention = document.getElementById("sucessIntervention");
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/intervention/' + id, {
  // fetch('http://127.0.0.1:5000/api/v3/user/intervention/' + id, {
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
          }, 1000);
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          records = data.data
          let output = `
              <form action="#" class="form-container">
                <h1>Upadte Record</h1>
                <h2><span style="color:darkgreen">form-number</span> ${id}</h2> 
                <p id="sucessIntervention" style="color: green"></p>
                <p id="messageError" style="color: red"></p>
                <p id="fieldsError" style="color: red"></p>
                <h4>${records.status_}</h4>
                <label for="title"><i class="fa fa-institution"></i> Title</label>
                <output class="output">${records.title}</output>
                <br>
                <p id="longtitudeError" style="color: red"></p>
                <p id="latitudeError" style="color: red"></p>
                <label for="adr"><i class="fa fa-address-card-o"></i> Location</label>
                <br>
                <input type="location" id="longtitude" style="float:left;" value="${records.longtitude}">
                <input type="location" id="latitude" style="float:left;" value="${records.latitude}">
                <br>
                <label for="Comment"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
                <br>
                 <textarea type="text" id="comment" name="comment">${records.comment}</textarea>
                <p id="commentError" style="color: red"></p>
                <br>
                <button type="submit" onclick="updateIncident(${id})" class="btn">Update</button>
                <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
              </form>
          `
          myForm.innerHTML = output;
     });
    }
  })
}


function viewIncident(id){
  let messageError = document.getElementById("messageError");
  let sucessIntervention = document.getElementById("sucessIntervention");
  let myForm = document.getElementById('myForm');
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/intervention/' + id, {
  // fetch('http://127.0.0.1:5000/api/v3/user/intervention/' + id, {
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
          }, 1000);
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          record = data.data
            let output = `
                  <form action="#" class="form-container">
                    <h2><span style="color:darkgreen">form-number</span> ${id}</h2>
                    <h4>${record.status_}</h4>
                    <label class="output"><i class="fa fa-institution"></i> Title</label>
                    <output>${record.title}</output>
                    <br>
                    <label class="output"><i class="fa fa-address-card-o"></i> Location</label>
                    <output>${record.longtitude},</output>
                    <output>${ record.latitude}</output>
                    <br>
                    <label class="output"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
                    <br>
                    <output>${record.comment}</output>
                    <br>
                    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
                  </form>
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
  let fileField = document.querySelector("input[type='file']");
  formData.append('file', fileField.files[0]);
  
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/intervention/'+ id +'/addImage', {
  // fetch('http://127.0.0.1:5000/api/v3/intervention/'+ id +'/addImage', {
      method: 'PATCH',
      mode: "cors",
      headers:{
        'token': sessionStorage.getItem("token")
      },
      body: formData
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
          }, 1000);
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          sucessIntervention.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("sucessIntervention").style.display = "none";
          }, 800);
     });
    }
  })
}



function viewImage(id){
  let messageError = document.getElementById("messageError");
  let sucessIntervention = document.getElementById("sucessIntervention");
  let myForm = document.getElementById('myForm');

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/intervention/' + id, {
  // fetch('http://127.0.0.1:5000/api/v3/user/intervention/'+ id, {
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
          }, 1000);
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          record = data.data
            let output = `
                  <form action="#" class="form-container">
                    <h2><span style="color:darkgreen">form-number</span> ${id}</h2>
                    <p id="sucessIntervention"></p>
                    <p id="messageError"></p>
                    <h4>${record.status_}</h4>
                    <label class="output"><i class="fa fa-institution"></i> Title</label>
                    <output>${record.title}</output>
                    <br>
                    <label class="output"><i class="fa fa-address-card-o"></i> Location</label>
                    <output>${record.longtitude},</output>
                    <output>${ record.latitude}</output>
                    <br>
                    <label class="output"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
                    <br>
                    <output>${record.comment}</output>
                    <br>
                    <input type="file" name="image" id="image">
                    <br>
                    <button type="submit" onclick="uploadImage(${id})">Add-Image</button>
                    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
                  </form>
              `
            myForm.innerHTML = output;
     });
    }
  })
}


function uploadVideo(id){

  let sucessIntervention = document.getElementById('sucessIntervention');
  let messageError = document.getElementById('messageError');
  var formData = new FormData();
  let fileField = document.querySelector("input[type='file']");
  formData.append('file', fileField.files[0]);
  
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/intervention/'+ id +'/addVideo', {
  // fetch('http://127.0.0.1:5000/api/v3/intervention/'+ id +'/addVideo', {
    method: 'PATCH',
    mode: "cors",
    headers:{
      'token': sessionStorage.getItem("token")
    },
    body: formData
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
        }, 1000);
      })
    }
    if (response.status === 200) {
      response.json().then((data) => {
        sucessIntervention.innerHTML = data.message
        window.setTimeout(function () {
          document.getElementById("sucessIntervention").style.display = "none";
        }, 800);
     });
    }
  })
}



function viewVideo(id){
  
  let messageError = document.getElementById("messageError");
  let sucessIntervention = document.getElementById("sucessIntervention");
  let myForm = document.getElementById('myForm');
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/intervention/' + id, {
  // fetch('http://127.0.0.1:5000/api/v3/user/intervention/'+ id, {
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
          }, 1000);
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          record = data.data
            let output = `
                  <form action="#" class="form-container">
                    <h2><span style="color:darkgreen">form-number</span> ${id}</h2>
                    <p id="sucessIntervention"></p>
                    <p id="messageError"></p>
                    <h4>${record.status_}</h4>
                    <label class="output"><i class="fa fa-institution"></i> Title</label>
                    <output>${record.title}</output>
                    <br>
                    <label class="output"><i class="fa fa-address-card-o"></i> Location</label>
                    <output>${record.longtitude},</output>
                    <output>${ record.latitude}</output>
                    <br>
                    <label class="output"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
                    <br>
                    <output>${record.comment}</output>
                    <br>
                    <input type="file" name="video" id="video">
                    <br>
                    <button type="submit" onclick="uploadVideo(${id})">Add-Image</button>
                    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
                  </form>
              `
            myForm.innerHTML = output;
     });
    }
  })
}


window.onload = function loadPage() {
  let messageError = document.getElementById("messageError");
  let sucessIntervention = document.getElementById("sucessIntervention");
  let loading = document.getElementById('table');

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/intervention', {
  // fetch('http://127.0.0.1:5000/api/v3/user/intervention', {
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
          }, 1000);
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          let output = `
	          <table>
	          <thead>
	          <tr>
	          <th>Id</th>
	          <th>Title</th>
            <th>IncidentType</th>
	          <th>status</th>
	          <th>CreatedOn</th>
            <th>AddImage</th>
	          <th>AddVideo</th>
            <th>View</th>
	          <th>Edit</th>
	          <th>Delete</th>
	          </tr>
	          </thead>
	          <tbody>
	          `
          records = data.data
          for(record in records){
            output += `
            <tr>
            <td class="count"></td>
            <td>${records[record].title}</td>
            <td>${records[record].incident_type}</td>
            <td>${records[record].status_}</td>
            <td>${records[record].created_on}</td>
            <td><label onclick="(viewImage(${records[record].incident_id})),openImage()"><i class="fa fa-file-image-o" style="color:orange;"></i></label></td>
            <td><label onclick="(viewVideo(${records[record].incident_id})),openVideo()"><i class="fa fa-video-camera" style="color:purple;"></i></label></td>
            <td><label onclick="(viewIncident(${records[record].incident_id})),openView()"><i class="fa fa-eye" style="color:green;"></i></label></td>
            <td><label onclick="(editIncident(${records[record].incident_id})),openEdit()"><i class="fa fa-edit" style="color:blue;"></i></label></td>
            <td><label onclick="(deleteIncident(${records[record].incident_id}))"><i class="fa fa-trash" style="color:red;"></i></label></td>
            </tr>
            `
          }
          output += `
          </tbody>
          </table>`

          loading.innerHTML = output;
     });
    }
  })
}
