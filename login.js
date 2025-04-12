document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const usuario = document.getElementById("usuario").value.trim();

      if (usuario) {
        window.location.href = "painel_membro.html";
      } else {
        alert("Por favor, insira um nome de usuário.");
      }
    });
  }
});
