// Funções genéricas para salvar e carregar dados simulados no backend
function salvarDados(chave, valor, substituir = false) {
  const dadosAtuais = JSON.parse(localStorage.getItem(chave)) || [];
  const novosDados = substituir ? valor : [...dadosAtuais, valor];
  localStorage.setItem(chave, JSON.stringify(novosDados));
}

function carregarDados(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}