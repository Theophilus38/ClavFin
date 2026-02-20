const form = document.querySelector("#signupForm")

form.addEventListener("submit", register)

function register(event) {
    event.preventDefault()
    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();
     const email = document.querySelector("#email").value.trim().toLowerCase();

     const allowedDomains = [
        "gmail.com", 'yahoo.com', "hotmail.com", "outlook.com"
     ];

     const domain = email.split ("@") [1]; // splitting the email into two parts on "@". e.g "examplegmail.com" becomes "example" "gmail.com". then the second one(index [1]) is selected

     if (!allowedDomains.includes(domain)) { // if the extracted part of the user's email is not included in the "allowedDomains", then do te below:
        alert("Please input a correct Gmail, Yahoomail, Hotmail, or Outlook format.")
        return;
     }

    // Saving info{object} as "temporaryUser" into localStorage
   const tempUser = { firstName, lastName, email};
   localStorage.setItem("temporaryUser", JSON.stringify(tempUser));

    // Move to the password page
    window.location.href = "../Password.html";
};


