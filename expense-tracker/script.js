const form = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceEl = document.getElementById('balance');

let transactions = [];

form.addEventListener('submit', e => {
    e.preventDefault();

    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;

    if(description !== '' && !isNaN(amount)) {
        const transaction = {
            id: Date.now(),
            description,
            amount,
            type,
            category
        };
        transactions.push(transaction);
        updateUI();
        form.reset();
    }
});

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateUI();
}

function updateUI() {
    transactionList.innerHTML = '';

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(t => {
        const li = document.createElement('li');
        li.classList.add(t.type);
        li.innerHTML = `
            <span>${t.description} (${t.category})</span>
            <span>£${t.amount.toFixed(2)}</span>
            <button onclick="deleteTransaction(${t.id})">Delete</button>
        `;
        transactionList.appendChild(li);

        if(t.type === 'income') totalIncome += t.amount;
        else totalExpenses += t.amount;
    });

    totalIncomeEl.textContent = `£${totalIncome.toFixed(2)}`;
    totalExpensesEl.textContent = `£${totalExpenses.toFixed(2)}`;
    balanceEl.textContent = `£${(totalIncome - totalExpenses).toFixed(2)}`;
}

updateUI();