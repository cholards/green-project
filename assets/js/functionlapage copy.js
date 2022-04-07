// Get cuurent logged in user credentials from storage
let loggedinUserInfo = JSON.parse(localStorage.getItem("currentUser"));

// Reset all to defalts
var restToDefaults = document.getElementById("reset")
restToDefaults.addEventListener('click', backToDefaults);

function backToDefaults() {
    location.reload();
}


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


let domicile = { lat: 51.3033, lng: -1.9634 };
let origin = { lat: 51.55090820284132, lng: -1.8889 };
let waypoints = [{ lat: 51.75090820284132, lng: -1.2577 }];
var destination = { lat: 51.4768, lng: -1.660000 };

let currentTrip = {
    domicile: domicile,
    waypoints: waypoints,
    origin: origin,
    destination: destination,

};

function locations() {
    let currentTripSerialized = JSON.stringify(currentTrip);
    localStorage.setItem("currentTrip", currentTripSerialized);
    let currentTripInfo = JSON.parse(localStorage.getItem("currentTrip"));
}

locations()



//Define charging locations at Reading

const chargingLocations = [
    { coord: { lat: 51.4533, lng: -0.9634 }, content: 'Station-A' },
    { coord: { lat: 51.3838, lng: -1.1533 }, content: 'Station-B' },
    { coord: { lat: 51.317, lng: -0.860 }, content: 'Station-C' },
    { coord: { lat: 51.4281, lng: -0.8794 }, content: 'Station-D' },
];

let markers = [];
let map;

// pull stored info for use on the map

let currentTripInfo = JSON.parse(localStorage.getItem("currentTrip"));

function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {


        center: currentTripInfo.domicile,
        zoom: 9,

    })



    // Truck Constructor
    let truck = new google.maps.Marker({
        position: currentTripInfo.origin,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: "./assets/img/bicycle1.png",
        draggable: true,
    });

    // Destination Constructor
    let destMarker = new google.maps.Marker({
        position: currentTripInfo.destination,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: "./assets/img/bicycle2.png",
        draggable: true,
    });


    // Destination Constructor
    let bicycle3 = new google.maps.Marker({
        position: currentTripInfo.waypoints[0],
        map: map,
        animation: google.maps.Animation.DROP,
        icon: "./assets/img/bicycle3.png",
        draggable: true,
    });


    let displaytesta = () => {
        let nuorigin = document.getElementById("testa").innerHTML
    }


    document.getElementById("setOrigin").addEventListener("click", displaytesta);

    function setOrigin() {
        var lat = truck.getPosition().lat();
        var lng = truck.getPosition().lng();
        kols = `{ lat::${lat}, lng:${lng} }`
        localStorage.setItem("origin", kols);
    }




    // set event listener to make marker bounce on click
    truck.addListener("click", toggleBounce);
    truck.addListener("click", openTruckInfo);

    var truckInfoWindow = new google.maps.InfoWindow({
        content: `Hello <strong> ${loggedinUserInfo.fullName}</strong> <br> Use this icon to set the location where your journey begins on the map. We are currently working on a new feature that will let the app auto-locate your current possition by automatically pick your GPS coordinates. <br><br><strong><small>Feel free to drag the icon around</small></strong>`
    })

    function openTruckInfo() {
        truckInfoWindow.open(map, truck)
    }

    function toggleBounce() {
        if (truck.getAnimation() !== null) {
            truck.setAnimation(null);
        } else {
            truck.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    // Toggle Charging Stations
    var showChrg = document.getElementById('showChrg')
    document.getElementById("toggleChargingStations").addEventListener("click", drop);

    function drop() {

        if (showChrg.innerHTML == "") {
            for (let i = 0; i < chargingLocations.length; i++) {
                addMarkerWithTimeout(chargingLocations[i].coord, chargingLocations[i].content, i * 300);
            }
        } else {
            clearChargingStaions();
        }
    }

    function addMarkerWithTimeout(position, content, timeout) {
        window.setTimeout(() => {
            markers.push(
                new google.maps.Marker({
                    position: position,
                    map,
                    InfoWindow: content,
                    animation: google.maps.Animation.DROP,
                })
            );
        }, timeout);
        srcInfo.innerHTML = "Now Showing Charging Stations";
    }

    // Clear Charging Satations

    function clearChargingStaions() {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
            showChrg.innerHTML = ""
        }

        markers = [];
    }


    google.maps.event.addListener(truck, 'position_changed', showLoc);

    function showLoc() {
        var lat = truck.getPosition().lat();
        var lng = truck.getPosition().lng();
        kols = `{ lat: ${lat}, lng: ${lng} }`
        localStorage.setItem("original", kols)

        let testa = document.getElementById('testa')
        testa.value = kols;
    }



    // DIRECTION SERVICE
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    calculateAndDisplayRoute(directionsService, directionsRenderer);

    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
        const selectedMode = "DRIVING";

        directionsService
            .route({
                origin: currentTripInfo.origin,
                destination: currentTripInfo.destination,
                // Note that Javascript allows us to access the constant
                // using square brackets and a string value as its
                // "property."
                travelMode: google.maps.TravelMode[selectedMode],
            })
            .then((response) => {
                directionsRenderer.setDirections(response);
            })
            .catch((e) => window.alert("Directions request failed due to " + status));


    }
}