/* =========================
   WALLET.JS
   Manejo de saldo y transacciones
   ========================= */

/* ---------- SALDO ---------- */

// Inicializa el saldo si no existe en localStorage
if (!localStorage.getItem("balance")) {
  localStorage.setItem("balance", JSON.stringify(50000));
}

// Obtiene el saldo actual
function getBalance() {
  return JSON.parse(localStorage.getItem("balance"));
}

// Guarda un nuevo saldo
function setBalance(amount) {
  localStorage.setItem("balance", JSON.stringify(amount));
}

/* ---------- TRANSACCIONES ---------- */

// Inicializa el historial si no existe
if (!localStorage.getItem("transactions")) {
  localStorage.setItem("transactions", JSON.stringify([]));
}

// Guarda una transacción en el historial
function saveTransaction(type, amount, description = "") {
  const transactions = JSON.parse(localStorage.getItem("transactions"));

  const newTransaction = {
    type: type,
    amount: amount,
    description: description,
    date: new Date().toLocaleDateString()
  };

  transactions.unshift(newTransaction); // Agrega al inicio
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Obtiene todas las transacciones
function getTransactions() {
  return JSON.parse(localStorage.getItem("transactions"));
}

/* ---------- UI ---------- */

// Renderiza el saldo en pantalla
function renderBalance() {
  const balanceEl = document.getElementById("balance");
  if (balanceEl) {
    balanceEl.textContent = `$${getBalance().toLocaleString()}`;
  }
}

/* ---------- EVENTOS ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderBalance();

  const depositForm = document.getElementById("depositForm");

  if (depositForm) {
    depositForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const amountInput = document.getElementById("amount");
      const amount = Number(amountInput.value);

      // Validación básica
      if (amount <= 0 || isNaN(amount)) {
        alert("Ingrese un monto válido");
        return;
      }

      // Actualiza saldo
      setBalance(getBalance() + amount);

      // Guarda transacción
      saveTransaction("Depósito", amount);

      // Actualiza UI
      renderBalance();
      depositForm.reset();
    });
  }
});
// Forzar render del saldo al volver a la página
window.addEventListener("pageshow", () => {
  renderBalance();
});
