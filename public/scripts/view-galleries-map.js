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
    const galleriesWithMarkers = this.createMarkers(
      this.map,
      this.galleries,
      this.markerIcon,
    );
    this.adjustMapToGalleriesMarkers(this.map, galleriesWithMarkers);
  }

  createMarkers(map, galleries, markerIcon) {
    const galleriesWithMarkers = galleries
      .map((gallery) => {
        if (gallery.latitude && gallery.longitude) {
          return {
            ...gallery,
            marker: new google.maps.Marker({
              position: { lat: gallery.latitude, lng: gallery.longitude },
              map,
              icon: markerIcon,
            }),
          };
        }
      })
      .filter(Boolean);

    galleriesWithMarkers.map((gallery) => {
      const infoWindow = new google.maps.InfoWindow({
        content: `<h5>${gallery.title}</h5>
            <img src="../uploads/100x100/${gallery.photo}" alt="${gallery.title}" />
        `,
      });
      gallery.marker.addListener('click', () => {
        infoWindow.open(map, gallery.marker);
      });
    });

    return galleriesWithMarkers;
  }

  adjustMapToGalleriesMarkers(map, galleries) {
    const bounds = new google.maps.LatLngBounds();
    galleries.map((gallery) => {
      bounds.extend(
        new google.maps.LatLng(gallery.latitude, gallery.longitude),
      );
    });
    map.fitBounds(bounds);
  }
}
