
window.onload = function loadPage() {
  let loading = document.getElementById('table');

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/users', {
    method: 'GET',
      mode: "cors",
    headers:{
      'content-type':'application/json'
    }
  }).then(function(response) {
      if (response.status === 404) {
        response.json().then((data) => 
            messageError.innerHTML = data.message)
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
            <td><label onclick="(viewIncident(${users[user].user_id}))"><i class="fa fa-eye" style="color:green;"></i></label></td>
            <td><label onclick="(editIncident(${users[user].user_id}))"><i class="fa fa-edit" style="color:blue;"></i></label></td>
            <td><label onclick="(deleteIncident(${users[user].user_id}))"><i class="fa fa-trash" style="color:red;"></i></label></td>
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
