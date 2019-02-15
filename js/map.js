mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWVsZG9taW5pYyIsImEiOiJjanMzZWo1cGYwZmp6NGF0OXY3NW42b2YwIn0.y3wxPCbMm_svJBcOcMaumQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [32.57505249978601,0.3206802144422909],
    zoom: 9 
});
var marker = new mapboxgl.Marker()
.setLngLat([0, 0])
.addTo(map);

map.on('click', function (e) {
     document.getElementById('info').innerHTML = 'copyright@ManuelDominic';
     document.getElementById('long').value = JSON.stringify(e.lngLat['lng']);
     document.getElementById('lat').value = JSON.stringify(e.lngLat['lat']);
      marker.setLngLat(e.lngLat);
    });