let reviews = (function(){
    "use strict";
    let pub = {};

    function displayReviews(data){
        let i, titleTag, authorTag, reviewTag, titleText, authorText, reviewText;
        let tag = $("#reviewMain")[0]
        for(i = 0; i < data.length; i++){
            titleTag = document.createElement("h3");
            titleText = document.createTextNode(data[i].title);
            authorTag = document.createElement("p");
            authorText = document.createTextNode("Author: " + data[i].author)
            reviewTag = document.createElement("p");
            reviewText = document.createTextNode(data[i].reviewcontent);
            titleTag.appendChild(titleText);
            titleTag.classList.add('review-header');
            authorTag.appendChild(authorText);
            authorTag.classList.add('review-author');
            reviewTag.appendChild(reviewText);
            reviewTag.classList.add('review-description');
            tag.append(titleTag);
            tag.append(authorTag);
            tag.append(reviewTag);
        }
        /*
        let x, i, newTag, newText;
        for(x=0; x < dogArray.length; x++){
            let tag = $('.card-back')[x];
            for(i=0; i < dogArray.length-1; i++){
                newTag = document.createElement("p");

                if(i === 0){
                    newText = document.createTextNode("Name: " + dogArray[x].dogName);
                }

                if(i === 1){
                    newText = document.createTextNode("Breed: " + dogArray[x].dogType);
                }

                if(i === 2){
                    newText = document.createTextNode("Size: " + dogArray[x].dogSize);
                }

                if(i === 3){
                    newText = document.createTextNode(dogArray[x].description);
                }
                if(i === 4){
                    newText = document.createTextNode("Price: $" + dogArray[x].pricePerHour + " (per hour)");
                }
                newTag.appendChild(newText);
                tag.append(newTag);
            }
        }*/
    }

    pub.setup = function(){
        let jsonFile = "reviews.json";

        $.ajax({
            type: "GET",
            url: jsonFile,
            cache: false,
            success: function(data) {
                displayReviews(data);
            }
        });
    };

    return pub;

}());
$(document).ready(reviews.setup);