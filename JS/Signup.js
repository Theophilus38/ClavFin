const form = document.querySelector("#signupForm")

form.addEventListener("submit", register)

function register(event) {
    event.preventDefault()
    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();
     const email = document.querySelector("#email").value.trim();

    // Saving info{object} as "temporaryUser" into localStorage
   const tempUser = { firstName, lastName, email};
   localStorage.setItem("temporaryUser", JSON.stringify(tempUser));

    // Move to the password page
    window.location.href = "/Password.html";
};


