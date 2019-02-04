//onclick signup
function signup() {
   alert ("Successfully Registered!! You can Now Login");
}

//onclick Update
function update() {
   alert ("Successfully Updated!! Thank You");
}

//onclick form
function form() {
   alert ("Successfully Sent!! Thank You");
}

//onclick Delete.
function Delete() {
   alert ("Successfully Deleted!! Thank You");
}

let element = document.getElementById("test").elements;

for (var i = 0, element; element = elements[i++];) {
    if (element.type === "text" && element.value === "")
        console.log("This field is required!")
}