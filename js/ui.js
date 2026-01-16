/* =========================
   UI.JS
   jQuery 
   ========================= */

$(document).ready(function () {

  // Animación de entrada
  $(".card").hide().fadeIn(700);

  // Feedback visual al enviar formularios
  $("form").on("submit", function () {
    $(".alert")
      .fadeIn()
      .delay(2000)
      .fadeOut();
  });

});
