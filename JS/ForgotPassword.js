
let users = JSON.parse(localStorage.getItem("users")) || [];

const submitEmail = document.getElementById("submitEmail");
const emailInput = document.getElementById("email");
const loading = document.getElementById("loading");
const emailError = document.getElementById("emailError");

const h2 = document.querySelector("h2")
const step1 = document.getElementById("step1Forgot");
const step2 = document.getElementById("step2Forgot");
const step3 = document.getElementById("step3Forgot");

const otpInputs = document.querySelectorAll(".otp");
const verifyOTP = document.getElementById("verifyOTP");
const resendOTP = document.getElementById("resendOTP");
const otpError = document.getElementById("otpError");
const timerDisplay = document.getElementById("timer");

const newPasswordInput = document.getElementById("newPasswordd");
const resetPasswordBtn = document.getElementById("resetPassword");
const resetMessage = document.getElementById("resetMessage");

emailInput.value = ""

let generatedOTP = null;
let currentEmail = null;
let countdown;
let timeLeft = 60;

// generating otp through random number:
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Start countdown : 
function startTimer() {
  timeLeft = 60;
  resendOTP.disabled = true; // when timer starts reading, disable the "resendotp" button

  countdown = setInterval(() => {
    timeLeft--; // timeLeft counts down every 1s (1000)
    timerDisplay.textContent = "Expires in: " + timeLeft + "s"; // i can also use template literal here

    if (timeLeft <= 0) { // if the timeLeft counts to 0, do the below:
      clearInterval(countdown); // stop counting 
      timerDisplay.textContent = "OTP Expired"; // display this
      generatedOTP = null; // set the generated otp(random) to be null, so it is no more useful
      resendOTP.style.backgroundColor = "black"
      resendOTP.style.color = "white"
      resendOTP.disabled = false; // now, enable the resend "OTP" button.

      
    }
  }, 1000);
}

// Check Email
submitEmail.addEventListener("click", () => {

  const emailValue = emailInput.value.trim();
  emailError.textContent = "";
  loading.style.display = "block";

  setTimeout(() => {

    loading.style.display = "none";

    users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === emailValue);

    if (!user) {
      emailError.textContent = "Email not found";
      return;
    }

    currentEmail = emailValue;
    generatedOTP = generateOTP();

    alert("OTP: " + generatedOTP);

    step1.classList.add("hidden");
    step2.classList.remove("hidden");

    otpInputs[0].focus(); // auto focus the first otp input box
    startTimer(); // start the timer defined above

  }, 2000); // this "setTimeout" runs after 2seconds that the "submitEmail" button is clicked. This means that loading state "checking email..." is dislayed for two minutes, then the setTimeout runs immediatel after.
});

/* OTP Input Logic */
otpInputs.forEach((input, index) => { // loop through all the otpinputs(boxes), and return each box (input) and index (index)

  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9]/g, ""); // this listens for input on a box (input), and checks if the value of the box is not a number, if it is not, it gets removed. Regex (Regular Expression) is used here. The slash at the begining and end is used to signal a regex expression.  "[]" means "check characters". "0-9" means "digits only". "^" means "not". So, "[^0-9]' means anything not a number. "g" means "apply globally", that is, apply on all the boxes or on all the non-number characters that may be inputted. Without "g" it only applies to the first non-number character. So the expression says "if a letter, or symbol or anything not a number is typed, remove it."

    if (input.value && index < otpInputs.length - 1) { // if the index of a box (input) is not equal to the total index of all boxes (remember length is always one number greater than index, that's why we use "-1"), then do the below: 
      otpInputs[index + 1].focus();
    } // auto focus the next box
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && index > 0) { // here, we listen for "keydown", that is when a key is pressed, even before an input changes. If the key pressed is backspace, since backspace automatically deletes a character, it deletes the value of a box, howevever, the cursor is still inside the box whose character was deleted. now, if the value inside that box(input) is not greater than 0, that is, a character, (by the way, the maximum character in a box can only be 1), than so the below when backspace is pressed again:
      otpInputs[index - 1].focus(); // auto focus the previous box.
    }
  });
});

// Combine OTP 
function getOTP() {
  return Array.from(otpInputs).map(i => i.value).join(""); // coverts all boxes into an array, E.G ["4", "7", "1", "5", "9", "0" ] so we can map through them. Map through them an extract each box's value and join trhem together "471590"
}

//Verify OTP 
verifyOTP.addEventListener("click", () => {

  if (!generatedOTP) {
    otpError.textContent = "OTP expired. Request another."; // since generatedOTP is set to be null when timeLeft is 0 in "timer" above, then if it is not generatedOTP, it means it is null, so it should display this.
    return;
  }

  if (getOTP() === generatedOTP.toString()) {
    clearInterval(countdown); // generatedOTp is number while getOTp is a string as joined above. So, when we strictly "===" compares them, to ger a true boolean, we need to co either convert get OTP to number through 'parseInt' or convert generatedOTP to string through "toString".
    step2.classList.add("hidden");
    step3.classList.remove("hidden");

  } else {
    otpError.textContent = "Invalid OTP";
  }
});

/* Resend OTP */
resendOTP.addEventListener("click", () => {

  generatedOTP = generateOTP();
  alert("New OTP: " + generatedOTP);

  otpInputs.forEach(i => i.value = "");
  otpInputs[0].focus();
  otpError.textContent = "";
  resendOTP.style.backgroundColor = ""
  resendOTP.style.color = "#ccc"

  startTimer();
});

/* Reset Password */
resetPasswordBtn.addEventListener("click", () => {

  const newPass = newPasswordInput.value.trim();

  const symbol = /[!@#$%^&*(),.?":{}|<>]/;

  if (newPass.length < 6) {
    resetMessage.textContent = "Password too short";
    return;
  }

   if (!symbol.test(newPass) ) {
        alert("Password must contain at least one symbol!");
        return;
    }

  users = JSON.parse(localStorage.getItem("users")) || [];

  const userIndex = users.findIndex(u => u.email === currentEmail); // find the index of the currentEmail in the local storage.

  users[userIndex].password = newPass; // update the password to the new one.

  localStorage.setItem("users", JSON.stringify(users)); // save it back into the local storage

  alert("Password successfully changed!")
  window.location.href = "Login.html"
});



const toggles4 = document.querySelectorAll(".toggle4");

toggles4.forEach(toggle4 => {
    toggle4.addEventListener("click", function () { // Do the below when a toggle(eye slash) is clicked

        const input4 = this.previousElementSibling; // accessing the prevous element of that particular toggle(eye slash) that is clicked, and naming it "input". The previous element here is the password input because it is the element that comes before the eye slash

        if (input4.type === "password") {
            input4.type = "text";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        } else {
            input4.type = "password";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        }
    });
});