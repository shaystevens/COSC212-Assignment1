var dogs = (function(){
    "use strict";
    var pub = {};

    function showDogs(){
        var section = document.createElement("section");
        var dogsJson = $.getJSON( "212Assignment_1_Files/animals.json", function() {
            console.log(dogsJson);

        })

    }

    pub.setup = function(){
        showDogs();
    };

    return pub;

}());
$(document).ready(dogs.setup);