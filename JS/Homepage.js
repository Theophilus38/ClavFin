const dateSelect = document.querySelector("#date");
const today = new Date(); // getting the current date from a user's computer
const stopDate = new Date(2010, 0, 1); // this is the date that ends the drop down options (January 1st, 2010). "0" in date in js means January

let tempDate = new Date(today);

while (tempDate >= stopDate) {
  // getting the DD-Mon-YYYY format
  const formatDate = (date) => {
    const d = String(date.getDate()).padStart(2, "0"); // making the date as two digit, and starts with "0" e,g, 04
    const m = date.toLocaleDateString("en-GB", { month: "short" }); // month should be in short form
    const y = date.getFullYear(); // getting full digit for year
    return `${d}-${m}-${y}`;
  }; // the above function means that the codes inside the brackets should keep running as long as a date (tempDate) is greater or equals to the stop date. This is what makes the options dropdown possibe

  const endString = formatDate(tempDate); // this sets the current date to be "endString" and makes it have have the format returned above (return `${d}-${m}-${y}`;) lets assume today's(current) date is 03 Jan, 2023

  const startDate = new Date(tempDate); // setting the current date(today's date) as "startDate". we have assumed today's date is 03 Jan, 2023
  startDate.setFullYear(startDate.getFullYear() - 1); // removing one from the year of the current date e.g 2023 - 1 = 2022
  startDate.setDate(startDate.getDate() + 1); // Adding one to the day of the current day e.g 03 + 1 = 04
  const startString = formatDate(startDate); // structuring the startDate in form of the format returned above in the formatDate function and name it startString. Therefore, the startString becomes (04, Jan, 2022) while the endString(current date or today's date)still remains (03 Jan, 2023)

  const displayLabel = `${startString} to ${endString}`; // now the startString and endstrings and chained together and saved as "displayLabel"
  const dateValue = `${tempDate.getFullYear()}-${String(tempDate.getMonth() + 1).padStart(2, "0")}-${String(tempDate.getDate()).padStart(2, "0")}`; // grabs the current year, month and date. 1 is added to month because since january is 0 in JS, february will be 1, therefore december will be 11. To correct this, 1 is added. String is used to conver the number to text. The arrangement here is what the computer understood, that is year first, then month, then day. Not the other way round that i want it.

  dateSelect.add(new Option(displayLabel, dateValue)); // the dispalyedLabel is what the users see in the drop down list e.g (03-Jan-2023) while the dataValue is what the computer read (2023-Jan-03)
  // new Option(text, value) used here is a built-in JS command that creates a pair in a select input

  tempDate.setFullYear(tempDate.getFullYear() - 1); // gets the year in tempDate(current year e.g 2023), removes one, and save it back to tempDate, the newly saved result now becomes the tempDate(2022) and the loop goes on like that to 2010
}

