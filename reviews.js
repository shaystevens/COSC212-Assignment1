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