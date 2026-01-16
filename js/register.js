/* =========================
   REGISTER.JS
   Registro con jQuery + Bootstrap
   ========================= */

$(document).ready(function () {

  const $form = $("#registerForm");
  const $errorAlert = $("#registerError");
  const $successAlert = $("#registerSuccess");

  $form.on("submit", function (e) {
    e.preventDefault();

    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    // Ocultar mensajes con animación
    $errorAlert.stop(true, true).fadeOut(200);
    $successAlert.stop(true, true).fadeOut(200);

    if (password !== confirmPassword) {
      $errorAlert
        .removeClass("d-none")
        .fadeIn(300);
      return;
    }

    // Éxito
    $successAlert
      .removeClass("d-none")
      .fadeIn(300);

    // Limpiar formulario
    this.reset();
  });
  setTimeout(() => {
  $successAlert.fadeOut(500);
}, 6000);


});
