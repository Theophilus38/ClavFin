
const changePassword = document.querySelector("#changePassword");

let activeStorage = JSON.parse(localStorage.getItem("activeUser"));

let userStorage = JSON.parse(localStorage.getItem("users")) || [];

changePassword.addEventListener("click", change);


const old = document.querySelector("#oldPassword")

old.addEventListener("input", hideMessage)

const pass = document.querySelector("#firstPassword3")
const pass2 = document.querySelector("#secondPassword3")

 const wrong = document.createElement("p")
 wrong.className = "wrongPasswordMessage"

 function hideMessage () {
  wrong.style.display = "none"
 }

function change() {
  const oldPassword = document.querySelector("#oldPassword").value.trim();
  const newPassword = document.querySelector("#newPassword").value.trim();

  if (newPassword.length < 6) {
    alert("New Password too short!")
    return;
  } 

  if (activeStorage.password === oldPassword) {
    //if the password in the info of the active user the active user(the person logged in) is equal to the one inputted in the oldPassword input, then do the below:
    activeStorage.password = newPassword; // updating the password of the person logged in to be the new one inputted

    userStorage = userStorage.map((user) => {
      if (user.email === activeStorage.email) {
        return { ...user, password: newPassword }; // this looks through the users storage and check if there is an email that is equals to that of te person logged in, if there is, it creates a new object object and retains the other info using spread for that particular person(...user), then replaces the old password with the new one
      }
      return user; // it keeps the details of everyone else
    });

    localStorage.setItem("activeUser", JSON.stringify(activeStorage));

    localStorage.setItem("users", JSON.stringify(userStorage));

    wrong.style.display = "none"

    alert("Password sucessfully changed");
    window.location.href = "../Homepage.html";
  } else {
    wrong.innerHTML = "Old password not correct"
    pass2.before(wrong)
    wrong.style.display = "block"
  } 
}


const toggles3 = document.querySelectorAll(".toggle3");

toggles3.forEach(toggle3 => {
    toggle3.addEventListener("click", function () { // Do the below when a toggle(eye slash) is clicked

        const input3 = this.previousElementSibling; // accessing the prevous element of that particular toggle(eye slash) that is clicked, and naming it "input". The previous element here is the password input because it is the element that comes before the eye slash

        if (input3.type === "password") {
            input3.type = "text";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        } else {
            input3.type = "password";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        }
    });
});