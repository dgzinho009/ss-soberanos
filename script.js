document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  // Alterna a abertura/fechamento do menu ao clicar no botão hamburguer
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
});
