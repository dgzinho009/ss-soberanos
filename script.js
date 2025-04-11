// Função para adicionar estilo de jogo
function adicionarEstilo() {
  const novoEstilo = document.getElementById('novoEstilo').value;
  if (novoEstilo) {
    let estilos = JSON.parse(localStorage.getItem('estilos')) || [];
    estilos.push(novoEstilo);
    localStorage.setItem('estilos', JSON.stringify(estilos));
    atualizarEstilos();
  }
}

// Função para atualizar a lista de estilos
function atualizarEstilos() {
  const listaEstilos = document.getElementById('listaEstilos');
  listaEstilos.innerHTML = '';
  const estilos = JSON.parse(localStorage.getItem('estilos')) || [];
  estilos.forEach(estilo => {
    const li = document.createElement('li');
    li.textContent = estilo;
    listaEstilos.appendChild(li);
  });
}

// Função para enviar a justificativa
function enviarMotivo() {
  const motivo = document.getElementById('motivoInput').value;
  if (motivo) {
    localStorage.setItem('justificativa', motivo);
    alert("Justificativa enviada com sucesso!");
  }
}

// Função para enviar a denúncia
function enviarDenuncia() {
  const nomeDenunciado = document.getElementById('nomeDenunciado').value;
  const detalheDenuncia = document.getElementById('detalheDenuncia').value;
  const evidenciaImagem = document.getElementById('evidenciaImagem').files[0];

  if (nomeDenunciado && detalheDenuncia && evidenciaImagem) {
    const formData = new FormData();
    formData.append('nomeDenunciado', nomeDenunciado);
    formData.append('detalheDenuncia', detalheDenuncia);
    formData.append('evidenciaImagem', evidenciaImagem);

    // Enviar dados para o servidor ou salvar no localStorage
    localStorage.setItem('denuncia', JSON.stringify({
      nomeDenunciado,
      detalheDenuncia,
      evidenciaImagem: evidenciaImagem.name
    }));
    
    alert("Denúncia enviada com sucesso!");
  }
}

// Função para carregar as informações salvas (Estilos, Justificativa, Denúncia)
function carregarDados() {
  atualizarEstilos();
  const justificativa = localStorage.getItem('justificativa');
  if (justificativa) {
    document.getElementById('motivoInput').value = justificativa;
  }
  
  const denuncia = JSON.parse(localStorage.getItem('denuncia'));
  if (denuncia) {
    // Exibir as informações de denúncia se necessário
    console.log('Denúncia:', denuncia);
  }
}

// Carregar dados ao carregar a página
window.onload = carregarDados;
