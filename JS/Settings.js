const userdetails1 = JSON.parse(localStorage.getItem("activeUser"));
const userFirstName1 = userdetails1.firstName;
const userLastName1 = userdetails1.lastName;
document.querySelector("#userName1").textContent =
  `${userFirstName1} ${userLastName1}`;

const updateButton = document.querySelector("#button1");
const profilePicture = document.querySelector("#profilePicture");
const photoInput = document.querySelector("#photoInput");

let activeUser = JSON.parse(localStorage.getItem("activeUser")); // getting data of the person that is currently logged in from the local storage
let users = JSON.parse(localStorage.getItem("users")) || []; // getting the data of everyone who has registered from the local storage, or if no one has registerd, let it be empty array

function init() {
  if (!activeUser) {
    console.error("No active user found. Make sure you are logged in!");
    return;
  }

  // Checking if the user already has a picture saved
  if (activeUser.profilePicture) {
    // activeUser.profilePicture is defined below. This means If the person logged in has a profile picture, then do the below
    // OLD USER: Show their saved picture and set button to "Change"
    profilePicture.src = activeUser.profilePicture;
    updateButton.textContent = "Change Profile Picture";
  } else {
    // NEW USER: if the person logged in has no profile picture:
    profilePicture.src = "Avatar.jpg";
    updateButton.textContent = "Upload Profile Picture";
  }
}
init(); // calling the function

updateButton.addEventListener("click", () => {
  photoInput.click(); // when the button is clicked, the hidden file input is automatically clicked too. it then automatically opens the user's file in order to upload picture
});

photoInput.addEventListener("change", (e) => {
  const file = e.target.files[0]; // once the user picks a file from their ccomputer, the first file they pick is grab and saved as "file"

  if (file) {
    const reader = new FileReader(); // "new FileReader()" is an ib-built JavaScript method that converts files into a string of text that javascript can read. JS can not read a file, like pictures, unless it is converted.

    reader.onload = () => {
      const image = reader.result; // the reader.result is in form of url, it is saved as image
      saveAndRefresh(image); // reader.onload" here means that after javascript has finished reading the file, then it should perform the function below
    };

    reader.readAsDataURL(file); // this is what makes the file to be read as text(url). it converts the image to text
  }
});

function saveAndRefresh(image) {
  profilePicture.src = image; // the result after reading, which is a url, now becomes the ProfilePicture src
  updateButton.textContent = "Change Profile Picture";

  activeUser.profilePicture = image; //the url for the image gets stored in the local storage for the person that is currently logged in

  users = users.map((user) => {
    if (user.email === activeUser.email) {
      return activeUser; // this loops through the users array in the local storage, finds an email that is equal to the email of the person logged in(user.email === active.email) , if there is, then it returns the active user(person currently logged in), whhich now contains the profilePicture
    }
    return user; // this loops through the users array in the local storage, finds an email that is equal to the email of the person logged in(user.email === active.email), if there is, return the info of that person(user), which now contains the uploaded picture
  });

  localStorage.setItem("activeUser", JSON.stringify(activeUser)); // saving the returned data of the person logged in back into the local storage
  localStorage.setItem("users", JSON.stringify(users)); // saving all the users, including the newly updated user that just updates their picture back into the local storage

  photoInput.value = ""; // emptying the input field so a user can uploasd a picture again

  alert("Profile picture updated successfully!"); // show this after everything is done
}


const deleteAccount = document.querySelector("#delete");

deleteAccount.addEventListener("click", deleted);

function deleted() {
  const deleting = document.querySelector("#deleting");
  deleting.style.display = "block";

  const no = document.querySelector("#no");
  no.addEventListener("click", () => {
    deleting.style.display = "none";
  });
}

const yes = document.querySelector("#yes");

yes.addEventListener("click", () => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (activeUser) {

        const newUsersList = allUsers.filter((user) => user.email !== activeUser.email); // filtering out the active user by creating a list of all other users with emails not equals to that of the active user. Map can not be used here because map loops through an array and returns a new array with the same number of items in the previous array. Filter however removes an item or items from a list, and returns a new array, not including the removed items

        localStorage.setItem("users", JSON.stringify(newUsersList)); // saving the new list of users back into the local storage

        localStorage.removeItem("activeUser"); // removing the active user from the local storage

        window.location.href = "../signup.html";
    }
});
