// Get cuurent logged in user credentials from storage
let loggedinUserInfo = JSON.parse(localStorage.getItem("currentUser"));

// check if user is logged to render page. If not, redirect user to login page
if (loggedinUserInfo) {
    let page = document.getElementById("page");
    renderPage()
} else {
    window.location.replace("../index.html");
}

// Render page function
function renderPage() {

    if (loggedinUserInfo) {
        // Grab all DOM elements for profile
        var drvimage = document.getElementById("drvimage");
        var drvname = document.getElementById("drvname");
        var trips = document.getElementById("trips");
        var uniqueIdentity = document.getElementById("uniqueIdentity");




        // Insert drivers details into DOM
        drvimage.src = loggedinUserInfo.imageUrl;
        drvname.innerHTML = "<h3>" + loggedinUserInfo.fullName + "</h3>";
        trips.innerHTML = loggedinUserInfo.trips;
        uniqueIdentity.innerHTML = loggedinUserInfo.uniqueIdentity;

        // Iterate through driver's medals and insert into a list
        for (let i = 0; i < loggedinUserInfo.medals.length; i++) {
            let li = document.createElement('li');
            var medalTxt = document.createTextNode(loggedinUserInfo.medals[i]);
            li.appendChild(medalTxt);
            var medals = document.getElementById("medals").appendChild(li);
        }


    } else {
        "You are not logged-in and cannot view any content on this page"
    }

    var logOutButton = document.getElementById("logout-btn");
    logOutButton.addEventListener("click", clearData);

    function clearData() {
        localStorage.clear();
        window.location.replace("./index.html");
    }
}

//Begining of Map functionality Reading

//Define charging locations at Reading

const neighborhoods = [
    { lat: 51.4533, lng: -0.9634 },
    { lat: 51.3838, lng: -1.1533 },
    { lat: 51.317, lng: -0.860 },
    { lat: 51.4281, lng: -0.8794 },
];

let markers = [];
let map;

// Render the map and markers

function initMap() {
    const reading = { lat: 51.3033, lng: -0.9634 },
        map = new google.maps.Map(document.getElementById("map"), {
            // Set map center at Reading
            center: reading,
            zoom: 11,
        })

    document.getElementById("toggleChargingStations").addEventListener("click", drop);

    // Set marker custom image to biycle
    const image = "/assets/img/bicycle-icon.png";


    const marker = new google.maps.Marker({
        // The marker positioned at Reading
        position: reading,
        map: map,
        // Set martker animation
        // animation: google.maps.Animation.DROP,
        icon: image,
        draggable: true,
    });



    const marker2 = new google.maps.Marker({
        // The marker positioned at Reading
        position: { lat: 51.3405, lng: -0.8794 },
        map: map,
        // Set martker animation
        animation: google.maps.Animation.DROP,
        icon: image,
        draggable: true,
    });




    // set event listener to make marker bounce on click
    marker.addListener("click", toggleBounce);

    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    function drop() {
        clearMarkers();
        for (let i = 0; i < neighborhoods.length; i++) {
            addMarkerWithTimeout(neighborhoods[i], i * 200);
        }
    }

    function addMarkerWithTimeout(position, timeout) {
        window.setTimeout(() => {
            markers.push(
                new google.maps.Marker({
                    position: position,
                    map,
                    animation: google.maps.Animation.DROP,
                })
            );
        }, timeout);
    }

    function clearMarkers() {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }

        markers = [];
    }

}