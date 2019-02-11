function viewUesr(id) {
  let myForm = document.getElementById("myForm");
  let messageError = document.getElementById("messageError");

  // fetch('https://ireporter-api-v3.herokuapp.com/api/v3/users' + id, {
  fetch('http://127.0.0.1:5000/api/v3/users' + id, {
    method: 'GET',
      mode: "cors",
    headers:{
      'content-type':'application/json',
      'token': sessionStorage.getItem("token");
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
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);
      }
      if (response.status === 200) {
        response.json().then((data) => {
          user = data.data
          let  output = `
                  <form>
                    <img src="../../img/gent.jpeg" alt="John" style="width:100%">
                    <h1>${user.user_name}</h1>
                    <p class="title">Software Developer/Computer Engineer</p>
                    <p>Andela  Uganda</p>
                    <div style="margin: 24px 0;">
                      <a href="#"><i class="far fa-dribbble"></i></a> 
                      <a href="#"><i class="far fa-twitter"></i></a>  
                      <a href="#"><i class="far fa-linkedin"></i></a>  
                      <a href="#"><i class="far fa-facebook"></i></a> 
                    </div>
                    <p><button>${user.phone_number}</button></p>
                    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
                  </form>`
            myForm.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("myForm").style.display = "none";
          }, 1000);
      });
    }
  })
}


window.onload = function loadPage() {
  let loading = document.getElementById('table');
  let messageError = document.getElementById("messageError");

  // fetch('https://ireporter-api-v3.herokuapp.com/api/v3/users', {
  fetch('http://127.0.0.1:5000/api/v3/users', {
      method: 'GET',
        mode: "cors",
      headers:{
        'content-type':'application/json',
        'token': sessionStorage.getItem("token");
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
	          <th>userId</th>
	          <th>User name</th>
	          <th>email</th>
	          <th>Joined</th>
	          <th>View</th>
	          <th>Edit</th>
	          <th>Delete</th>
	          </tr>
	          </thead>
	          <tbody>
	          `
          users = data.data
          for(user in users){
            output += `
            <tr>
            <td>${users[user].user_id}</td>
            <td>${users[user].user_name}</td>
            <td>${users[user].email}</td>
            <td>${users[user].joinning}</td>
            <td><label onclick="(viewUesr(${users[user].user_id}))"><i class="fa fa-eye" style="color:green;"></i></label></td>
            </tr>
            `
          }
          output += `
          </tbody>
          </table>`

          document.getElementById('table').innerHTML = output;
     });
    }
  })
}
