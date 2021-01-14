class ViewGalleryMap {
  constructor(latitude = 53.13, longitude = 23.16) {
    this.markerIcon =
      window.location.protocol +
      '//' +
      window.location.host +
      '/images/placeholder.png';
    this.position = { lat: latitude, lng: longitude };
    this.mapOptions = {
      zoom: 10,
      center: this.position,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    };

    this.map = new google.maps.Map(document.getElementById('map'), this.mapOptions);
  }

  display() {
    this.createMarker(this.map);
  }

  createMarker(map) {
    const marker = new google.maps.Marker({
      position: this.position,
      map,
      icon: this.markerIcon,
    });

    map.addListener('click', (mapsMouseEvent) => {
    });
  }
}
