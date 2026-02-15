const LoginButton = document.querySelector("#loginButton")

LoginButton.addEventListener("click", login)

function login() {
  const email = document.querySelector("#savedEmail").value.trim();
  const password = document.querySelector("#savedPassword").value.trim();

  const user = JSON.parse(localStorage.getItem("users")) || [];

  const exist = user.find( u=> u && u.email === email && u.password === password) // if a user(u &&) is null, proceed to check if the email or password for a particular user in the localstorage (u.email and u.password) is equals to the ones they inputed, then do the below:

  if (exist) {
    localStorage.removeItem("activeUser"); // removes previous active user. So there can only be one active user. this means that, at each log in, there will only be one active user. this is set this way in order to only display the details of the person logging in at a particular time. if this is not done, it will display the details of the previous active user
   localStorage.setItem("activeUser", JSON.stringify(exist)); // set the now active user into a variable called "active user"
  window.location.href = "../Homepage.html";
  } else {
    alert("Invalid details");
    return;
  }

}

const toggle2 = document.querySelector(".toggle2")

toggle2.addEventListener("click", log)

function log () {
  const input2 = this.previousElementSibling; // accessing the prevous element of that particular toggle(eye slash) that is clicked, and naming it "input". The previous element here is the password input because it is the element that comes before the eye slash

        if (input2.type === "password") {
            input2.type = "text";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        } else {
            input2.type = "password";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        }
}