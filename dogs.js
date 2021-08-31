let dogs = (function(){
    "use strict";
    let pub = {};

    function rotate(){
        let card, index;
        let dog_name = $(this).text();
        if(dog_name === "Doge"){
            index = 0;
        }

        if(dog_name === "Akira"){
            index = 1;
        }

        if(dog_name === "Ronnie"){
            index = 2;
        }

        if(dog_name === "Daisy"){
            index = 3;
        }

        if(dog_name === "Ava"){
            index = 4;
        }

        if(dog_name === "Snoopy"){
            index = 5;
        }
        card = $(".card-inner")[index];
        card.classList.toggle('is-flipped');
    }

    pub.setup = function(){
        let dogArray = $("#dogs").find("h4");
        let i;
        for(i = 0; i < dogArray.length; i++){
            dogArray[i].style.cursor = "pointer";
            dogArray[i].addEventListener("click", rotate);
        }

    };

    return pub;

}());
$(document).ready(dogs.setup);