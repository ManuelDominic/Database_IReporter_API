function updateIncident(id){

  let myForm = document.getElementById('myForm');
  let sucessRedflag = document.getElementById('sucessRedflag');
  let comment = document.getElementById('comment').value;
  let latitude = document.getElementById('latitude').value;
  let longtitude = document.getElementById('longtitude').value;
  let newEdit ={
    comment:comment,
    latitude:latitude,
    longtitude:longtitude,
  }
    
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/red-flags/' + id +'/record', {
  // fetch('http://127.0.0.1:5000/api/v3/red-flags/' + id +'/record', {
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
          }, 3000);
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
          sucessRedflag.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("sucessRedflag").style.display = "none";
          }, 1000);
    });
    }
  })
}


function uploadVideo(id){

  let sucessRedflag = document.getElementById('sucessRedflag');
  let messageError = document.getElementById('messageError');
  var formData = new FormData();
  let fileField = document.querySelector("input[type='file']");
  formData.append('file', fileField.files[0]);
  
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/intervention/'+ id +'/addVideo', {
  // fetch('http://127.0.0.1:5000/api/v3/red-flags/'+ id +'/addVideo', {
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
          }, 3000);
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          sucessRedflag.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("sucessIntervention").style.display = "none";
          }, 800);
     });
    }
  })
}

function viewVideo(id){
  let myForm = document.getElementById('myForm');
  let messageError = document.getElementById("messageError");
  let sucessRedflag = document.getElementById("sucessRedflag");

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/red-flags/' + id, {
  // fetch('http://127.0.0.1:5000/api/v3/user/red-flags/' + id, {
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
          redflags = data.data
          let output = `
            <form action="#" class="form-container">
              <h2><span style="color:darkgreen">form-number</span> ${id}</h2>
              <h4>${redflags.status_}</h4>
              <label class="output"><i class="fa fa-institution"></i> Title</label>
              <br>
              <output>${redflags.title}</output>
              <br>
              <label class="output"><i class="fa fa-address-card-o"></i> Location</label>
              <br>
              <output>${redflags.longtitude}, </output>
              <output> ${redflags.latitude}</output>
              <br>
              <label class="output"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
              <br>
              <output>${redflags.comment}</output>
              <br>
              <input type="file" name="image" id="image">
              <br>
              <button type="submit" onclick="uploadVideo(${id})">Add-Video</button>
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
  // fetch('http://127.0.0.1:5000/api/v3/red-flags/'+ id +'/addImage', {
      method: 'PATCH',
      mode: "cors",
      headers:{
        'token': sessionStorage.getItem("token")
      },body:formData
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
          sucessIntervention.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("sucessIntervention").style.display = "none";
          }, 800);
     });
    }
  })
}


function viewImage(id){
  let myForm = document.getElementById('myForm');
  let messageError = document.getElementById("messageError");
  let sucessRedflag = document.getElementById("sucessRedflag");

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/red-flags/' + id, {
  // fetch('http://127.0.0.1:5000/api/v3/user/red-flags/' + id, {
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
          redflags = data.data
          let output = `
            <form action="#" class="form-container">
              <h2><span style="color:darkgreen">form-number</span> ${id}</h2>
              <h4>${redflags.status_}</h4>
              <label class="output"><i class="fa fa-institution"></i> Title</label>
              <br>
              <output>${redflags.title}</output>
              <br>
              <label class="output"><i class="fa fa-address-card-o"></i> Location</label>
              <br>
              <output>${redflags.longtitude}, </output>
              <output> ${redflags.latitude}</output>
              <br>
              <label class="output"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
              <br>
              <output>${redflags.comment}</output>
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



function viewIncident(id){
  let myForm = document.getElementById('myForm');
  let messageError = document.getElementById("messageError");
  let sucessRedflag = document.getElementById("sucessRedflag");

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/red-flags/' + id, {
  // fetch('http://127.0.0.1:5000/api/v3/user/red-flags/' + id, {
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
          redflags = data.data
          let output = `
            <form action="#" class="form-container">
              <h2><span style="color:darkgreen">form-number</span> ${id}</h2>
              <h4>${redflags.status_}</h4>
              <label class="output"><i class="fa fa-institution"></i> Title</label>
              <br>
              <output>${redflags.title}</output>
              <br>
              <label class="output"><i class="fa fa-address-card-o"></i> Location</label>
              <br>
              <output>${redflags.longtitude}, </output>
              <output> ${redflags.latitude}</output>
              <br>
              <label class="output"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
              <br>
              <output>${redflags.comment}</output>
              <br>
              <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
            </form>
          `
          myForm.innerHTML = output;
      });
    }
  })
}


