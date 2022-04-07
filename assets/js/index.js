let users = [{
        user: "kola",
        pass: "pass",
        fullName: "Adelaiye Kolade",
        trips: "29",
        uniqueIdentity: "Jukes",
        imageUrl: "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png",
        medals: [
            "Radiator Cleaning",
            "Spot Turning",
            "Race Blaster"
        ]
    },
    {
        user: "mosun",
        pass: "pass",
        fullName: "Madam Skooley",
        trips: "39",
        uniqueIdentity: "Wilson",
        imageUrl: "https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb.jpg",
        medals: [
            "Million Rides",
            "Damage Resistance",
            "Superhuman reflexes"
        ]
    },
    {
        user: "mode",
        pass: "pass",
        fullName: "Flame Fury",
        trips: "100",
        uniqueIdentity: "Unknown",
        imageUrl: "https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg",
        medals: [
            "Immortality",
            "Heat Immunity",
            "Inferno Burter",
            "Teleportation",
            "Interdimensional travel"
        ]
    }
]

if (!localStorage.getItem("currentUser")) {

    let submitButton = document.getElementById("submit");

    // Listeners to authenticate user
    submitButton.addEventListener("click", authentication);

    // Authentication Function
    function authentication() {
        let loggedinStatus = document.getElementById("login-msg");
        let typedUsername = document.getElementById("username");
        let typedPassoword = document.getElementById("password");
        for (let i = 0; i < users.length; i++) {
            if (typedUsername.value === users[i].user && typedPassoword.value === users[i].pass) {

                let currentDriver = {
                    user: users[i].user,
                    fullName: users[i].fullName,
                    trips: users[i].trips,
                    uniqueIdentity: users[i].uniqueIdentity,
                    imageUrl: users[i].imageUrl,
                    medals: users[i].medals
                }
                let currentUserSerilized = JSON.stringify(currentDriver);
                localStorage.setItem("currentUser", currentUserSerilized);
                let loggedinUserInfo = JSON.parse(localStorage.getItem("currentUser"));
                //loggedinStatus.innerHTML = "Driver's Name: " + loggedinUserInfo.user;
                window.location.replace("./fuctionpage.html");
                loggedinStatus.innerHTML = ""
                return
            }
        }
        loggedinStatus.innerHTML = "Login Failed"
    }
} else {
    window.location.replace("./fuctionpage.html");
}