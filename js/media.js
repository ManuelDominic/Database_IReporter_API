
window.onload = function viewMedia(filename) {

	var elem = document.createElement("IMG");
  var media = document.getElementById("media");

	fetch('https://ireporter-api-v3.herokuapp.com/api/v3/incident/'+ filename +'/media', {

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
        response.blob().then((data) => {
          console.log(data)          
          elem.setAttribute("src", "../../uploads/"+filename);
          document.getElementById("media").appendChild(elem);
          media.innerHTML = data
      })
	}
}

