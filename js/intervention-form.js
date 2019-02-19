function viewIncident(id){

  let messageError = document.getElementById("messageError");
  let sucessIntervention = document.getElementById("sucessIntervention");
  let myForm = document.getElementById('myForm');

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/user/intervention/' + id, {
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
          record = data.data
            let output = `                
                <span onclick="document.getElementById('myForm').style.display='none'" class="close" title="Close Modal">&times;</span>
                <script src="../../js/media.js"></script>
                <div class="modal-content">
                  <form action="#" class="form-container">
                    <h2><span style="color:darkgreen">Record-Number</span> ${id}</h2>
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
                    <div class="row-image"> 
                      <div class="column-image">
                        <img src="../../uploads/${record.imagename}" style="width:50%; height=50px;">
                        <video src="../../uploads/${record.videoname}" style="width:50%; height=50px;">
                      </div>
                    </div>
                   <br>
                  </form>
                </div>
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
  
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/incident/'+ id +'/addVideo', {
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


function viewVideo(id){
  
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
                    <input type="file" class="label label-crt" accept="video/*" id="video">
                    <br>
                    <br>
                    <button type="submit" class="btn" onclick="uploadVideo(${id})">Add Video</button>
                  </form>
                </div>
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
      if (response.status === 404) {
        response.json().then((data) => {
          sucessIntervention.innerHTML = data.message;
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
            <td>${records[record].comment}</td>
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





