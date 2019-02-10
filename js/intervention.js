function deleteIncident(id){
  alert(id);
}

function editIncident(id){
  let myForm = document.getElementById('myForm');
  let comment = document.getElementById('comment').value;
  let latitude = document.getElementById('latitude').value;
  let longtitude = document.getElementById('longtitude').value;
  let newEdit ={
    comment:comment,
    latitude:latitude,
    longtitude:longtitude,
  }
   fetch('http://127.0.0.1:5000/api/v3/admin/intervention' +id '/record', {
    method: 'PATCH',
      mode: "cors",
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(newEdit)
  }).then(function(response) {
      if (response.status === 404) {
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);
      }
      if (response.status === 406) {
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);
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
                <h4>${records.status_}</h4>
                <label for="title"><i class="fa fa-institution"></i> Title</label>
                <output class="output">${records.title}</output>
                <br>
                <p id="longtitudeError" style="color: red"></p>
                <p id="latitudeError" style="color: red"></p>
                <label for="adr"><i class="fa fa-address-card-o"></i> Location</label>
                <br>
                <input type="location" id="long" style="float:left;" placeholder="${records.longtitude}" required>
                <input type="location" id="lat" style="float:left;" placeholder="${records.latitude}" required>
                <br>
                <label for="Comment"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
                <br>
                 <textarea type="text" id="comment" name="comment" placeholder="${records.comment}" required></textarea>
                <p id="commentError" style="color: red"></p>
                <br>
                <button type="submit" class="btn">Update</button>
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
   fetch('http://127.0.0.1:5000/api/v3/admin/intervention' + id, {
    method: 'GET',
      mode: "cors",
    headers:{
      'content-type':'application/json'
    }
  }).then(function(response) {
      if (response.status === 404) {
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);
      }
      if (response.status === 406) {
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);
      }
      if (response.status === 200) {
        response.json().then((data) => {
          records = data.data
            let output = `
                  <form action="#" class="form-container">
                    <h2><span style="color:darkgreen">form-number</span> ${id}</h2>
                    <h4>${records.status_}</h4>
                    <label class="output"><i class="fa fa-institution"></i> Title</label>
                    <output>${records[record].title}</output>
                    <br>
                    <label class="output"><i class="fa fa-address-card-o"></i> Location</label>
                    <output>${records.longtitude},</output>
                    <output>${ records.latitude}</output>
                    <br>
                    <label class="output"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
                    <br>
                    <output>${records.comment}</output>
                    <br>
                    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
                  </form>
              `
              myForm.innerHTML = output;
     });
    }
  })
}

window.onload = function loadPage() {
  let loading = document.getElementById('table');

  fetch('http://127.0.0.1:5000/api/v3/admin/intervention', {
    method: 'GET',
      mode: "cors",
    headers:{
      'content-type':'application/json'
    }
  }).then(function(response) {
      if (response.status === 404) {
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);
      }
      if (response.status === 406) {
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);  
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
	          <th>View</th>
	          <th>Edit</th>
	          <th>Delete</th>
	          </tr>
	          </thead>
	          <tbody>
	          `
          records = data.data[0]
          for(record in records){
            output += `
            <tr>
            <td class="count"></td>
            <td>${records[record].title}</td>
            <td>${records[record].incident_type}</td>
            <td>${records[record].status_}</td>
            <td>${records[record].created_on}</td>
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
