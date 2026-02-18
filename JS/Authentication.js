function protectPage() {
    const activeUser = sessionStorage.getItem("activeUser");
    const user = localStorage.getItem("users");

    if (!activeUser) {
        window.location.href = "signup.html";
    } // note that since session storage is used, and the landing page is the first page a user, whether active or not, comes first when visiting the website, there will never be an active user as at the time a user lands on the landing page. Thus, every user is redirected to the sign up page when any nav button is clicked. The reason for this is because session storage empties out immediately the tab is closesd, it is unlike local storage that stays forever. So whenever a user comes on the page, hec or she is comung tpo the landing page as someone who has no record in the active user
}