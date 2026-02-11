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