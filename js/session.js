
function logOut() {
	sessionStorage.removeItem("token");
	sessionStorage.clear();
	window.location.replace("../../index.html");
}