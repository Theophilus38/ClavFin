const users = JSON.parse(localStorage.getItem("users")) || [];
let activeUsers = JSON.parse(localStorage.getItem("activeUser"));

if (!activeUsers) {
  // not logged in, then redirect. It checks if activeUsers is "falsy" (null or undefined). If the variable is empty (meaning no one is logged in), it immediately forces the browser to go to the login.html page.
  window.location.href = "login.html";
}

const currentUser = users.find(
  user => user.email.toLowerCase() === activeUsers.email.toLowerCase()
); // searches the main users list to find the specific remail that matches the currently logged-in person and saved it as currentUser

if (!currentUser) {
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

activeUsers.account = { ...currentUser.account } // creating another copy of the account data through spread opeartor and save it as activeUsers.account, This is where the account is being added tp activeUsers. 
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
const userName3 = document.querySelector("#userName3")

if (activeUser) { // if there is active user, do the below: 
  if (homeProfilePic) homeProfilePic.src = activeUser.profilePicture || "Avatar.jpg"; // if the user does not have a profile picture uploaded in settings page yet, display a default avatar. 
  if (userName) userName.textContent = `${activeUser.firstName} ${activeUser.lastName}`;

   if (userName3) userName3.textContent = `${activeUser.firstName} ${activeUser.lastName}`;
}



const dateSelect = document.querySelector("#date");

if (dateSelect) {
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


