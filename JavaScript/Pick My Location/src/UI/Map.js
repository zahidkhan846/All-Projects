class Map {
  constructor(coordinates) {
    this.render(coordinates);
  }

  render(coordinates) {
    if (!google) return;
    const map = new google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 16,
    });

    new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  }
}

export default Map;
