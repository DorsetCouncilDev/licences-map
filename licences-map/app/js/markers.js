function createMarker(map, licence) {

    var location = licence.latitude = licence.licence.latitude;

    var icon = getLicenceIcon(licence);

    var infoWindow = createInfoWindow(licence, licence.selected);

    var marker = new google.maps.Marker({
        position: {
            lat: licence.licence.latitude,
            lng: licence.licence.longitude
        },

        map: map,
        title: "pin",
        index: licence.index,
        infoWindow: infoWindow,
        icon: icon

    })

    if (licence.selected) {
        marker.setIcon(icon);
        currentMarker = marker;
    }
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
        if (!licence.selected)
            setSelectedLicence(marker.index, false)
    });
    markers.push(marker);
    return marker;
}

function createMarkers() {
    if(markerCluster != null){
        console.log("before clearing clusters");
        console.log(markerCluster.getMarkers());
        console.log("map markers");
        console.log("***********************************")
        console.log(markers);
        console.log("***********************************")
        //markerCluster.clearMarkers();
        console.log("after clearing clusters");
        console.log(markerCluster.getMarkers());
          console.log("map markers");
        console.log(markers);
    }
        
    clearMarkers();
    for (l in licences)
        createMarker(map, licences[l])

    var infoWindowCrosses = document.getElementsByClassName("gm-ui-hover-effect");
    for (var i = 0; i < infoWindowCrosses.length; i++) {
        var img = infoWindowCrosses[i].children[0].style("width:50px;height:50px;")
    }
 if(markerCluster == null){
     console.log("markerCluster null")
     markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
 }
    else{
        console.log("adding sorter markers to cluster");
        markerCluster.addMarkers(markers);
        console.log("after setting markers");
        console.log(markerCluster.getMarkers());
    }

}

function clearMarkers() {
    for (m in markers) {
        markers[m].setMap(null);
        markers[m] = null;
    }
    totalMarkers = 0;
    markers = [];
    markers.length = 0;
}

function createInfoWindow(licenceItem) {
    var contentString = "<p>" + licenceItem.licence.description + "</p>";
    contentString += "<p><span style=\"font-weight:bolder\">Start: </span>" + licenceItem.startDate + "</p>";
    contentString += "<p><span style=\"font-weight:bolder\">End: </span>" + licenceItem.endDate + "</p>";
    if (licenceItem.licence.confirmStatus == '1020')
        contentString += "<p style=\"font-weight:bolder\">EXTENSION SUBMITTED</p>";

    return new google.maps.InfoWindow({
        content: contentString
    });
}

function getLicenceIcon(licence, selected) {
    console.log("getLicenceIcon called")

    var licenceTypeCodeText;
    if (licence.type == 'Skip')
        licenceTypeCodeText = 'sk';
    else if (licence.type == 'Scaffold')
        licenceTypeCodeText = 'sc';
    else if (licence.type == 'Building Materials')
        licenceTypeCodeText = 'bm';
    else if (licence.type == 'Hoarding')
        licenceTypeCodeText = 'h'

    console.log("no type found")


    var iconUrl;
    if (selected) {
        iconUrl = 'https://dcctest.dorsetforyou.gov.uk/licences/admin/images/' 
                    + licenceTypeCodeText 
                    + '-' 
                    + licence.currentEndDatePriority.toLowerCase() 
                    + '-selected.png';
        return {url: iconUrl,scaledSize: new google.maps.Size(40, 65)};
    } else {
        iconUrl = 'https://dcctest.dorsetforyou.gov.uk/licences/admin/images/' 
                    + licenceTypeCodeText 
                    + '-' 
                    + licence.currentEndDatePriority.toLowerCase() 
                    + '.png';
        return {url: iconUrl,scaledSize: new google.maps.Size(30, 50)};
    }
    
}
