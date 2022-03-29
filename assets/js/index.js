import users from "./users.js";
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