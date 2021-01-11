let map;
const markerIcon =
  window.location.protocol +
  '//' +
  window.location.host +
  '/images/placeholder.png';
const defaultPosition = { lat: 53.13, lng: 23.16 };
const mapOptions = {
  zoom: 8,
  center: defaultPosition,
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  localizeMap(map);
  createMarker(map);
}

function createMarker(map) {
  const marker = new google.maps.Marker({
    position: defaultPosition,
    map,
    icon: markerIcon,
    draggable: true,
  });

  map.addListener('click', (mapsMouseEvent) => {
    marker.setPosition(mapsMouseEvent.latLng);
    updateTextFields(mapsMouseEvent.latLng);
  });

  google.maps.event.addListener(marker, 'dragend', (mapsMouseEvent) => {
    marker.setPosition(mapsMouseEvent.latLng);
    updateTextFields(mapsMouseEvent.latLng);
  });
}

function updateTextFields(location) {
  document.getElementById('latitude').value = location.lat();
  document.getElementById('longitude').value = location.lng();
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
