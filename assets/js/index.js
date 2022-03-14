console.log("js is connected");

// List of authenticable users

var users = [
    { user: "kola", pass: "pass", trips: 20, grade: "Expert", license: "Professional" },
    {
        user: "mosun",
        pass: "mosunpass",
        trips: 20,
        grade: "Expert",
        license: "Professional"
    },
    {
        user: "mode",
        pass: "modepass",
        trips: 20,
        grade: "Expert",
        license: "Professional"
    },
    {
        user: "momo",
        pass: "momopass",
        trips: 20,
        grade: "Expert",
        license: "Professional"
    },
    {
        user: "moje",
        pass: "mojepass",
        trips: 20,
        grade: "Expert",
        license: "Professional"
    },
]


// List of DOM grabbers
let typedUsername = document.getElementById("username");
let typedPassoword = document.getElementById("password");
let submitButton = document.getElementById("submit2");

// List of Event Listeners
submitButton.addEventListener("click", authentication);

// Function to reveal Login
function revealLogin() {

}


// Authentication Function
function authentication() {
    var loggedinStatus = document.getElementById("loggedinStatus");
    for (i = 0; i < users.length; i++) {
        if (typedUsername.value === users[i].user && typedPassoword.value === users[i].pass) {
            let currentDriver = { user: typedUsername.value, token: typedPassoword.value }
            let currentUserSerilized = JSON.stringify(currentDriver);
            localStorage.setItem("currentUser", currentUserSerilized);
            let loggedinUserInfo = JSON.parse(localStorage.getItem("currentUser"));
            console.log(loggedinUserInfo.user)
            loggedinStatus.innerHTML = "Driver's Name: " + loggedinUserInfo.user;
            window.location.replace("./fuctionpage.html");
            return
        }
    }

    loggedinStatus.innerHTML = "Login failed"

}