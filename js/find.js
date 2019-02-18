function find() {

	var center = document.getElementById('lnglat').value;
	console.log(center)

	if (center==='') {
		locationError.innerHTML = 'No location inserted'
		window.setTimeout(function () {
              locationError.style.display = 'none';
            }, 2000);
	}else{
		document.getElementById('info').innerHTML = 'copyright@ManuelDominic';

		var latLng = center.split(",");

		var lat = parseFloat(latLng[0]);

		var lng = parseFloat(latLng[1]); 

		mapboxgl.accessToken = 'pk.eyJ1IjoiZmFyaGF0YWJiYXMiLCJhIjoiY2plODE2NGgxMDRhdjMzcGV6a3QxaGE4OSJ9.O7Gu6jLiZe2y_gPK6AZJyA';
		var map = new mapboxgl.Map({
		    container: 'map',
		    style: 'mapbox://styles/mapbox/streets-v9',
		    center: [0, 0],
		    zoom: 8
		});

		var locate = map.flyTo({center:[lat, lng]})
	
	}
}

