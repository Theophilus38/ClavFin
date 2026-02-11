const users = JSON.parse(localStorage.getItem("users")) || [];
let activeUsers = JSON.parse(localStorage.getItem("activeUser"));

if (!activeUsers) {
  // not logged in, then redirect. It checks if activeUsers is "falsy" (null or undefined). If the variable is empty (meaning no one is logged in), it immediately forces the browser to go to the login.html page.
  window.location.href = "login.html";
}

const currentUser = users.find(
  user => user.email.toLowerCase() === activeUsers.email.toLowerCase()
); // searches the main users list to find the specific remail that matches the currently logged-in person and saved it as currentUser

if (!currentUser ) {
  window.location.href = "login.html";
} // Even if activeUsers (the session) exists, this checks if that user actually exists in the main database. If the user was deleted from the main database but still had a session cookie, this kicks them out.


if (!currentUser.account) { // if te user is new, that is, does not have an account yet, then do this:
  currentUser.account = {
    income: Math.floor(Math.random() * 224677) + 1,
    expenses: 0,
    balance: 0
  };

  currentUser.account.balance = currentUser.account.income; // making income to initially be the balance amount

  // save users back
  localStorage.setItem("users", JSON.stringify(users));
}

activeUsers.account = { ...currentUser.account} // creating another copy of the account data through spread opeartor and save it as activeUsers.account, This is where the account is being added tp activeUsers. 
localStorage.setItem("activeUser", JSON.stringify(activeUsers))  

const account = activeUsers.account; // creating a short variable. Instead of typing activeUsers.account.balance every time, you can now just type account.balance.


    
    const incomeDisplay = document.querySelector("#incomeAmount");
    const expensesDisplay = document.querySelector("#transactions");
    const balanceDisplay = document.querySelector("#balanceAmount");

    if (incomeDisplay) incomeDisplay.textContent = `$${account.income.toLocaleString()}`;
    if (expensesDisplay) expensesDisplay.textContent = `$${account.expenses.toLocaleString()}`;
    if (balanceDisplay) balanceDisplay.textContent = `$${account.balance.toLocaleString()}`; // "toLocaleString()" coverts number e.g 123456, which is read by javascripts to 123,456 whic is easily read by humans. IT uses comma oe dots depending on the user's locale(location), assessed from the browser.

    const trans = document.querySelector("#trans")

    trans.addEventListener("click", transferPage)

    function transferPage() {
      window.location.href = "../transfer.html";
    } 

    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    const homeProfilePic = document.querySelector("#homePic");
    const userName = document.querySelector("#userName");

    if (activeUser) { // if there is active user, do the below: 
        if (homeProfilePic) homeProfilePic.src = activeUser.profilePicture || "Avatar.jpg"; // if the user does not have a profile picture uploaded in settings page yet, display a default avatar. 
        if (userName) userName.textContent = `${activeUser.firstName} ${activeUser.lastName}`;
    }



const dateSelect = document.querySelector("#date");

if(dateSelect) {
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

  const endString = formatDate(tempDate); // this sets the current date to be "endString" and makes it have have the format returned above (return ${d}-${m}-${y};) lets assume today's(current) date is 03 Jan, 2023

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
}


const container = document.querySelector("#cycle-box");

if (container) {
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
  track.style.transform = `translateX(-${currentIndex * 100}%)`; // this means if current index is 0, it will translate x(0%). if current index is 1, translate x(-100%). if its 2, it will move left and become -200%. This means that the current box will move left, whenever it translates x, by 100%, making it disappear totally from the screen

  // Update Dots
  dots.forEach(dot => dot.classList.remove('active')); /// removes active, as defined in app.css from all dots
  if (dots[currentIndex]) dots[currentIndex].classList.add('active'); // add active to the dot matching the current box(currentIndex) being displayed
}

// this is the logic that controls the currentIndex for the "next slide". This is called Carousel
function nextSlide() {
  currentIndex = (currentIndex + 1) % boxes.length; // a modulo operator "%" is used here. Note that modulo operator uses remainder. since the total number of boxes(boxes.length) is 3, the math here is that if the current index is 0, it will be (0 + 1) % 3 => (1 % 3), that gives 0 remainder 1, so 1 is now the current index. when 1 becomes the current index. it will be (1 + 1) % 3 => (2 % 3), and it will give 0 remainder 2, so 2 is now the current index. when 2 becomes the current index it will be (2 + 1) % 3 => 3 % 3, that gives 1 reminder 0, so 0 now becomes the current index again, so it move on like that. the flow is like this, 0,1,2,0,1,2...  

  //The above works in a way that when the number on the left e.g "1" and "2" is lesser than the modulo operater number "3" like above, the number on the left is usually the reminder
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
  play(); // restart timer immediately, or leave paused
}

resetTimer()

if(nextBtn) nextBtn.addEventListener('click', () => {
  pause(); // Stop auto-play when a user clicks the nexbtn and:
  nextSlide(); // perform the "nextslide" function
});

if(prevBtn) prevBtn.addEventListener('click', () => {
  pause(); // stop auto play when a user clicks the prevbtn and:
  prevSlide(); // perform the "prevslide" function
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    pause(); // when a dot is clicked. stop auto play and:
    currentIndex = index;
    updateDisplay(); // perform the updateDisplay function
  });
});

// Auto Play Logic 
function play() {
  if (timer) return; // if there is no time, do nothing, then set a time as  defined below: note that this play function occurs when a mouse leaves the container
  timer = setInterval(nextSlide, 3000); // 3 seconds
}

function pause() {
  clearInterval(timer); // when a mouse enters the container, clear the timer. this means that the timer stops reading 
  timer = null; // timer becomes undefined
}

// Start auto-play on load
play();

// Pause when mouse enters, Resume when mouse leaves. not that the resumption means the timer starts all over. This means if the mouse leaves the container when the timer is on 2seconds, when the mouse enters again,the timer starts reading from 0seconds to 3seconds again. 
container.addEventListener('mouseenter', pause);
container.addEventListener('mouseleave', play);

// Mobile Touch. 
let touchStartX = 0; // this indicates when a finger first touches the screen
container.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, { passive: true }); //// since a user can touch the screen multiple times, this, "changedTouches[0], captures the first touch. screenX takes care of the horizontal coordination of the touch, relative to the entire screen. If a screen is 400px wide, and a user touches the center, that is 200px
container.addEventListener('touchend', e => {
  let touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) nextBtn.click(); // cmparing when the finger touch (touchStartX) and when the finger leaves(touchEndX) and checks if the place the finger touch is greater than 50px to the left, then Swip to the left. E.g, if you touch the screen at 300px on the right and you drag it to the 100px on the left, the maths is (300 - 100) = 200, since 200 is greater than 50, the nextBtn got pressed
  if (touchEndX - touchStartX > 50) prevBtn.click(); //if the place the finger touch is greater than 50px to the right, then swipe to the right. You put your finger on the left side (e.g., 50px) and drag it to the right (e.g., 250px).The Math is 250 - 50 = 200. Since 200 is greater than 50, the prevBtn got pressed.
});

}

// You might wonder why we don't just use > 0. If we used 0, the carousel would change slides every time a user taps the screen or even if their finger taps by 1 pixel while scrolling. The 50px ensures the user made a deliberate, intentional swipe gesture. It acts as a "buffer" for accidental touches.

 