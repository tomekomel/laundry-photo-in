class ViewGalleriesMap {
  constructor(galleries = []) {
    this.markerIcon =
      window.location.protocol +
      '//' +
      window.location.host +
      '/images/placeholder.png';
    this.position = { lat: 53.13, lng: 23.16 };
    this.mapOptions = {
      zoom: 10,
      center: this.position,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    };

    this.map = new google.maps.Map(
      document.getElementById('map'),
      this.mapOptions,
    );
    this.galleries = galleries;
  }

  display() {
    this.createMarkers(this.map, this.galleries, this.markerIcon);
  }

  createMarkers(map, galleries, markerIcon) {
    const galleriesWithMarkers = galleries.map(gallery => {
      if (gallery.latitude && gallery.longitude) {
        return {
          ...gallery,
          marker: new google.maps.Marker({
            position: { lat: gallery.latitude, lng: gallery.longitude },
            map,
            icon: markerIcon,
          })
        }
      }
    }).filter(Boolean);
    console.log(galleriesWithMarkers);
  }
}
