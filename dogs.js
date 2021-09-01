let dogs = (function(){
    "use strict";
    let pub = {};

    function rotate(){
        let card;
        if($(this).hasClass('card-back')){
            card = $(this).parent()[0];
        }else{
            card = $(this).parent().parent()[0];
        }
        card.classList.toggle('is-flipped');
    }

    pub.setup = function(){
        let dogArray = $("#dogs").find("img");
        let array = $(".card-back");
        let i;
        for(i = 0; i < dogArray.length; i++){
            dogArray[i].style.cursor = "pointer";
            array[i].style.cursor = "pointer";
            dogArray[i].addEventListener("click", rotate);
            array[i].addEventListener("click", rotate);
        }

    };

    return pub;

}());
$(document).ready(dogs.setup);