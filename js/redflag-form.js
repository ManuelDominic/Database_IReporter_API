
function viewIncident(id){
  let myForm = document.getElementById('myForm');
  let messageError = document.getElementById("messageError");
  let sucessRedflag = document.getElementById("sucessRedflag");

  // fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/red-flags/' + id, {
  fetch('http://127.0.0.1:5000/api/v3/user/red-flags/' + id, {
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
          redflags = data.data
          let output = `
          <span onclick="document.getElementById('myForm').style.display='none'" class="close" title="Close Modal">&times;</span>
          <script src="../../js/media.js"></script>
          <div class="modal-content">
            <form action="#" class="form-container">
              <h2><span style="color:darkgreen">Record-Number</span> ${id}</h2>
              <h4>${redflags.status_}</h4>
              <label class="label"><i class="fa fa-institution"></i> Title</label>
              <output class="output">${redflags.title}</output>
              <br>
              <label class="label"><i class="fa fa-address-card-o"></i> Location</label>
              <output class="output">${redflags.latitude}, ${redflags.longtitude}</output>
              <br>
              <label class="label"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
              <output class="output">${redflags.comment}</output>
              <br>
              <div class="row-image"> 
                <div class="column-image">
                  <img src="../../uploads/${redflags.imagename}" style="width:50%; height=50px;">
                  <video src="../../uploads/${redflags.videoname}" style="width:50%; height=50px;">
                </div>
              </div><br>
            </form>
          </div>
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

  // fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/red-flags/' + id, {
  fetch('http://127.0.0.1:5000/api/v3/user/red-flags/' + id, {
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
        redflags = data.data
          let  output = `
            <span onclick="document.getElementById('myForm').style.display='none'" class="close" title="Close Modal">&times;</span>
            <div class="modal-content form">
              <form action="#" class="form-container">
                <h1>Upadte Record</h1>
                <h2><span style="color:darkgreen">Record-Number</span> ${id}</h2> 
                <p id="sucessIntervention" style="color: green"></p>
                <p id="messageError" style="color: red"></p>
                <p id="fieldsError" style="color: red"></p>
                <h4>${redflags.status_}</h4>
                <label class="label"><i class="fa fa-institution"></i> Title</label>
                <output class="output">${redflags.title}</output>
                <br>
                <p id="longtitudeError" style="color: red"></p>
                <p id="latitudeError" style="color: red"></p>
                <label class="label"><i class="fa fa-address-card-o"></i> Location</label>
                <input type="location" class="output" id="lat" style="float:left;" value="${redflags.latitude}">
                <input type="location" class="output" id="long" style="float:left;" value="${redflags.longtitude}">
                <h4>click on the map to find location</h4>
                <pre id='info'></pre>
                <div class="output" id='map'></div>
                <label class="label"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
                 <textarea type="text" id="comment" class="output">${redflags.comment}</textarea>
                <p id="commentError" style="color: red"></p>
                <button type="submit" onclick="updateIncident(${id})" class="btn">Update</button>
                <br>
              </form>
              <script src="../../js/incidentform.js"></script>
              <script src="../../js/map.js"></script>
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

  // fetch('https://ireporter-api-v3.herokuapp.com/api/v3/red-flags/'+ id, {
  fetch('http://127.0.0.1:5000/api/v3/red-flags/'+ id, {
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
     });
    }
  })
}


window.onload = function loadPage() {
  
  let loading = document.getElementById('table');
  let messageError = document.getElementById("messageError");
  let sucessRedflag = document.getElementById("sucessRedflag");

  // fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/red-flags', {
  fetch('http://127.0.0.1:5000/api/v3/user/red-flags', {
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
          sucessRedflag.innerHTML = data.message;
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          let output = `
            <div class="search-container">
              <form action="#" onsubmit="return false">
                <input type="text" id="myInput" onkeyup="mySearch()" placeholder="Search by title.." name="search">
              </form>
            </div>
            <table id="myTable">
	          <thead>
	          <tr>
	          <th>Id</th>
	          <th>Title</th>
            <th>Comment</th>
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
              <td>${redflags[redflag].comment}</td>
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


