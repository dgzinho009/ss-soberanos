document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const tipo = document.getElementById("tipoUsuario").value;

  if (usuario && senha && tipo) {
    if (tipo === "adm") {
      window.location.href = "painel_adm.html";
    } else if (tipo === "membro") {
      window.location.href = "painel_membro.html";
    }
  } else {
    alert("Preencha todos os campos corretamente.");
  }
});
