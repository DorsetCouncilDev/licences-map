function sortByDate() {
    licences.sort(function (a, b) {
        var aDate = parseDate(a.endDate);
        var bDate = parseDate(b.endDate);
        if (aDate < bDate)
            return -1;
        if (aDate > bDate)
            return 1;
        else
            return 0;
    })
    for (var index = 0; index < licences.length; index++) {
        licences[index].index = index;
    }
}

function sortByType() {
    licences.sort(function (a, b) {
        if (a.licence.description < b.licence.description)
            return -1;
        if (a.licence.description > b.licence.description)
            return 1;
        else
            return 0;
    })
      for (var index = 0; index < licences.length; index++) {
        licences[index].index = index;
    }
}


function sortByDistance() {
    licences.sort(function (a, b) {
        var aDistance = distance(a.latitude, a.longitude, 50.563110932545825, -2.4489365380248693, 'N');
        var bDistance = distance(b.latitude, b.longitude, 50.563110932545825, -2.4489365380248693, 'N');

        if (aDistance < bDistance)
            return -1;
        if (aDistance > bDistance)
            return 1;
        else
            return 0;
    })
      for (var index = 0; index < licences.length; index++) {
        licences[index].index = index;
    }
}

// Distance between two latLongs in JS. possibly do this better in Java?
function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
        dist = dist * 1.609344
    }
    if (unit == "N") {
        dist = dist * 0.8684
    }
    return dist
}
