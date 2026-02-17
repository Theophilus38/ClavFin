const confirmPassword = document.querySelector("#confirm");

confirmPassword.addEventListener("click", homePage);

const symbol = /[!@#$%^&*(),.?":{}|<>]/;

function homePage(event) {
    if (event) event.preventDefault();

    const p1 = document.querySelector("#p1").value.trim();
    const p2 = document.querySelector("#p2").value.trim();

    // Checking passwords
    if (p1 === "" || p1 !== p2) {
        alert("Passwords do not match! Try again.");
        return;
    } else if (p1.length < 6) {
        alert("Password too short")
        return;
    } 

    if(!symbol.test(p1) || !symbol.test(p2)) {
        alert("Password must contain at least one sumbol!");
        return;
    }


    // Getting the temporary user details
    const tempUser = JSON.parse(localStorage.getItem("temporaryUser"));

    // If no temp user is found, send the user back to signup
    if (!tempUser) {
        alert("Error: No registration details found. Please sign up again.");
        window.location.href = "../Signup.html";
        return;
    }

    // Getting existing users
    let users = JSON.parse(localStorage.getItem("users"));

    // If users is null or not an array, make it an empty array, this is because "users" always has to be an array so the codes do not break
    if (!Array.isArray(users)) {
        users = []; // all informations of a particular user is stored into the local storage as an array
    }

    // looping through to check if email exists.
    let emailExists = false;

    for (let i = 0; i < users.length; i++) {
        if (!users[i]) continue; // if a user entry is null or undefined, continue looping
        if (users[i].email === tempUser.email) {
            emailExists = true;
            break; // Stop looping as soon as there is a match
        }
    }

    // If we found the email in the loop above, stop here.
    if (emailExists) {
        alert("Email already exists");
        return;
    }

    // If it gets beyond the above loop, collect the details of the user and create an object(newUser) which is then set to be pushed into an array of users below:
    const newUser = {
        firstName: tempUser.firstName,
        lastName: tempUser.lastName,
        email: tempUser.email,
        password: p1
    };

    // Add object the list
    users.push(newUser);

    // Save everything back
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("activeUser", JSON.stringify(newUser))

    // Clear the tempUser, since the details of tempUser, which are gottten through the "temporaryUser" in the local storage has been set to "newUser", which in turn has been pushed to "users", which is also set to be "user" in the local storage
    localStorage.removeItem("temporaryUser");

    // Success
    alert("Account created successfully!");
    window.location.href = "../Homepage.html";
}

const toggles = document.querySelectorAll(".toggle");

toggles.forEach(toggle => {
    toggle.addEventListener("click", function () { // Do the below when a toggle(eye slash) is clicked

        const input = this.previousElementSibling; // accessing the prevous element of that particular toggle(eye slash) that is clicked, and naming it "input". The previous element here is the password input because it is the element that comes before the eye slash

        if (input.type === "password") {
            input.type = "text";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        } else {
            input.type = "password";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        }
    });
});