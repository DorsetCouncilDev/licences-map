

function setUserLocation(panToUser) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
         var personIcon = {url: "images/person.png", scaledSize: new google.maps.Size(50, 50) };
            
            if(userMarker == null){
                userMarker = new googleMaps.maps.Marker({
                    position: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                    icon: personIcon,
                    map: map,
                    title: "pin",
                })
            }
            else{
                userMarker.setPosition(position.coords.latitude, position.coords.longitude);            
            }
            console.log("pos: " + position.coords.latitude + " - " + position.coords.longitude);
            
            if(panToUser){
                var centre = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.panTo(centre);
                map.setZoom(18);
            }
        });
    } 
}
