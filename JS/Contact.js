const contactForm= document.querySelector("#contactForm")

const countriesCode = document.querySelector("#formNumber");


contactForm.addEventListener("submit", handleContactForm)

function handleContactForm (e) {
    e.preventDefault();
    alert("Thanks for messaging us. We will get back to you as soon as posible")
}

window.intlTelInput(countriesCode, {
  initialCountry: "us",
  separateDialCode: true,
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js" // this link allows for each country's number format and spacing. The on in the html head file helps to get the country's names and codes list.
});