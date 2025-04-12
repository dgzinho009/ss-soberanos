document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const chaveAcesso = document.getElementById("chaveAcesso").value.trim();
      const isValid = await validarChaveAcesso(chaveAcesso);

      if (isValid) {
        window.location.href = "painel_membro.html";
      } else {
        exibirErro("Chave de acesso inválida!");
      }
    });
  }
});

// Simulação de validação no backend
async function validarChaveAcesso(chave) {
  const chavesValidas = await fetchBackendData("chavesAcesso");
  return chavesValidas.includes(chave);
}

// Exibir mensagem de erro
function exibirErro(mensagem) {
  const mensagemErro = document.getElementById("mensagemErro");
  mensagemErro.style.display = "block";
  mensagemErro.textContent = mensagem;
}

// Mock de backend: Simula fetch do backend
async function fetchBackendData(endpoint) {
  const backendSimulado = {
    chavesAcesso: ["chave-1234", "chave-5678"],
  };
  return backendSimulado[endpoint] || [];
}
