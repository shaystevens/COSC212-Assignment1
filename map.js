let map = (function(){
    "use strict";
    let pub ={};
    let jsonFile = "POI.geojson";
    let parkArray = [];
    let trackArray = [];

    let redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    let yellowIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    let blueIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    function showHide(){
        let i;
        let parkButton = $('#parkButton')[0];
        let trackButton = $('#trackButton')[0];
        if($(this)[0] === parkButton){
            let parkLocations = $(".park-locations");
            for (i = 0; i < parkLocations.length; i++) {
                if (parkLocations[i].style.display === "none") {
                    parkLocations[i].style.display = "block";
                    parkButton.value = "Hide Parks";
                    $.ajax({
                        type: "GET",
                        url: jsonFile,
                        cache: false,
                        success: function(data) {
                            addParkMarkers(data);
                        }
                    });
                } else {
                    parkLocations[i].style.display = "none";
                    parkButton.value = "Show Parks";
                    removeParkMarkers();
                }
            }
        }else{
            let trackLocations = $(".track-locations");
            for (i = 0; i < trackLocations.length; i++) {
                if (trackLocations[i].style.display === "none") {
                    trackLocations[i].style.display = "block";
                    trackButton.value = "Hide Tracks";
                    $.ajax({
                        type: "GET",
                        url: jsonFile,
                        cache: false,
                        success: function(data) {
                            addTrackMarkers(data);
                        }
                    });
                } else {
                    trackLocations[i].style.display = "none";
                    trackButton.value = "Show Tracks";
                    removeTrackMarkers();
                }
            }
        }
    }

    function displayPOI(data){
        let i, locationTag, locationText, parentTag, refTag;
        let dataArray = data.features;
        for(i=0; i < dataArray.length; i++){
            locationTag = document.createElement("p");
            locationText = document.createTextNode(dataArray[i].properties.name);
            locationTag.appendChild(locationText);
            if(i === 0){
                locationTag.classList.add('locations');
            }else if(i > 0 && i < 4){
                locationTag.classList.add('park-locations');
            }else{
                locationTag.classList.add('track-locations')
            }
            parentTag = $("#contactMain")[0];
            refTag = $("#map")[0];
            parentTag.insertBefore(locationTag, refTag);
            locationTag.style.cursor = "pointer";
            locationTag.onclick = centreMap(dataArray[i].geometry.coordinates[1], dataArray[i].geometry.coordinates[0]);
        }
    }

    function centreMap(lat, long) {
        return function () {
            let markerBounds;
            markerBounds = L.latLngBounds([{lat: lat, lng: long}]);
            map.fitBounds(markerBounds);
        };
    }

    function addMarkers(data){
        let i;
        let dataArray = data.features;

        for(i=0; i< dataArray.length; i++){
            addMarker(dataArray[i].properties.color, dataArray[i].geometry.coordinates)
        }
    }

    function addParkMarkers(data){
        let i;
        let dataArray = data.features;

        for(i=1; i< 4; i++){
            addMarker(dataArray[i].properties.color, dataArray[i].geometry.coordinates)
        }
    }

    function addTrackMarkers(data){
        let i;
        let dataArray = data.features;

        for(i=4; i < dataArray.length; i++){
            addMarker(dataArray[i].properties.color, dataArray[i].geometry.coordinates);
        }
    }

    function addMarker(markerColor, coordinates){
        if(markerColor === "#CB2B3E"){
            L.marker([coordinates[1], coordinates[0]], {icon: redIcon}).addTo(map);
        }

        if(markerColor === "#FFD326"){
            parkArray.push(L.marker([coordinates[1], coordinates[0]], {icon: yellowIcon}).addTo(map));

        }

        if(markerColor === "#2A81CB"){
            trackArray.push(L.marker([coordinates[1], coordinates[0]], {icon: blueIcon}).addTo(map));
        }
    }

    function removeParkMarkers(){
        let i;
        for(i=0; i < parkArray.length; i++){
            map.removeLayer(parkArray[i]);
        }
    }

    function removeTrackMarkers(){
        let i;
        for(i=0; i < trackArray.length; i++){
            map.removeLayer(trackArray[i]);
        }
    }

    pub.setup = function(){
        let i, buttons;

        map = L.map('map').setView([-45.881741, 170.534486], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { maxZoom: 18, attribution: 'Map data &copy; ' +
                    '<a href="http://www.openstreetmap.org/copyright">' + 'OpenStreetMap contributors</a> CC-BY-SA'
            }).addTo(map);

        $.ajax({
            type: "GET",
            url: jsonFile,
            cache: false,
            success: function(data) {
                displayPOI(data);
                addMarkers(data);
            }
        });

        buttons = $(".contact-button");
        for(i=0; i < buttons.length; i++){
            buttons[i].onclick = showHide;
        }
    };

    return pub;

}());

$(document).ready(map.setup);