function editIncident(id){
  let myForm = document.getElementById('myForm');
  let messageError = document.getElementById("messageError");
  let sucessRedflag = document.getElementById("sucessRedflags");

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/red-flags/' + id, {
  // fetch('http://127.0.0.1:5000/api/v3/user/red-flags/' + id, {
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
        redflags = data.data
          let  output = `
            <form action="#" class="form-container">
              <h1>Upadte redflag</h1>
              <h2><span style="color:darkgreen">form-number</span> ${id}</h2> 
              <p id="sucessRedflag" style="color: green"></p>
              <p id="messageError" style="color: red"></p>
              <h4>${redflags.status_}</h4>
              <label for="title"><i class="fa fa-institution"></i> Title</label>
              <output class="output">${redflags.title}</output>
              <p id="longtitudeError" style="color: red"></p>
              <p id="latitudeError" style="color: red"></p>
              <label for="adr"><i class="fa fa-address-card-o"></i> Location</label>
              <br>
              <input type="location" id="longtitude" style="float:left;" value="${redflags.longtitude}">
              <input type="location" id="latitude" style="float:left;" value="${redflags.latitude}">
              <br>
              <label for="Comment"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
               <textarea type="text" id="comment" name="comment">${redflags.comment}</textarea>
              <p id="commentError" style="color: red"></p>
              <button type="submit" onclick="updateIncident(${id})" class="btn">Update</button>
              <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
            </form>
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

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/red-flags/'+ id, {
  // fetch('http://127.0.0.1:5000/api/v3/red-flags/'+ id, {
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
          }, 3000);
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


window.onload = function loadPage() {
  
  let loading = document.getElementById('table');
  let messageError = document.getElementById("messageError");
  let sucessRedflag = document.getElementById("sucessRedflag");

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/red-flags', {
  // fetch('http://127.0.0.1:5000/api/v3/user/red-flags', {
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
          let output = `
	          <table>
	          <thead>
	          <tr>
	          <th>Id</th>
	          <th>Title</th>
            <th>IncidentType</th>
	          <th>Status</th>
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
          redflags = data.data
          for(redflag in redflags){
            output += `
              <tr>
              <td class="count"></td>
              <td>${redflags[redflag].title}</td>
              <td>${redflags[redflag].incident_type}</td>
              <td>${redflags[redflag].status_}</td>
              <td>${redflags[redflag].created_on}</td>
              <td><label onclick="(viewImage(${redflags[redflag].incident_id})),openImage()"><i class="fa fa-file-image-o" style="color:orange;"></i></label></td>
              <td><label onclick="(viewVideo(${redflags[redflag].incident_id})),openVideo()"><i class="fa fa-video-camera" style="color:purple;"></i></label></td>
              <td><label onclick="(viewIncident(${redflags[redflag].incident_id})),openView()"><i class="fa fa-eye" style="color:green;"></i></label></td>
              <td><label onclick="(editIncident(${redflags[redflag].incident_id})),openEdit()"><i class="fa fa-edit" style="color:blue;"></i></label></td>
              <td><label onclick="(deleteIncident(${redflags[redflag].incident_id}))"><i class="fa fa-trash" style="color:red;"></i></label></td>
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