dateSelect.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`; // setting today's date as what is displayed each time a user refreshes or logs in

const income = document.querySelector("#incomeAmount");
const amount = Math.floor(Math.random() * 224677) + 1;
const amountFormat = new Intl.NumberFormat("en-us").format(amount);
income.textContent = `$${amountFormat}`;

const transaction = document.querySelector("#transactions");
const amount2 = Math.floor(Math.random() * 94677) + 1;
const transactionFormat = new Intl.NumberFormat("en-us").format(amount2);
transaction.textContent = `$${transactionFormat}`;

const total = document.querySelector("#total");
const totalIncome = Math.floor(Math.random() * 49) + 1;
total.textContent = `${totalIncome} Transactions`;

const percentage = document.querySelector("#percentage");
const totalPercentage = Math.floor(Math.random() * 15) + 1;
percentage.textContent = `+${totalPercentage}%`;

const total2 = document.querySelector("#total2");
const totalExpense = Math.floor(Math.random() * 19) + 1;
total2.textContent = `${totalExpense} Transactions`;

const percentage2 = document.querySelector("#percentage2");
const totalPercentage2 = Math.floor(Math.random() * 15) + 1;
percentage2.textContent = `-${totalPercentage2}%`;

// homepage.js

document.addEventListener("DOMContentLoaded", () => { // this events runs only after the dom contents are loaded. the reason for this is because we are trying to get the image from whete it is defined in settings.js. so to ensure this does not run before settings.js, we wait till all contents are loaded
  const homeProfilePic = document.querySelector("#homeProfilePic");
  if (!homeProfilePic) return;

  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  if (activeUser?.profilePicture) { // this is saying if there is active user, and if the active user has a profilepicture, then let the homepage image be that profile picture
    homeProfilePic.src = activeUser.profilePicture;
  } else { // if not, let the default avatar be the picture.
    homeProfilePic.src = "Avatar.jpg";
  }
});


// Run the function as soon as the page loads

const userdetails = JSON.parse(localStorage.getItem("activeUser"));
const userFirstName = userdetails.firstName;
const userLastName = userdetails.lastName;
document.querySelector("#userName").textContent =
  `${userFirstName} ${userLastName}`;

const balanceAmount = document.querySelector("#balanceAmount");
const balance = Math.floor(Math.random() * 22467325) + 1;
const balanceFormat = new Intl.NumberFormat("en-us").format(balance); // this makes the number appear in an English, US format which makes use of a comma for thousand separator, and dot for kobo. there are older formats like germany, France and others. "new Intl.Number" is an in built method in Js that accepts arguments in a bracket just like the above
balanceAmount.textContent = `$${balanceFormat}`;

//Getting the active user data from storage
const activeUserPic = JSON.parse(localStorage.getItem("activeUser"));

//Targetting the image element on the homepage
const homeProfilePic = document.querySelector("#homePic");

//If the user is logged in and has a picture, display it
if (activeUserPic && activeUserPic.profilePicture) {
  homeProfilePic.src = activeUserPic.profilePicture;
} else {
  // Fallback to default if no picture is found
  homeProfilePic.src = "./Avatar.jpg";
}



const container = document.getElementById('cycle-box');
const boxes = container.querySelectorAll('.box');
const dots = container.querySelectorAll('.dot');
let currentIndex = 0; // creating a counter, starting at te index of 0 which is the first box
let timer = null; // timer is falsy, no set interval yet, meaning no time running

function updateDisplay() {
  // Remove active class from previous box and dot
  boxes.forEach(box => box.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Add active class to current box and dot
  boxes[currentIndex].classList.add('active'); // looks at the counter and adds active class, defined in css, to the box with the current index
  dots[currentIndex].classList.add('active'); // do same for dot
}

function play() {
  if (timer) return; // if timer is running, stop and do nothing
  timer = setInterval(() => {
    currentIndex = (currentIndex + 1) % boxes.length; // this maths works like this since there are 3 boxes, it adds i to the current index (0 + 1) % 3 =1, (1 + 1) % 3 =2, (2 + 1) % 3 = 0, now it resets back to 0
    updateDisplay(); // run the updateDisplay function
  }, 2500); // it doesvthis maths to make each box appear ever 2.5seconds
}

function pause() {
  clearInterval(timer); // this occur when as defined below:
  timer = null; // this emptiies the timer, so that when a user hovers again the timer starts reading all over. E.g the timer is 2.5seconds, if the user stop hovering when the timer is 1.5seconds and probably on the second box, the second box remains visible but the timer becomes 0. now, if the user hovers back again, the timer starts from 0 to 2.5seconds before moving to the third tbox
}

// Mouse Events
container.addEventListener('mouseenter', play); // run the play function when the mouse enters the container div
container.addEventListener('mouseleave', pause); // run the puause function when it leaves

// Mobile Touch Events
container.addEventListener('touchstart', (e) => { play(); }, { passive: true }); // this is for mobile screen. Run the play function when the user touches the container div
container.addEventListener('touchend', pause); // run the pause fuction when he or she stops