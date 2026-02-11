document.addEventListener("DOMContentLoaded", () => { //This waits until the entire HTML page is loaded and ready before running the JavaScript. If we try to find buttons or inputs, for examplebefore they exist on the page, the code will crash.
    let allUsers = JSON.parse(localStorage.getItem("users")) || [];
    let activeUsers = JSON.parse(localStorage.getItem("activeUser"));

    const account = activeUsers ? activeUsers.account : null; // It uses a "ternary operator" (a shorthand if/else). It asks: "Does activeUsers exist?" if yes, Set account to activeUsers.account. if no, Set account to null.

    // Safety Check: Redirect if not logged in or account not initialized
    if (!activeUsers || !account) {
        window.location.href = "login.html"; // Redirect to login if session is empty. If there is no active user, OR if the active user has no account data, it forces the browser to go to login.html. The return command stops the rest of the code from running.
        return; 
    }

    const emailField = document.querySelector("#amountInput"); 
    const amountField = document.querySelector("#theAmount");  
    const sendBtn = document.querySelector("#send");
    const infoBox = document.querySelector("#recipentInfo");
    const nameSpan = document.querySelector("#recipentName");

    // 
    if (emailField) {
        emailField.addEventListener("input", () => { // This listens for every key the user types into the email field.
            const emailValue = emailField.value.trim().toLowerCase(); // Grabs what was typed, removes extra spaces (trim), and makes it lowercase.
            const isSender = emailValue === activeUsers.email.toLowerCase(); // Checks if the email typed matches the logged-in user's own email, if it does, save it as isSender.

            if (isSender) { 
                nameSpan.textContent = "You cannot send money to yourself";
                infoBox.classList.remove("hidden");
                sendBtn.disabled = true;
                return;
            }

            const foundUser = allUsers.find(u => u.email.toLowerCase() === emailValue); //Searches the main allUsers database for a user with the matching email. 

            if (foundUser) {
                nameSpan.textContent = `${foundUser.firstName} ${foundUser.lastName}`;
                infoBox.classList.remove("hidden");
                sendBtn.disabled = false;
            } else {
                nameSpan.textContent = "No user found";
                infoBox.classList.remove("hidden");
                sendBtn.disabled = true;
            }
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const amount = Number(amountField.value); // Number() ensures the amount is treated as math (e.g., 50) and not text (e.g., "50").

            const emailValue = emailField.value.trim().toLowerCase();


            if (isNaN(amount) || amount <= 0) {
                alert("Please enter a valid positive amount.");
                return;
            }
            if (amount > account.balance) {
                alert("Insufficient Balance!");
                return;
            }

            sendBtn.textContent = "Pending...";
            sendBtn.disabled = true;
            emailField.disabled = true;
            amountField.disabled = true;

            setTimeout(() => { // everything here happens within 2seconds
                // Finding the specific position numbers (indexes) of the sender and recipient, through their emails, in the main allUsers array so we can edit them.
                const recipientIndex = allUsers.findIndex(u => u.email.toLowerCase() === emailValue); // recipent
                const senderIndex = allUsers.findIndex(u => u.email.toLowerCase() === activeUsers.email.toLowerCase()); // sender

                if (recipientIndex !== -1 && senderIndex !== -1) { // Checks if both users were successfully found in the database. (-1 means not found).



                    const dateOfTransaction = new Date().toLocaleString(); // taking the current date and time from the user's computer. ".toLocaleString()" converts that data into a string (like "2/9/2026, 10:30:15 AM").
                    if (!allUsers[senderIndex].account.transactions) allUsers[senderIndex].account.transactions = []; // if it is a user's very first transaction, the transactions list might not exist yet (it's undefined). If you try to add data to something that doesn't exist, the code crashes. This line says: "If the transactions array is missing, create an empty one now."

                    if (!allUsers[recipientIndex].account.transactions) allUsers[recipientIndex].account.transactions = []; // Does the exact same thing as the line above, but for the person receiving the money. It guarantees that both accounts are ready to record data.

                    allUsers[senderIndex].account.transactions.push({ // adding a new object, "transactions", to the sender's array
                        type: "Debit",
                        amount: amount,
                        partner: `Transferred to ${allUsers[recipientIndex].firstName} ${allUsers[recipientIndex].lastName}`,
                        date: dateOfTransaction
                    });
                    // dding a new object, "transactions", to the recipient's array
                    allUsers[recipientIndex].account.transactions.push({
                        type: "Credit",
                        amount: amount,
                        partner: `Transferred from ${allUsers[senderIndex].firstName} ${allUsers[senderIndex].lastName}`,
                        date: dateOfTransaction
                    });


                    
                    allUsers[senderIndex].account.balance -= amount; // subtracting the amount from the sender"s balance
                    allUsers[senderIndex].account.expenses += amount; // adding the amount to the sender's expenses

                    // Updating recipient
                    // Ensuring recipient has an account object first
                    if (!allUsers[recipientIndex].account) {
                        allUsers[recipientIndex].account = { income: 0, expenses: 0, balance: 0 };
                    } // The if statement checks if the recipient has an account object. If not (maybe a brand new user who hasn't logged in yet), it creates one for them so the code doesn't crash.
                    allUsers[recipientIndex].account.balance += amount; // adding the transferred amount to the recipent balance
                    allUsers[recipientIndex].account.income += amount; // adding the transferred amount to the recipent income


                    activeUsers.account = allUsers[senderIndex].account; // Since we modified the allUsers list, through the recipent, we need to make sure the logged-in session (activeUsers) also knows the balance went down.

                    localStorage.setItem("users", JSON.stringify(allUsers));
                    localStorage.setItem("activeUser", JSON.stringify(activeUsers));

                    alert(`Transfer Successful! $${amount.toLocaleString()} sent.`);
                    window.location.href = "Homepage.html";
                } else {
                    alert("Error: Transaction failed. User not found.");
                    resetUI();
                }
            }, 2000);
        });
    }

    function resetUI() {
        sendBtn.textContent = "Send";
        sendBtn.disabled = false;
        emailField.disabled = false;
        amountField.disabled = false;
    }
});