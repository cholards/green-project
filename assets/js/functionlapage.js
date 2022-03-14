console.log("O sishe");

let loggedinUserInfo = JSON.parse(localStorage.getItem("currentUser"));
if (loggedinUserInfo) {
    // var loggedinStatus = document.getElementById("loggedinStatus");
    var drvusername = document.getElementById("drv-username");
    // loggedinStatus.innerHTML = loggedinUserInfo.user;
    drvusername.innerHTML = "<h2>" + loggedinUserInfo.user + "</h2>";
} else {
    "You are not logged-in and cannot view any content on this page"
}
console.log(loggedinUserInfo.user)

var logOutButton = document.getElementById("logout-btn");


logOutButton.addEventListener("click", clearData);



function clearData() {
    localStorage.clear();
    window.location.replace("./index.html");
}

// Begining of Map 

function initMap() {

    // Set location to Reading
    const reading = { lat: 51.451505, lng: -1.0037961 };
    // The map, centered at Reading
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: reading,
    });

    // Set coordinates of markers to places aroung Reading and title text for the markers

    const tourStops = [
        [{ lat: 51.551505, lng: -1.1037961 }, "Charging Station 1"],
        [{ lat: 51.451505, lng: -1.3037961 }, "Charging Station 2"],
        [{ lat: 51.351505, lng: -0.8000061 }, "Charging Station 3"],
        [{ lat: 51.251505, lng: -1.2737961 }, "Charging Station 4"],
        [{ lat: 51.201505, lng: -0.7037961 }, "Charging Station 5"],
    ];
    // Info window for markers.
    const infoWindow = new google.maps.InfoWindow();

    // Create the markers.
    function showMarkers() {
        tourStops.forEach(([position, title], i) => {
            const marker = new google.maps.Marker({
                position,
                map,
                title: `${title}`,
                label: `${i + 1}`,
                optimized: false,
            });

        });


        // Click listener for markers windows
        marker.addListener("click", () => {
            infoWindow.close();
            infoWindow.setContent(marker.getTitle());
            infoWindow.open(marker.getMap(), marker);
        });

    }


    // Call init directions service
    var dirService = new google.maps.DirectionsService();
    var dirRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    dirRenderer.setMap(map);

    // highlight a street routes beteween locations
    var request = {
        origin: "51.551505,-1.1037961",
        destination: "51.451505,-1.3037961",
        travelMode: google.maps.TravelMode.DRIVING
    };
    dirService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            dirRenderer.setDirections(result);
        }
    });

    // Bicycle Image

    function showBike1() {
        const bike1 =
            "./assets/img/bicycle-icon.png";
        const beachMarker = new google.maps.Marker({
            position: { lat: 51.551505, lng: -1.1037961 },
            map,
            icon: bike1,
        });
    }


    // Hide markers.
    function hideMarkers() {
        //location.reload();
        showMarkers.setMapOnAll(null);
    };

    function toggleData() {
        if (toggleButton.innerHTML == "on") {
            toggleButton.innerHTML = "off"
            showMarkers()
            const tourStops = []
        } else if (toggleButton.innerHTML == "off") {
            toggleButton.innerHTML = "on";
            hideMarkers()
        } else {
            null
        }
    }

    const toggleButton = document.getElementById("toggle-activity");
    const toggleBike1 = document.getElementById("bike-1");


    toggleButton.addEventListener("click", toggleData)
    toggleButton.addEventListener("click", showBike1)
}