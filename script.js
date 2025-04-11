// Função: Adicionar Estilo de Jogo
function adicionarEstilo() {
  const estiloInput = document.getElementById('novoEstilo');
  const lista = document.getElementById('listaEstilos');
  const estilo = estiloInput.value.trim();

  if (estilo) {
    const li = document.createElement('li');
    li.textContent = estilo;
    lista.appendChild(li);

    let estilos = JSON.parse(localStorage.getItem('estilosJogo')) || [];
    estilos.push(estilo);
    localStorage.setItem('estilosJogo', JSON.stringify(estilos));

    estiloInput.value = '';
  }
}

// Carregar estilos no carregamento da página
window.addEventListener('load', () => {
  const estilosSalvos = JSON.parse(localStorage.getItem('estilosJogo')) || [];
  estilosSalvos.forEach(estilo => {
    const li = document.createElement('li');
    li.textContent = estilo;
    document.getElementById('listaEstilos').appendChild(li);
  });

  carregarMensagens();
});

// Função: Enviar Justificativa
function enviarMotivo() {
  const motivo = document.getElementById('motivoInput').value.trim();

  if (motivo) {
    let mensagens = JSON.parse(localStorage.getItem('mensagensADM')) || [];
    mensagens.push({ tipo: 'justificativa', conteudo: motivo, data: new Date().toLocaleString() });
    localStorage.setItem('mensagensADM', JSON.stringify(mensagens));

    document.getElementById('motivoInput').value = '';
    document.getElementById('feedbackMotivo').textContent = 'Justificativa enviada com sucesso!';
    setTimeout(() => {
      document.getElementById('feedbackMotivo').textContent = '';
    }, 3000);
  }
}

// Função: Enviar Denúncia
function enviarDenuncia() {
  const nome = document.getElementById('nomeDenunciado').value.trim();
  const detalhes = document.getElementById('detalheDenuncia').value.trim();
  const imagem = document.getElementById('evidenciaImagem').files[0];

  if (nome && detalhes) {
    let denuncia = {
      tipo: 'denuncia',
      nome,
      detalhes,
      data: new Date().toLocaleString()
    };

    if (imagem) {
      const leitor = new FileReader();
      leitor.onload = function(e) {
        denuncia.imagem = e.target.result; // Base64
        salvarDenuncia(denuncia);
      };
      leitor.readAsDataURL(imagem);
    } else {
      salvarDenuncia(denuncia);
    }
  }
}

// Função auxiliar: Salvar Denúncia
function salvarDenuncia(denuncia) {
  let mensagens = JSON.parse(localStorage.getItem('mensagensADM')) || [];
  mensagens.push(denuncia);
  localStorage.setItem('mensagensADM', JSON.stringify(mensagens));

  document.getElementById('nomeDenunciado').value = '';
  document.getElementById('detalheDenuncia').value = '';
  document.getElementById('evidenciaImagem').value = '';
  document.getElementById('feedbackDenuncia').textContent = 'Denúncia enviada com sucesso!';
  setTimeout(() => {
    document.getElementById('feedbackDenuncia').textContent = '';
  }, 3000);
}

// Caixa de Correio do Membro (opcional: simulação de mensagens recebidas)
function carregarMensagens() {
  const mensagens = JSON.parse(localStorage.getItem('mensagensMembro')) || [];
  const lista = document.getElementById('mensagensMembro');
  lista.innerHTML = '';

  mensagens.forEach(msg => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${msg.titulo || 'Mensagem'}:</strong> ${msg.conteudo} <em>(${msg.data})</em>`;
    lista.appendChild(li);
  });
}
