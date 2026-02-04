const welcomePage = document.querySelector("#welcomePage");
const logo = document.querySelector("#logo");


if(logo) {
const text = "Welcome To ClavFin";
let index = 0;

const interval = setInterval(() => {
  logo.textContent += text[index];
  index++;

  // each letters prints after 2ms, and clear the interval time when the index equals to the length of the tex
  if (index === text.length) {
    clearInterval(interval);

    // After clearing timeout, wait 2s before going to sign in page
   setTimeout(() => {
    window.location.href = "signup.html"
   }, 2000) 
  }
}, 200);
}

