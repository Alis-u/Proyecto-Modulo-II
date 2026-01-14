/* =========================
   TRANSACTIONS.JS
   Historial de movimientos
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("transactionList");

  if (!list) return;

  const transactions = getTransactions();

  // Si no hay movimientos
  if (transactions.length === 0) {
    list.innerHTML = `
      <li class="list-group-item text-center text-muted">
        No hay movimientos registrados
      </li>
    `;
    return;
  }

  // Renderizar movimientos
  transactions.forEach((tx) => {
    const item = document.createElement("li");
    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    // Texto principal
    const info = document.createElement("div");
    info.innerHTML = `
      <strong>${tx.type}</strong><br>
      <small class="text-muted">${tx.date}</small>
    `;

    // Monto
    const amount = document.createElement("span");
    amount.classList.add("fw-bold");

    // Color según tipo
    if (tx.type === "Depósito") {
      amount.classList.add("text-success");
      amount.textContent = `+$${tx.amount.toLocaleString()}`;
    } else {
      amount.classList.add("text-danger");
      amount.textContent = `-$${tx.amount.toLocaleString()}`;
    }

    item.appendChild(info);
    item.appendChild(amount);
    list.appendChild(item);
  });
});
