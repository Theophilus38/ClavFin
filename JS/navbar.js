document.addEventListener("DOMContentLoaded", () => {
  // 1. Get the current page name from the URL (e.g., "Transfer.html")
  const currentPage = window.location.pathname.split("/").pop();

  // 2. Get all your navigation links
  const navLinks = document.querySelectorAll(".navigation");

  // 3. Loop through them
  navLinks.forEach(link => {
    // If the link's href matches the current page, add the 'active' class
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

const home = document.querySelector("#HomepageSection")
const home2 = document.querySelector("subHomepage")
const features = document.querySelector("#featuresPage")
const features2 = document.querySelector("#HomepageNote")
const pricing = document.querySelector("#pricingPage")
const inte = document.querySelector("#integrationPage")


const signOut = document.querySelector("#navButton")
const modal = document.querySelector("#signoutModal")
const yess = document.querySelector("#yes2")
const noo = document.querySelector("#no2")


signOut.addEventListener("click", () => {
  modal.style.display = "flex";
  home.classList.add("blur");
  home2.classList.add("blur");
  features.classList.add("blur");
  features2.classList.add("blur");
  pricing.classList.add("blur");
  inte.classList.add("blur");
});

yess.addEventListener("click", () => {
  window.location.href = "signup.html";
});

// If NO → close modal + remove blur
noo.addEventListener("click", () => {
  modal.style.display = "none";
  home.classList.remove("blur");
  home2.classList.remove("blur");
  features.classList.remove("blur");
  features2.classList.remove("blur");
  pricing.classList.remove("blur");
  inte.classList.remove("blur");
});
