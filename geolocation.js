const map = L.map('mapCanvas');

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => locateSuccess(position),
      (error) => locateError(error)
    );
  } else {
    alert("Geolocation is not available.");
  }
}

function locateSuccess(position) {
  console.log(position);
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var accuracy = position.coords.accuracy;
  var radius = accuracy / 2;

  var locationInfo = "Latitude: " + latitude + "<br>Longitude: " + longitude + "<br>Accuracy: " + accuracy + " meters";
  console.log(locationInfo);

  map.setView([latitude, longitude], 20);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([latitude, longitude]).addTo(map)
    .bindPopup('You are within ' + radius + ' meters from this point')
    .openPopup();

  L.circle([latitude, longitude], radius).addTo(map);
}

function locateError(error) {
  alert("Error getting location:", error.message);
}