document.addEventListener("DOMContentLoaded", () => {
  carregarChaves();

  const gerarChaveBtn = document.querySelector(".gerar-chave button");
  if (gerarChaveBtn) {
    gerarChaveBtn.addEventListener("click", gerarChave);
  }
});

function gerarChave() {
  const novaChave = "chave-" + Math.random().toString(36).substr(2, 8);
  salvarDados("chavesAcesso", novaChave);
  carregarChaves();
  alert("Nova chave gerada: " + novaChave);
}

function carregarChaves() {
  const lista = document.getElementById("listaChaves");
  const chaves = carregarDados("chavesAcesso");
  lista.innerHTML = "";

  chaves.forEach((chave, index) => {
    const li = document.createElement("li");
    li.textContent = chave;
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = function () {
      removerChave(index);
      carregarChaves();
    };
    li.appendChild(btnExcluir);
    lista.appendChild(li);
  });
}

function removerChave(index) {
  const chaves = carregarDados("chavesAcesso");
  chaves.splice(index, 1);
  salvarDados("chavesAcesso", chaves, true);
}