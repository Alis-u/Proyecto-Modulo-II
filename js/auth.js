/* =========================
   AUTH.JS
   Manejo de login y logout
   ========================= */

// Usuario simulado (no hay backend)
const USER = {
  email: "user@alkewallet.cl",
  password: "123456"
};

document.addEventListener("DOMContentLoaded", () => {

  /* LOGIN */
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (email === USER.email && password === USER.password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "menu.html";
      } else {
        alert("Credenciales incorrectas");
      }
    });
  }

  /* LOGOUT */
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "login.html";
    });
  }

  /* PROTECCIÓN DE RUTAS */
  if (
    !localStorage.getItem("loggedIn") &&
    !window.location.pathname.includes("login.html")
  ) {
    window.location.href = "login.html";
  }
});
