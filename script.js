document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const menuLinks = document.querySelectorAll(".menu li a");

  // Alterna a abertura/fechamento do menu ao clicar no botão hambúrguer
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Fecha o menu ao clicar em qualquer link
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
});
