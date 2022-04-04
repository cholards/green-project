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

//Define charging locations at Reading

const chargingLocations = [
    { coord: { lat: 51.4533, lng: -0.9634 }, content: 'Station-A' },
    { coord: { lat: 51.3838, lng: -1.1533 }, content: 'Station-B' },
    { coord: { lat: 51.317, lng: -0.860 }, content: 'Station-C' },
    { coord: { lat: 51.4281, lng: -0.8794 }, content: 'Station-D' },
];

let markers = [];
let map;

// Render the map and markers






let currentTripInfo = JSON.parse(localStorage.getItem("currentTrip"));
let koko = currentTripInfo.origin


function initMap() {



    let domicile = { lat: 51.3033, lng: -0.9634 };
    let origin = { lat: 51.3033, lng: -1.9834 };
    let waypoints = [];
    var destination = { lat: 51.4768, lng: -1.660 };

    let currentTrip = {
        domicile: domicile,
        waypoints: waypoints,
        origin: origin,
        destination: destination,
    };

    // LOCATION LOCAL Storage 


    function locations() {


        let currentTripSerialized = JSON.stringify(currentTrip);
        localStorage.setItem("currentTrip", currentTripSerialized);
        let currentTripInfo = JSON.parse(localStorage.getItem("currentTrip"));
    }

    if (domicile) {
        locations()
        let currentTripInfo = JSON.parse(localStorage.getItem("currentTrip"));


    } else {
        document.log("NO USER INFO");
    }


    map = new google.maps.Map(document.getElementById("map"), {
        // Set map center at Reading
        center: domicile,
        zoom: 8,

    })

    // waypoints = [
    // { location: { lat: 51.4281, lng: -0.8794 } }
    // ]


    // Truck Constructor
    let truck = new google.maps.Marker({
        position: koko,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: "/assets/img/bicycle-icon.png",
        draggable: true,
    });

    // Destination Constructor
    let destMarker = new google.maps.Marker({
        position: currentTripInfo.destination,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: "/assets/img/bicycle-icon.png",
        draggable: true,
    });



    document.getElementById("setOrigin").addEventListener("click", setOrigin);

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
        kols = `{ lat:${lat}, lng:${lng} }`
        localStorage.setItem("original", kols)

    }



    console.log(JSON.parse(localStorage.getItem("origin")));

    function displayRoute(origin, destination, service, display, waypoints) {
        service
            .route({
                origin: origin,
                destination: destination,
                waypoints: waypoints,

                travelMode: google.maps.TravelMode.DRIVING,
                avoidTolls: true,
            })
            .then((result) => {
                display.setDirections(result);
            })
            .catch((e) => {
                alert("Could not display directions due to: " + e);
            });





    }
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map,
    });

    directionsRenderer.addListener("directions_changed", () => {
        const directions = directionsRenderer.getDirections();

    });
    displayRoute(origin, currentTripInfo.destination, directionsService, directionsRenderer, currentTripInfo.waypoints);
}