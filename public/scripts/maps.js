let map;
const markerIcon =
  window.location.protocol +
  '//' +
  window.location.host +
  '/images/placeholder.png';

function initMap() {
  const mapOptions = {
    zoom: 8,
    center: { lat: 53.13, lng: 23.16 },
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  localizeMap(map);

  const marker = new google.maps.Marker({
    position: { lat: 53.13, lng: 23.16 },
    map,
    icon: markerIcon,
  });

  map.addListener('click', (mapsMouseEvent) => {
    marker.setPosition(mapsMouseEvent.latLng);
  });
}

function localizeMap(map) {
  let infoWindow = new google.maps.InfoWindow();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        infoWindow.setPosition(pos);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      },
    );
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow.open(map);
}
