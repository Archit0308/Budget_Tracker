// Add event listener to form submission
document.getElementById('expForm').addEventListener('submit', addTransaction);

// Read initial array of transactions from localStorage or set to empty array if not found
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Add a new transaction
function addTransaction(e) {
  e.preventDefault();

  // Get type, name, and amount
  const type = document.getElementById('type').value;
  const name = document.getElementById('name').value;
  const amount = document.getElementById('amount').value;

  // Validate input
  if (type !== 'chooseOne' && name.length > 0 && amount > 0) {
    const transaction = {
      type,
      name,
      amount,
      id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
    };

    // Add transaction to array and store in localStorage
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  // Reset form, update transactions table, and balance
  document.getElementById('expForm').reset();
  showTransactions();
  updateBalance();
}

// Display all transactions in table
function showTransactions() {
  const transactionTable = document.getElementById('transactionTable');

  // Clear table content
  transactionTable.innerHTML = '';

  // Add transactions to table
  for (const transaction of transactions) {
    transactionTable.innerHTML += `
      <tr>
        <td>${transaction.type}</td>
        <td>${transaction.name}</td>
        <td>$${transaction.amount}</td>
        <td>
          <a class="deleteButton" onclick="deleteTransaction(${transaction.id})">Delete</a>
        </td>
      </tr>
    `;
  }
}

// Delete a transaction by ID
function deleteTransaction(id) {
  const index = transactions.findIndex((transaction) => transaction.id === id);

  if (index !== -1) {
    transactions.splice(index, 1);

    // Store updated transactions in localStorage and update table and balance
    localStorage.setItem('transactions', JSON.stringify(transactions));
    showTransactions();
    updateBalance();
  }
}

// Update balance based on transactions
function updateBalance() {
  let balance = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      balance += Number(transaction.amount);
    } else if (transaction.type === 'expense') {
      balance -= Number(transaction.amount);
    }
  });

  document.querySelector('.balance').textContent = balance;
}
