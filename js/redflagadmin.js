function viewIncident(id){

  let myForm = document.getElementById('myForm');
  let sucessRedflag = document.getElementById('sucessRedflag');

  fetch('http://127.0.0.1:5000/api/v3/admin/red-flags/' + id, {
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
        redflags = data.data
        for(redflag in redflags){
          let output = `
            <form action="#" class="form-container">
              <h2><span style="color:darkgreen">form-number</span> ${id}</h2>
              <h4>${redflags[redflag].status_}</h4>
              <label class="output"><i class="fa fa-institution"></i> Title</label>
              <output>${redflags[redflag].title}</output>
              <br>
              <label class="output"><i class="fa fa-address-card-o"></i> Location</label>
              <output>${redflags[redflag].longtitude},</output>
              <output> ${redflags[redflag].latitude}</output>
              <br>
              <label class="output"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
              <br>
              <output>${redflags[redflag].comment}</output>
              <br>
              <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
            </form>
          `
          myForm.innerHTML = output;
        }
      });
    }
  })
}

function updateStatus(id){

  let myForm = document.getElementById('myForm');
  let sucessRedflag = document.getElementById('sucessRedflag');
  let messageError = document.getElementById('messageError');
  let e = document.getElementById('status');
  let status = e.options[e.selectedIndex].text;
  let newStatus = {
    status:status
  }
  fetch('http://127.0.0.1:5000/api/v3/red-flags/' + id + '/status', {
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
         sucessRedflag.innerHTML = data.message;
         window.setTimeout(function () {
            document.getElementById("sucessRedflag").style.display = "none";
          }, 1000);
      });
    }
  })
}


function editIncident(id){

  let myForm = document.getElementById('myForm');

  fetch('http://127.0.0.1:5000/api/v3/admin/red-flags/'+ id, {
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
        redflags = data.data
        for(redflag in redflags){
          let output = `
            <form action="#" class="form-container">
              <h1>Upadte redflag</h1>
              <h2><span style="color:darkgreen">form-number</span> ${id}</h2> 
              <p id="sucessRedflag" style="color: green"></p>
              <p id="messageError" style="color: red"></p>
              <select id="status">
                <option>Update-Status</option>
                <option>Rejected</option>
                <option>Resolved</option>
                <option>Under Investigation</option>
              </select>
              <label for="title"><i class="fa fa-institution"></i> Title</label>
              <br>
              <output class="output">${redflags[redflag].title}</output>
              <p id="longtitudeError" style="color: red"></p>
              <p id="latitudeError" style="color: red"></p>
              <br>
              <label for="adr"><i class="fa fa-address-card-o"></i> Location</label>
              <br>
              <output class="output">${redflags[redflag].longtitude},</output>
              <output class="output">${ redflags[redflag].latitude}</output>
              <br>
              <label for="Comment"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
              <br>
              <output class="output">${redflags[redflag].comment}</output>
              <p id="commentError" style="color: red"></p>
              <br>
              <button type="submit" class="btn" onclick="updateStatus(${id})">Update</button>
              <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
            </form>
          `
          myForm.innerHTML = output;
        }
      });
    }
  })
}


window.onload = function loadPage() {
  let loading = document.getElementById('table');

  fetch('http://127.0.0.1:5000/api/v3/admin/red-flags', {
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
          let output = `
	          <table>
	          <thead>
	          <tr>
	          <th>Id</th>
	          <th>Title</th>
            <th>IncidentType</th>
	          <th>Status</th>
	          <th>CreatedOn</th>
	          <th>View</th>
	          <th>Edit</th>
	          </tr>
	          </thead>
	          <tbody>
	          `
          redflags = data.data[0]
          for(redflag in redflags){
            output += `
              <tr>
              <td class="count"></td>
              <td>${redflags[redflag].title}</td>
              <td>${redflags[redflag].incident_type}</td>
              <td>${redflags[redflag].status_}</td>
              <td>${redflags[redflag].created_on}</td>
              <td><label onclick="(viewIncident(${redflags[redflag].incident_id})),openView()"><i class="fa fa-eye" style="color:green;"></i></label></td>
              <td><label onclick="(editIncident(${redflags[redflag].incident_id})),openEdit()"><i class="fa fa-edit" style="color:blue;"></i></label></td>
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



