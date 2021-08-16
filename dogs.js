var dogs = (function(){
    "use strict";
    var pub = {};

    function showDogs() {
        var keys;
        fetch('animals.json').then(function(response){
            return response.json();
        }).then(function (obj){
            keys = Object.keys(obj);
            console.log(keys[0]);
        });
    }

    pub.setup = function(){
        showDogs();
    };

    return pub;

}());
$(document).ready(dogs.setup);