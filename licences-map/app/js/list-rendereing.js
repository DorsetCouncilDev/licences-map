function insertLicenceIntoList(index) {

    var licenceItem = licences[index];
    var licenceList = document.getElementById("licencesList");

    var listItem = document.createElement("li");
    listItem.setAttribute("tabindex", -1);
    var coreLicenceDetails = document.createElement("div");

    coreLicenceDetails.classList.add("licence-core-details");

    listItem.classList.add("list-group-item");
    listItem.classList.add("licence-list-item");



    var typeSection = document.createElement("div");
    var locationSection = document.createElement("div");
    var dateSection = document.createElement("div");

    if (licenceItem.currentEndDatePriority == "GREEN")
        listItem.classList.add("green");
    else if (licenceItem.currentEndDatePriority == "YELLOW")
         listItem.classList.add("yellow");
    else
         listItem.classList.add("red");
    
    var customerSection = document.createElement("div");
    customerSection.classList.add("customer-section");
    customerSection.innerHTML = licenceItem.customerName + ", " + licenceItem.customerOrganisation + ", " + licenceItem.customerContact;
    typeSection.classList.add("type-section");
    locationSection.classList.add("location-section");
    dateSection.classList.add("date-section");
    var indexDisplay = index;
    indexDisplay++;
    locationSection.innerHTML = licences[index].licence.location;

    typeSection.innerHTML = licences[index].type;
    dateSection.innerHTML = licences[index].endDate;
    coreLicenceDetails.appendChild(typeSection);
    coreLicenceDetails.appendChild(locationSection);

    coreLicenceDetails.appendChild(customerSection);
    coreLicenceDetails.appendChild(dateSection);
    listItem.dataset.index = l;
    coreLicenceDetails.dataset.index = l;
    typeSection.dataset.index = l;
    locationSection.dataset.index = l;
    dateSection.dataset.index = l;

    listItem.appendChild(coreLicenceDetails);
    if (licences[index].licence.confirmStatus == '1020') {
        var extNotice = document.createElement("div");
        extNotice.classList.add("ext-notice");
        extNotice.innerHTML = "An extension has been applied for this licence";
        listItem.appendChild(extNotice);
    }

    //listItem.appendChild(customerSection);

    if (licences[index].selected)
        listItem.classList.add("selected");

    licenceList.appendChild(listItem);

    listItem.addEventListener("click", function (e) {
        var index = e.target.parentElement.parentElement.dataset.index;
        if (!licences[index].selected)
            setSelectedLicence(index, true);
    })
    coreLicenceDetails.addEventListener("click", function (e) {
        var index = e.target.parentElement.parentElement.dataset.index;
        setSelectedLicence(index, true);
    })
    locationSection.addEventListener("click", function (e) {
        var index = e.target.parentElement.parentElement.dataset.index;
        setSelectedLicence(index, true);
    })
}
