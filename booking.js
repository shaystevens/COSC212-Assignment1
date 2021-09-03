let booking = (function(){
    "use strict"
    let pub = {};
    let jsonFile = "animals.json";
    let dogArray;

    function collectData(data){
        dogArray = data.animals.dogs;
    }

    function addDogImageToTable(i){
        let dogImage = $('#dogs').find('img')[i].cloneNode(true);
        let tableTag = document.createElement('td');
        let tableRowTag = $('#imageTable');
        dogImage.style.cursor = 'auto';
        dogImage.border = '1px solid black';
        tableTag.append(dogImage);
        tableRowTag.append(tableTag);
    }

    function showCustomAlert(){
        let customAlert = $('#customAlert')[0];
        customAlert.style.display = "block";
    }

    function hideAlert(){
        let customAlert = $('#customAlert')[0];
        customAlert.style.display = "none";
    }

    function checkLocalStorage(){
        if(localStorage.getItem("dogId") != null){
            let i,tagNum;
            let storageArray = JSON.parse(localStorage.getItem("dogId"));
            let buttonArray = $(".bookingButton");

            for(tagNum = 1; tagNum < 7; tagNum++){
                for(i=0; i < storageArray.length; i++){
                    if(storageArray[i] === 'DW-00' + '' + tagNum + ''){
                        buttonArray[tagNum-1].value = 'Booked!';
                        buttonArray[tagNum-1].disabled = true;
                        $("#bookingForm")[0].style.display = "block";
                        addDogImageToTable(tagNum-1);
                    }
                }
            }
        }
    }

    function addToBooking(){
        if(localStorage.getItem("dogId") == null || JSON.parse(localStorage.getItem("dogId")).length < 3){
            let i;
            let button = $(this)[0];
            let dogId = $(this).siblings()[1].getElementsByClassName('card-back')[0].id;
            for(i = 0; i < dogArray.length; i++){
                if(dogId === dogArray[i].dogName) break;
            }

            if(localStorage.getItem("dogId") != null){
                let storageArray = JSON.parse(localStorage.getItem("dogId"));
                storageArray.push(dogArray[i].dogId);
                localStorage.setItem('dogId', JSON.stringify(storageArray));
            }else{
                localStorage.setItem('dogId', JSON.stringify([dogArray[i].dogId]));
            }
            button.value = "Booked!";
            button.disabled = true;
            $("#bookingForm")[0].style.display = "block";
            addDogImageToTable(i)
        }else{
            showCustomAlert();
        }
    }

    pub.setup = function (){
        $('#closeButton').click(hideAlert);
        $.ajax({
            type: "GET",
            url: jsonFile,
            cache: false,
            success: function(data) {
                collectData(data);
            }
        });
        checkLocalStorage();
        $(".bookingButton").click(addToBooking);
    }
    return pub;
}());
$(document).ready(booking.setup);