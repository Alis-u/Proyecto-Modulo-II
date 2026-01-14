/* =========================
   SENDMONEY.JS
   Gestión de contactos y envío de dinero
   ========================= */

/* ---------- CONTACTOS ---------- */

// Inicializar contactos si no existen
if (!localStorage.getItem("contacts")) {
  localStorage.setItem("contacts", JSON.stringify([]));
}

// Obtener contactos
function getContacts() {
  return JSON.parse(localStorage.getItem("contacts"));
}

// Guardar contactos
function saveContacts(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Renderizar contactos en el select
function renderContacts() {
  const contactSelect = document.getElementById("contact");
  if (!contactSelect) return;

  contactSelect.innerHTML = `<option value="">Selecciona un contacto</option>`;

  getContacts().forEach((contact, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${contact.name} - ${contact.bank}`;
    contactSelect.appendChild(option);
  });
}

/* ---------- DOM CONTENT LOADED ---------- */

document.addEventListener("DOMContentLoaded", () => {

  renderContacts();

  const toggleBtn = document.getElementById("toggleContactForm");
  const newContactForm = document.getElementById("newContactForm");
  const saveContactBtn = document.getElementById("saveContactBtn");
  const sendForm = document.getElementById("sendForm");

  /* ---------- MOSTRAR / OCULTAR FORM CONTACTO ---------- */
  toggleBtn.addEventListener("click", () => {
    newContactForm.classList.toggle("d-none");
  });

  /* ---------- GUARDAR NUEVO CONTACTO ---------- */
  saveContactBtn.addEventListener("click", () => {

    const name = document.getElementById("contactName").value.trim();
    const rut = document.getElementById("contactRut").value.trim();
    const bank = document.getElementById("contactBank").value.trim();
    const account = document.getElementById("contactAccount").value.trim();

    // Validaciones
    if (!name || !rut || !bank || !account) {
      alert("Completa todos los campos del contacto");
      return;
    }

    if (account.length < 6 || isNaN(account)) {
      alert("El número de cuenta debe tener al menos 6 dígitos");
      return;
    }

    const contacts = getContacts();

    contacts.push({
      name,
      rut,
      bank,
      account
    });

    saveContacts(contacts);
    renderContacts();

    // Limpiar formulario
    document.getElementById("contactName").value = "";
    document.getElementById("contactRut").value = "";
    document.getElementById("contactBank").value = "";
    document.getElementById("contactAccount").value = "";

    newContactForm.classList.add("d-none");

    alert("Contacto agregado correctamente");
  });

  /* ---------- ENVÍO DE DINERO ---------- */
  sendForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const contactIndex = document.getElementById("contact").value;
    const amount = Number(document.getElementById("amount").value);

    if (contactIndex === "") {
      alert("Selecciona un contacto");
      return;
    }

    if (amount <= 0 || isNaN(amount)) {
      alert("Ingresa un monto válido");
      return;
    }

    const balance = getBalance();

    if (amount > balance) {
      alert("Saldo insuficiente");
      return;
    }

    const contact = getContacts()[contactIndex];

    // Descontar saldo
    setBalance(balance - amount);

    // Guardar transacción
    saveTransaction(
      "Transferencia",
      amount,
      `Envío a ${contact.name}`
    );

    alert(`Transferencia realizada a ${contact.name}`);

    sendForm.reset();
  });

});
