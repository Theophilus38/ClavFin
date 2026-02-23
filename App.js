const logo = document.querySelector("#logo");
const welcomePage = document.querySelector("#welcomePage");

if (logo && welcomePage) {
    const text = "Welcome To ClavFin";
    
    // Split the text into individual spans
    logo.innerHTML = text.split("").map(char => 
        char === " " ? `<span>&nbsp;</span>` : `<span>${char}</span>`
    ).join(""); //text.split(""): Breaks the string into an array of individual letters: ['W', 'e', 'l', ... ].
    // .map(...): This is a loop. It takes every character (char) and wraps it in a <span> tag.
    // The space fix: If the character is a space, it uses &nbsp; (non-breaking space) to ensure the browser preserves the gap between words.
    // .join(""): Glues the array of spans back into one long string of HTML.
    // Your logo div now goes from <div></div> to <div><span>W</span><span>e</span>...</div>. This allows us to animate individual letters instead of the whole block.

    const letters = document.querySelectorAll("#logo span"); // selecting each span in the logo div
    const tl = gsap.timeline(); // Instead of individual animations triggering randomly, a timeline ensures step 2 starts only after step 1 finishes

    // Page Ease-In (From nothing to visible)
    tl.to(welcomePage, {  // telling the browser to animate the below towards #welcomePage section.
        opacity: 1, // fades the whole section from 0(initial value in css) to 1
        duration: 1.2,  // this means the contents of the welcomePage section appear on the screen after 1.2seconds that the page has loaded
        ease: "power2.inOut"  // This makes the fade start slow, speed up, and slow down at the end—creating a "silky" professional feel.
    });

    // Letters Ease-In (Balanced speed)
    tl.fromTo(letters, // defines exactly where the letters start and where they end.
        { opacity: 0, y: 30, filter: "blur(10px)" } // The "from" (Start): Invisible (opacity: 0), dropped down 30 pixels (y: 30), and blurry. 
        // 
        , {  // The "To" (End): Fully visible, at its natural height (y: 0), and sharp.
            opacity: 1, // fully visible
            y: 0, // coming back to its original height
            filter: "blur(0px)", // no blur
            duration: 1, // all these happens between 1seconds
            ease: "power2.out", // This makes the fade (each letter) appear in a way that starts slow, speed up, and slow down at the end—creating a "silky" professional feel.
            stagger: 0.08 // It adds a 0.08-second delay between each letter. This creates the "wave" effect.
        },
        "-=0.5" // Start slightly before page fade ends.This is the Position Parameter. It tells this animation to start 0.5 seconds before the previous animation (the page fade) is finished. It creates a fluid, overlapping transition. 
    )

    // pause for 2 seconds
    .to({}, { duration: 2 }) // This animates an "empty object" for 2 seconds. it acts as a built-in timer that keeps the logo on the screen so people can actually read it before it disappears.

    // page Ease-Out (Fade to dark before navigating)
    .to(welcomePage, {  // telling the browser to animate the below towards #welcomePage section.
        opacity: 0, // Fades the entire screen (welcomePage section) back to the background color.
        duration: 0.8, // This specifies that the fade-out should take exactly 0.8 seconds. // Why 0.8? In UI design, anything over 1.0 second feels "slow" or "laggy," and anything under 0.3 seconds feels "abrupt." 0.8 seconds is the "sweet spot" for a dramatic, cinematic exit.

        ease: "power2.inOut", // This makes the fade out(each letter) disappear in a way that starts slow, speed up, and slow down at the end—creating a "silky" professional feel.

        onComplete: () => { // This is a "Callback Function." It waits until the 0.8-second fade is completely finished before executing the code inside., that is, before navigating to "welcome.html"
            window.location.href = "welcome.html";
        }
    });
}