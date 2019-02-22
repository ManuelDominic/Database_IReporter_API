function updateStatus(id){
  let myForm = document.getElementById('myForm');
  let sucessIntervention = document.getElementById('sucessIntervention');
  let messageError = document.getElementById('messageError');
  let e = document.getElementById('status');
  let status = e.options[e.selectedIndex].text;
  let newStatus = {
    status:status
  }
  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/intervention/' + id +'/status', {

      method: 'PATCH',
      mode: "cors",
      headers:{
        'content-type':'application/json',
        'token': sessionStorage.getItem("token")
      },
      body: JSON.stringify(newStatus)
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
            messageError.style.display = "none";
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
  let sucessIntervention = document.getElementById("sucessIntervention");
  let messageError = document.getElementById('messageError');

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/admin/intervention/' + id, {

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
            let output =  `
            <span onclick="document.getElementById('myForm').style.display='none'" class="close" title="Close Modal">&times;</span>
            <div class="modal-content">
              <form action="#" class="form-container">
                <h1>Upadte Record</h1>
                <h2><span style="color:darkgreen">Record-Number</span> ${id}</h2> 
                <p id="sucessIntervention" style="color: green"></p>
                <p id="messageError" style="color: red"></p>
                <select class="output" id="status">
                  <option>Update-Status</option>
                  <option>Rejected</option>
                  <option>Resolved</option>
                  <option>Under Investigation</option>
                </select>
                <label class="label"><i class="fa fa-institution"></i> CreatedBy</label>
                <output class="output">${records.user_name}</output>
                <br>
                <label class="label"><i class="fa fa-institution"></i> Title</label>
                <output class="output">${records.title}</output>
                <br>
                <label class="label"><i class="fa fa-address-card-o"></i> Location</label>
                <output class="output">${records.latitude}, ${records.longtitude}</output>
                <br>
                <label class="label"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
                <output class="output">${records.comment}</output>
                <br>
                <button type="submit" class="btn" onclick="updateStatus(${id})">Update</button>
              </form>
            </div>
          `
          myForm.innerHTML = output;
      });
    }
  })
}


function viewIncident(id){
  let myForm = document.getElementById('myForm');
  let messageError = document.getElementById("messageError");
  let sucessIntervention = document.getElementById("sucessIntervention");

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/admin/intervention/' + id, {

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
          let output =  `
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
                    <video class="output" src="../../uploads/${record.videoname}" style="width:50%" controls></video>
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


window.onload = function loadPage() {

  let loading = document.getElementById('table');
  let messageError = document.getElementById("messageError");
  let sucessIntervention = document.getElementById("sucessIntervention");

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/admin/intervention', {

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
            <th>CreatedBy</th>
	          <th>Status</th>
	          <th>CreatedOn</th>
	          <th>View</th>
	          <th>Edit</th>
	          </tr>
	          </thead>
	          <tbody>
	          `
          records = data.data
          for (record in records){
            output += `
            <tr>
            <td class="count"></td>
            <td>${records[record].title}</td>
            <td>${records[record].comment}</td>
            <td>${records[record].user_name}</td>
            <td>${records[record].status_}</td>
            <td>${records[record].created_on}</td>
            <td><label onclick="(viewIncident(${records[record].incident_id})),openView()"><i class="fa fa-eye" style="color:green;"></i></label></td>
            <td><label onclick="(editIncident(${records[record].incident_id})),openEdit()"><i class="fa fa-edit" style="color:blue;"></i></label></td>
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
