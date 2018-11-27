var licences = [];
var markers = [];
var map, googleMaps,userMarker;
 var markerCluster;
// AIzaSyCE_puCN1s2fEmjSpNjf8FmbhQVkhr0GdM   apptest
// AIzaSyAVLqUxdgLoBovYi83r-2YZNgvZFlsJR2g   localhost

var _axios = axios.create({
    
 baseURL: 'http://localhost:8080/licences/admin/rest/licences',
 // baseURL: 'https://dcctest.dorsetforyou.gov.uk/licences/admin/rest/licences',
    timeout: 10000
});
var selectedIcon;
var currentMarker;
function initMap() {
    currentMarker = null;
    googleMaps = google;
    _axios.get().then(function (response) {   
            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 50.563110932545825,
                    lng: -2.4489365380248693
                },
                zoom: 9
            });
        
        var noPoi = [
{
    featureType: "poi",
    stylers: [
      { visibility: "off" }
    ]   
  }
];

map.setOptions({styles: noPoi});
        
            licences = response.data.licenceItems;
          for (var index = 0; index < licences.length; index++) {
        licences[index].index = index;
    }
            setUserLocation(false);
            insertAllLicencesIntoList();
            createMarkers();
        
      

        }).catch(function (error) {
            console.log(error);
        })
        .then(function () {

        });
    var sortByDateOption = document.getElementById("endDate");
    sortByDateOption.addEventListener("click",function(){
     sortByDate();
        clearLicenceList();
        insertAllLicencesIntoList()
        createMarkers();
})

   var sortByDateOption = document.getElementById("type");
    sortByDateOption.addEventListener("click",function(){
        sortByType();
        clearLicenceList();
        insertAllLicencesIntoList()
        createMarkers();
    })
/*
    var sortByLocationOption = document.getElementById("location");
    sortByLocationOption.addEventListener("click",function(){
        sortByDistance();
        clearLicenceList();
        insertAllLicencesIntoList()
        createMarkers();
    })
*/
 var locate_me_button =  document.getElementById("locateMeBtn");
   locate_me_button.addEventListener("click",function(){

       setUserLocation(true);
        map.setZoom(18);
       
   })
 
}

function parseDate(dateString) {
    var dSplit = dateString.split("/");
    return new Date(dSplit[2], dSplit[1], dSplit[0]);
}

function setSelectedLicence(index,zoom) {
    var licenceListItems = document.getElementById("licencesList").children;
    if (currentMarker != null) {
        currentMarker.setIcon(getLicenceIcon(licences[currentMarker.index],false));
        currentMarker.infoWindow.close();
        licenceListItems[currentMarker.index].classList.remove("selected");
        licences[currentMarker.index].selected = false;
    }
    markers[index].setIcon(getLicenceIcon(licences[index],true));
    licenceListItems[index].classList.add("selected");
    currentMarker = markers[index];
    licences[index].selected = true;
    
    if(zoom){
        centreMap(licences[index].licence);
        map.setZoom(18);
    }
    
    var listItemSelected = document.querySelectorAll("[data-index='" + index + "']");
    listItemSelected[0].focus();
}

function clearLicenceList() {
    var licenceList = document.getElementById("licencesList");
    clearInner(licenceList);
}

function insertAllLicencesIntoList() {
    for (l in licences){
        insertLicenceIntoList(l)
    }
}

function centreMap(licence) {
    //var coords = // convertCoordinates(licence.northing, licence.easting);
    var centre = new google.maps.LatLng(licence.latitude, licence.longitude);
    map.panTo(centre);
}
