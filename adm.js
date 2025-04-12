document.addEventListener("DOMContentLoaded", () => {
  carregarChaves();

  const gerarChaveBtn = document.querySelector(".gerar-chave button");
  if (gerarChaveBtn) {
    gerarChaveBtn.addEventListener("click", gerarChave);
  }
});

/**
 * Gera uma nova chave de acesso e a adiciona à lista.
 */
function gerarChave() {
  const novaChave = "chave-" + Math.random().toString(36).substr(2, 8);

  // Verificar se a chave já existe
  let chaves = carregarDados("chavesAcesso") || [];
  if (chaves.includes(novaChave)) {
    alert("Erro: Chave duplicada gerada. Tente novamente.");
    return;
  }

  // Salvar a nova chave
  chaves.push(novaChave);
  salvarDados("chavesAcesso", chaves);

  carregarChaves();
  alert("Nova chave gerada: " + novaChave);
}

/**
 * Carrega todas as chaves salvas e exibe na lista.
 */
function carregarChaves() {
  const lista = document.getElementById("listaChaves");
  const chaves = carregarDados("chavesAcesso") || [];
  lista.innerHTML = "";

  if (chaves.length === 0) {
    const vazio = document.createElement("p");
    vazio.textContent = "Nenhuma chave disponível.";
    lista.appendChild(vazio);
    return;
  }

  chaves.forEach((chave, index) => {
    const li = document.createElement("li");
    li.textContent = chave;

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = () => {
      removerChave(index);
      carregarChaves();
    };

    li.appendChild(btnExcluir);
    lista.appendChild(li);
  });
}

/**
 * Remove uma chave da lista pelo índice.
 * @param {number} index - O índice da chave a ser removida.
 */
function removerChave(index) {
  let chaves = carregarDados("chavesAcesso") || [];
  chaves.splice(index, 1);
  salvarDados("chavesAcesso", chaves);
  alert("Chave removida com sucesso.");
}

/**
 * Carrega dados do localStorage.
 * @param {string} chave - A chave para buscar os dados.
 * @returns {Array} Dados salvos ou um array vazio.
 */
function carregarDados(chave) {
  try {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return [];
  }
}

/**
 * Salva dados no localStorage.
 * @param {string} chave - A chave para armazenar os dados.
 * @param {Array} valor - O valor a ser salvo.
 */
function salvarDados(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    alert("Erro ao salvar dados. Verifique o armazenamento disponível.");
  }
}
