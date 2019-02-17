function find() {
	var lnglat = document.getElementById('lnglat').value;
	var find = document.getElementById('find');
	var locationError = document.getElementById('locationError');

	mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWVsZG9taW5pYyIsImEiOiJjanMzZWo1cGYwZmp6NGF0OXY3NW42b2YwIn0.y3wxPCbMm_svJBcOcMaumQ';
	var map = new mapboxgl.Map({
	    container: 'map',
	    style: 'mapbox://styles/mapbox/streets-v9',
	    center: [0,0],
	    zoom: 9 
	});

	if (lnglat==='') {
		locationError.innerHTML = 'No location inserted'
		window.setTimeout(function () {
              locationError.style.display = 'none';
            }, 2000);
	}
	// else if (lnglat==='LngLat instance') {
	// 	locationError.innerHTML = 'No location inserted'
	// 	window.setTimeout(function () {
 //              locationError.style.display = 'none';
 //            }, 2000);
	// }
	else{
	    document.getElementById('info').innerHTML = 'copyright@ManuelDominic';
	    var marker = new mapboxgl.Marker()
		.setLngLat([lnglat])
		.addTo(map);
	}
	     
};