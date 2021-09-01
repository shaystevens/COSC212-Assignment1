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

    function dogDescription(data){
        let dogArray = data.animals.dogs;
        let x, i, newTag, newText;
        for(x=0; x < dogArray.length; x++){
            let tag = $('.card-back')[x];
            for(i=0; i < dogArray.length-1; i++){
                newTag = document.createElement("p");

                if(i === 0){
                    newText = document.createTextNode("Name: " + dogArray[x].dogName);
                    newTag.appendChild(newText);
                    tag.append(newTag);
                }

                if(i === 1){
                    newText = document.createTextNode("Breed: " + dogArray[x].dogType);
                    newTag.appendChild(newText);
                    tag.append(newTag);
                }

                if(i === 2){
                    newText = document.createTextNode("Size: " + dogArray[x].dogSize);
                    newTag.appendChild(newText);
                    tag.append(newTag);
                }

                if(i === 3){
                    newText = document.createTextNode("About me: ");
                    let breakTag = document.createElement("p");
                    let newLine = document.createTextNode(dogArray[x].description);
                    breakTag.appendChild(newLine);
                    newTag.appendChild(newText);
                    tag.append(newTag);
                    tag.append(breakTag);
                }
                if(i === 4){
                    newText = document.createTextNode("Price: $" + dogArray[x].pricePerHour + " (per hour)");
                    newTag.appendChild(newText);
                    tag.append(newTag);
                }
            }
       }
    }

    pub.setup = function(){
        let jsonFile = "animals.json";
        let dogArray = $("#dogs").find("img");
        let array = $(".card-back");
        let i;
        for(i = 0; i < dogArray.length; i++){
            dogArray[i].style.cursor = "pointer";
            array[i].style.cursor = "pointer";
            dogArray[i].addEventListener("click", rotate);
            array[i].addEventListener("click", rotate);
        }

        $.ajax({
            type: "GET",
            url: jsonFile,
            cache: false,
            success: function(data) {
                dogDescription(data);
            }
        });

    };

    return pub;

}());
$(document).ready(dogs.setup);