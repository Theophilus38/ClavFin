const contactForm= document.querySelector("#contactForm")

const countriesCode = document.querySelector("#formNumber");


contactForm.addEventListener("submit", handleContactForm)

function handleContactForm (e) {
    e.preventDefault();
    alert("Thanks for messaging us. We will get back to you as soon as posible")
}

window.intlTelInput(countriesCode, {
  initialCountry: "auto",
  separateDialCode: true
});