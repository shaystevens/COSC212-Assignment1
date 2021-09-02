let map = (function(){
    "use strict";
    let pub ={};

    function displayPOI(data){
        console.log(data.features[0]);
    }
    pub.setup = function(){
        map = L.map('map').setView([-45.875, 170.500], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { maxZoom: 18, attribution: 'Map data &copy; ' +
                    '<a href="http://www.openstreetmap.org/copyright">' + 'OpenStreetMap contributors</a> CC-BY-SA'
            }).addTo(map);

        let jsonFile = "POI.geojson";

        $.ajax({
            type: "GET",
            url: jsonFile,
            cache: false,
            success: function(data) {
                displayPOI(data);
            }
        });
    };

    return pub;

}());

$(document).ready(map.setup);