
let title = document.getElementById('title');
let comment = document.getElementById('comment');
let long = document.getElementById('long');
let lat = document.getElementById('lat');

title.onkeyup = function(){
  document.getElementById('titleError').style.display = 'block';
  document.getElementById('titleError').innerHTML = 'title feild should have atleast 4 character strings';
  window.setTimeout(function () {
    document.getElementById("titleError").style.display = "none";
  }, 3000);
}
comment.onkeyup = function(){
  document.getElementById('commentError').style.display = 'block';
  document.getElementById('commentError').innerHTML = 'comment field must have atleast 10 character strings';
  window.setTimeout(function () {
    document.getElementById("commentError").style.display = "none";
  }, 3000);
}
long.onkeyup = function(){
  document.getElementById('longtitudeError').style.display = 'block';
  document.getElementById('longtitudeError').innerHTML = 'Please find location from the map';
  window.setTimeout(function () {
    document.getElementById("longtitudeError").style.display = "none";
  }, 3000);
}
lat.onkeyup = function(){
  document.getElementById('latitudeError').style.display = 'block';
  document.getElementById('latitudeError').innerHTML = 'Please find location from the map';
  window.setTimeout(function () {
    document.getElementById("latitudeError").style.display = "none";
  }, 3000);
}

