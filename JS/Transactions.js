
document.addEventListener("DOMContentLoaded", () => { // waiting till the html strucucture is fully loaded
    // Geting the current logged-in user
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    const logTable = document.querySelector("#transactionLog");
    const emptyState = document.querySelector("#emptyState");

    // If no user is logged in, send them back
    if (!activeUser) {
        window.location.href = "login.html";
        return;
    }

    // Extract transactions from the user's account
    const transactions = activeUser.account.transactions || []; // This looks for the transactions array inside the user's account. The || [] is a fallback: if the user has never sent money before and that array doesn't exist, it creates an empty list ([]) so the code doesn't crash.

    // Checking if there is data to show
    if (transactions.length === 0) {
        emptyState.classList.remove("hidden");
        document.querySelector("#historyTable").classList.add("hidden");
    } else {
        // Reverse to show the newest transactions at the top
        const sortedTransactions = [...transactions].reverse(); // Transactions are usually added to the end of a list. To show the newest transfers at the top, we use .reverse(). We use [...transactions] (the spread operator) to make a copy first so we don't mess up the original order in the database.

        sortedTransactions.forEach(tx => {
            const isDebit = tx.type === "Debit"; // We loop through every transaction (tx) in the list. It checks if the type is "Debit" (money sent) and creates a new empty table row (<tr>) for each one.
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="thedate">${tx.date}</td>

                <td class ="partnerName"><strong>${tx.partner}</strong></td>

                <td>
                    <span class="badge ${isDebit ? 'bg-debit' : 'bg-credit'}">
                        ${tx.type}
                    </span>
                </td>

                <td class="amountttt ${isDebit ? 'amt-debit' : 'amt-credit'}">
                    ${isDebit ? '-' : '+'}$${tx.amount.toLocaleString()}
                </td>
            `;

           
            logTable.appendChild(row);
        });
    }
});