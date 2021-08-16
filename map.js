var map = (function(){
    "use strict";
    var pub ={};
    pub.setup = function(){
        map = L.map('map').setView([-45.875, 170.500], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { maxZoom: 18, attribution: 'Map data &copy; ' +
                    '<a href="http://www.openstreetmap.org/copyright">' + 'OpenStreetMap contributors</a> CC-BY-SA'
            }).addTo(map);

    };

    return pub;

}());

$(document).ready(map.setup);