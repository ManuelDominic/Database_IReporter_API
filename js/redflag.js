function updateIncident(id){

  let myForm = document.getElementById('myForm');
  let sucessRedflag = document.getElementById('sucessRedflag');
  let comment = document.getElementById('comment').value;
  let latitude = document.getElementById('lat').value;
  let longtitude = document.getElementById('long').value;
  let newEdit ={
    comment:comment,
    latitude:latitude,
    longtitude:longtitude,
  }
    
  // fetch('https://ireporter-api-v3.herokuapp.com/api/v3/red-flags/' + id +'/record', {
  fetch('http://127.0.0.1:5000/api/v3/red-flags/' + id +'/record', {
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
  
  // fetch('https://ireporter-api-v3.herokuapp.com/api/v3/red-flags/'+ id +'/addVideo', {
  fetch('http://127.0.0.1:5000/api/v3/red-flags/'+ id +'/addVideo', {
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
          <div class="modal-content">
            <form action="#" class="form-container">
              <h2><span style="color:darkgreen">Record-Number</span> ${id}</h2>
              <p id="sucessIntervention"></p>
              <p id="messageError"></p>
              <h4>${redflags.status_}</h4>
              <label class="label"><i class="fa fa-institution"></i> Title</label>
              <output class="output">${redflags.title}</output>
              <br>
              <label class="label"><i class="fa fa-address-card-o"></i> Location</label>
              <output class="output">${redflags.longtitude}, ${redflags.latitude}</output>
              <br>
              <label class="label"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
              <output class="output">${redflags.comment}</output>
              <br>
              <input type="file" class="label label-crt" accept="video/*" id="video">
              <br>
              <br>
              <p id="v-image"></p>
              <button type="submit" class="btn" onclick="uploadVideo(${id})">Add Video</button>
            </form>
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
  let fileField = document.querySelector("input[type='file']");
  formData.append('file', fileField.files[0]);
  
  // fetch('https://ireporter-api-v3.herokuapp.com/api/v3/intervention/'+ id +'/addImage', {
  fetch('http://127.0.0.1:5000/api/v3/red-flags/'+ id +'/addImage', {
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
          <div class="modal-content">
            <form action="#" class="form-container">
                <h2><span style="color:darkgreen">Record-Number</span> ${id}</h2>
                <p id="sucessIntervention"></p>
                <p id="messageError"></p>
                <h4>${redflags.status_}</h4>
                <label class="label"><i class="fa fa-institution"></i> Title</label>
                <output class="output">${redflags.title}</output>
                <br>
                <label class="label"><i class="fa fa-address-card-o"></i> Location</label>
                <output class="output">${redflags.longtitude}, ${redflags.latitude}</output>
                <br>
                <label class="label"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
                <output class="output">${redflags.comment}</output>
                <br>
                <br>
                <p id="v-image"></p>
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


