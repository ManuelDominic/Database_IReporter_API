
let titleCtr = document.getElementById('title');
let title = document.getElementById('title').value;
let commentCtr = document.getElementById('comment');
let comment = document.getElementById('comment').value;
let long = document.getElementById('long');
let lat = document.getElementById('lat');
var letters = /^[A-Za-z]+$/

  
titleCtr.onblur = function(){
  if (title.length < 4 && !title.match(letters)){
    document.getElementById('titleError').style.display = 'block';
    document.getElementById('titleError').innerHTML = 'title feild should have atleast 4 character strings';
    window.setTimeout(function () {
      document.getElementById("titleError").style.display = "none";
    }, 3000);
  }
}

commentCtr.onblur = function(){
  if (comment.length < 10 && typeof comment != 'string') {
    document.getElementById('commentError').style.display = 'block';
    document.getElementById('commentError').innerHTML = 'comment field must have atleast 10 character strings';
    window.setTimeout(function () {
      document.getElementById("commentError").style.display = "none";
    }, 3000);
  }
}

long.onblur = function(){
  document.getElementById('longtitudeError').style.display = 'block';
  document.getElementById('longtitudeError').innerHTML = 'Please find location from the map';
  window.setTimeout(function () {
    document.getElementById("longtitudeError").style.display = "none";
  }, 3000);
}

lat.onblur = function(){
  document.getElementById('latitudeError').style.display = 'block';
  document.getElementById('latitudeError').innerHTML = 'Please find location from the map';
  window.setTimeout(function () {
    document.getElementById("latitudeError").style.display = "none";
  }, 3000);
}

