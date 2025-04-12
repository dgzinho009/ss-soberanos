// Função para salvar dados no localStorage
// chave: a chave onde os dados serão armazenados
// valor: o dado a ser salvo (pode ser um objeto, array, etc.)
// substituir: se true, substitui todos os dados existentes pela nova entrada
function salvarDados(chave, valor, substituir = false) {
  const dadosAtuais = JSON.parse(localStorage.getItem(chave)) || [];
  const novosDados = substituir ? valor : [...dadosAtuais, valor];
  localStorage.setItem(chave, JSON.stringify(novosDados));
}

// Função para carregar dados do localStorage
// chave: a chave de onde os dados serão carregados
// Retorna os dados armazenados ou um array vazio se não houver dados
function carregarDados(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}
