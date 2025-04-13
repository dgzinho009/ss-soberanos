document.addEventListener("DOMContentLoaded", () => {
  const memberForm = document.getElementById("memberForm");
  const playerIdInput = document.getElementById("playerId");
  const gameStyleSelect = document.getElementById("gameStyle");
  const guildWarsMatchesInput = document.getElementById("guildWarsMatches");

  const displayId = document.getElementById("displayId");
  const displayStyle = document.getElementById("displayStyle");
  const displayMatches = document.getElementById("displayMatches");

  // Carregar dados salvos
  const savedId = localStorage.getItem("playerId");
  const savedStyle = localStorage.getItem("gameStyle");
  const savedMatches = localStorage.getItem("guildWarsMatches");

  if (savedId) displayId.textContent = savedId;
  if (savedStyle) displayStyle.textContent = savedStyle;
  if (savedMatches) displayMatches.textContent = savedMatches;

  // Salvar dados no localStorage
  memberForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const playerId = playerIdInput.value.trim();
    const gameStyle = gameStyleSelect.value;
    const guildWarsMatches = guildWarsMatchesInput.value.trim();

    // Validações
    if (!playerId || playerId.length < 3 || /\D/.test(playerId)) {
      alert("Por favor, insira um ID válido (mínimo 3 caracteres, apenas números).");
      return;
    }

    if (!gameStyle) {
      alert("Por favor, selecione um estilo de jogo.");
      return;
    }

    if (isNaN(guildWarsMatches) || guildWarsMatches < 3 || guildWarsMatches > 999) {
      alert("Por favor, insira um número válido de partidas (mínimo 3 e máximo 999).");
      return;
    }

    // Salvar no localStorage
    localStorage.setItem("playerId", playerId);
    localStorage.setItem("gameStyle", gameStyle);
    localStorage.setItem("guildWarsMatches", guildWarsMatches);

    // Atualizar exibição
    displayId.textContent = playerId;
    displayStyle.textContent = gameStyle;
    displayMatches.textContent = guildWarsMatches;

    alert("Perfil salvo com sucesso!");
  });
});
