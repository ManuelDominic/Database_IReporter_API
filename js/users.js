function viewUser(id) {
  
  let myForm = document.getElementById("myForm");
  let sucessUser = document.getElementById('sucessUser');
  let messageError = document.getElementById("messageError");

  // fetch('https://ireporter-api-v3.herokuapp.com/api/v3/users/' + id, {
  fetch('http://127.0.0.1:5000/api/v3/users/' + id, {
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
          user = data.data[0]
            let output = `
                  <span onclick="document.getElementById('myForm').style.display='none'" class="close" title="Close Modal">&times;</span>
                  <div class="modal-content">
                    <form class="modal-form" action="#">
                      <img src="../../img/gent.jpeg" alt="John" style="width:35%">
                      <h1>${user.first_name} ${user.last_name}</h1>
                      <p class="title">${user.user_name}</p>
                      <p>${user.email}</p>
                      <div style="margin: 24px 0;">
                        <a href="#"><i class="far fa-dribbble"></i></a> 
                        <a href="#"><i class="far fa-twitter"></i></a>  
                        <a href="#"><i class="far fa-linkedin"></i></a>  
                        <a href="#"><i class="far fa-facebook"></i></a> 
                      </div>
                      <p><button>${user.phone_number}</button></p>
                    </form>
                  </div>
                    `
            myForm.innerHTML = output
      });
    }
  })
}


window.onload = function loadPage() {
  let sucessUser = document.getElementById('sucessUser');
  let loading = document.getElementById('table');
  let messageError = document.getElementById("messageError");

  // fetch('https://ireporter-api-v3.herokuapp.com/api/v3/users', {
  fetch('http://127.0.0.1:5000/api/v3/users', {
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
          sucessUser.innerHTML = data.message;
        })
      }
      if (response.status === 200) {
        response.json().then((data) => {
          let output = `
            <div class="search-container">
              <form action="#" onsubmit="return false">
                <input type="text" id="myInput" onkeyup="mySearch()" placeholder="Search by username.." name="search">
              </form>
            </div>
            <table id="myTable">
	          <thead>
	          <tr>
	          <th>userId</th>
	          <th>User name</th>
	          <th>email</th>
	          <th>Joined</th>
	          <th>View</th>
	          </tr>
	          </thead>
	          <tbody>
	          `
          users = data.data
          for(user in users){
            output += `
            <tr>
            <td class="count"></td>
            <td>${users[user].user_name}</td>
            <td>${users[user].email}</td>
            <td>${users[user].joinning}</td>
            <td><label onclick="(viewUser(${users[user].user_id})),openView()"><i class="fa fa-eye" style="color:green;"></i></label></td>
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
