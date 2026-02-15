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
