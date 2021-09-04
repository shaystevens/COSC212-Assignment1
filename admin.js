let admin = (function(){
    "use strict";
    let pub = {};
    let jsonFile = "bookings.json";

    function displayBookings(data){
        let i;
        let tag = $('#adminMain')[0];
        let bookings = data.bookings.booking;
        for(i=0; i < bookings.length; i++){
            let bookingTag, bookingText, bookingName, nameText, bookingPickup, pickupText, j, dogIdTag, dogIdText, numHours, numHoursText;
            bookingTag = document.createElement('h3');
            bookingText = document.createTextNode('Booking' + ' ' + (i+1) + '');
            bookingTag.append(bookingText);
            bookingTag.classList.add('review-header');
            tag.append(bookingTag);

            bookingName = document.createElement('p');
            nameText = document.createTextNode(bookings[i].name);
            bookingName.append(nameText);
            bookingName.classList.add('review-header');
            bookingName.style.fontSize = '25px';
            bookingName.style.marginLeft = '40px';
            tag.append(bookingName);

            dogIdTag = document.createElement('p');
            if(bookings[i].dogId.length > 1){
                dogIdTag.append('Dogs: ');
            }else{
                dogIdTag.append('Dog: ');
            }
            for(j=0; j < bookings[i].dogId.length; j++){
                dogIdText = document.createTextNode(bookings[i].dogId[j] + " ");
                dogIdTag.append(dogIdText);
            }
            dogIdTag.style.fontSize = '25px';
            dogIdTag.style.marginLeft = '40px';
            tag.append(dogIdTag);

            bookingPickup = document.createElement('p');
            pickupText = document.createTextNode("Pickup date: " + bookings[i].pickup.day + "/"
                + bookings[i].pickup.month + "/" + bookings[i].pickup.year + ' at ' + bookings[i].pickup.time);
            bookingPickup.append(pickupText);
            bookingPickup.style.fontSize = '25px';
            bookingPickup.style.marginLeft = '40px';
            tag.append(bookingPickup);

            numHours = document.createElement('p');
            numHoursText = document.createTextNode('Number of hours: ' + bookings[i].numHours);
            numHours.append(numHoursText);
            numHours.style.fontSize = '25px';
            numHours.style.marginLeft = '40px';
            tag.append(numHours);
        }

    }

    pub.setup = function(){
        $.ajax({
            type: "GET",
            url: jsonFile,
            cache: false,
            success: function(data) {
                displayBookings(data);
            }
        });
    };

    return pub;

}());
$(document).ready(admin.setup);