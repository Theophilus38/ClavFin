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
    const track = container.querySelector('.slide-track');
    const boxes = container.querySelectorAll('.box');
    const dots = container.querySelectorAll('.dot');
    const prevBtn = container.querySelector('.arrow.prev');
    const nextBtn = container.querySelector('.arrow.next');

    let currentIndex = 0;
    let timer = null;

    // The Main Display Function 
    function updateDisplay() {
        // Move the track to the left based on the current index
        // 0 = 0%, 1 = -100%, 2 = -200%
        track.style.transform = `translateX(-${currentIndex * 100}%)`; // this means if current index is 0, it will translate x(0%). if current index is 1, translate x(-100%). This means that the current box will move left, whenever it translates x, by 100%, making it disappear totally from the screen

        // Update Dots
        dots.forEach(dot => dot.classList.remove('active')); /// removes active, as defined in app.css from all dots
        dots[currentIndex].classList.add('active'); // add active to the dot matching the current box(currentIndex) being displayed
    }

    // this is the logic that controls the currentIndex for the "next slide". This is called Carousel
    function nextSlide() {
        currentIndex = (currentIndex + 1) % boxes.length; // a modulo operator "%" is used here. Note that modulo operator uses remainder. since the total number of boxes(boxes.length) is 3, the total index is 0. the math here is that if the current index is 0, it will be (0 + 1) % 3 => (1 % 3), that gives 0 remainder 1, so 1 is now the current index. when 1 becomes the current index. it will be (1 + 1) % 3 => (2 % 3), and it will give 0 remainder 2, so 2 is now the current index. when 2 becomes the current index it will be (2 + 1) % 3 => 3 % 3, that gives 1 reminder 0, so 0 now becomes the current index again, so it move on like that. the flow is like this, 0,1,2,0,1,2...  
        
        //The above works in a way that when the number on the left e.g "1" and "2" dividing "3" above, the number on the left is usually the reminder
        updateDisplay();
    }

    function prevSlide() {
        // The math ensures we loop backwards correctly
        currentIndex = (currentIndex - 1 + boxes.length) % boxes.length;
        updateDisplay();
    } // this function allows back, that is, to the previous slide rather than the next one has shown above. you might think what is nedded here is only (currentIndex - 1) % 3. However, JavaScript handles negative numbers differently than some other languages. If a user is on slide 0 and click "Back": 0 - 1 = -1.In JavaScript, -1 % 3 results in -1.Since there is no such thing as "Slide -1," the carousel would break and show a blank space. By adding boxes.length (which is 3) into the middle of the equation, we force the result to stay positive, even when we are moving backward from zero. 
    //if a user is on slide 2: (2 - 1 + 3) = 4. Then 4 % 3 = 1 the slide Moves from 2 to 1 which is normal

   //if a user is on slide 1: (1 - 1 + 3) = 3. Then 3 % 3 = 0 the slide Moves from 1 to 0 which is also normal 

   //if a user is on slide 0: (0 - 1 + 3) = 2. Then 2 % 3 = 2 the slide Moves from 0 to 2 which is also normal

    // (Arrows & Dots) 
    // Helper to stop timer when user interacts
    function resetTimer() {
        pause();
        play(); // Optional: restart timer immediately, or leave paused
    }

    nextBtn.addEventListener('click', () => {
        pause(); // Stop auto-play so it doesn't fight the user
        nextSlide();
    });

    prevBtn.addEventListener('click', () => {
        pause();
        prevSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            pause();
            currentIndex = index;
            updateDisplay();
        });
    });

    // --- 4. Auto Play Logic ---
    function play() {
        if (timer) return;
        timer = setInterval(nextSlide, 3000); // 3 seconds
    }

    function pause() {
        clearInterval(timer);
        timer = null;
    }

    // Start auto-play on load
    play();

    // Pause when mouse enters, Resume when mouse leaves
    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', play);
    
    // Mobile Touch Support (Simple Swipe)
    let touchStartX = 0;
    container.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive: true});
    container.addEventListener('touchend', e => {
        let touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) nextBtn.click(); // Swiped Left
        if (touchEndX - touchStartX > 50) prevBtn.click(); // Swiped Right
    });