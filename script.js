document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("btnLogin");
  const usuarioInput = document.getElementById("usuario");

  // Inicializar dados no localStorage, caso ainda não existam
  inicializarDados();

  // Preencher login salvo
  if (usuarioInput && localStorage.getItem("usuarioSalvo")) {
    usuarioInput.value = localStorage.getItem("usuarioSalvo");
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const usuario = sanitizeInput(usuarioInput.value.trim().toLowerCase());
      const senha = sanitizeInput(document.getElementById("senha").value);

      // Salvar login
      localStorage.setItem("usuarioSalvo", usuario);

      if (validarAdmin(usuario, senha)) {
        localStorage.setItem("usuarioTipo", "adm");
        window.location.href = "doindic.html";
      } else if (senha === "123456") {
        localStorage.setItem("usuarioTipo", "membro");
        window.location.href = "doindic.html";
      } else {
        alert("Usuário ou senha inválidos!");
      }
    });
  }

  carregarMembros();
  carregarEstilos();
  carregarMensagens();
});

// Função para validar administrador
function validarAdmin(usuario, senha) {
  const adms = carregarDados("administradores");
  return adms.some((adm) => adm.login === usuario && adm.senha === senha);
}

// Inicializar dados no localStorage
function inicializarDados() {
  // Inicializar lista de administradores
  if (!localStorage.getItem("administradores")) {
    const administradoresIniciais = [
      { login: "dg_admin", senha: "admin123" },
      { login: "lk_admin", senha: "admin123" },
    ];
    localStorage.setItem("administradores", JSON.stringify(administradoresIniciais));
  }

  // Inicializar outras chaves, se necessário
  if (!localStorage.getItem("membros")) {
    localStorage.setItem("membros", JSON.stringify([]));
  }
  if (!localStorage.getItem("mensagens")) {
    localStorage.setItem("mensagens", JSON.stringify([]));
  }
  if (!localStorage.getItem("estilos")) {
    localStorage.setItem("estilos", JSON.stringify([]));
  }
}

// Sanitização de entradas para evitar XSS
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// PAINEL ADM - CRIAR MEMBRO
const formCriarMembro = document.getElementById("formCriarMembro");
if (formCriarMembro) {
  formCriarMembro.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = sanitizeInput(document.getElementById("nomeMembro").value);
    const funcao = sanitizeInput(document.getElementById("funcaoMembro").value);
    const membros = carregarDados("membros");
    membros.push({ nome, funcao });
    salvarDados("membros", membros, true);
    carregarMembros();
    formCriarMembro.reset();
  });
}

// PAINEL ADM - LISTAR MEMBROS
function carregarMembros() {
  const lista = document.getElementById("listaMembros");
  if (lista) {
    lista.innerHTML = "";
    const membros = carregarDados("membros");
    membros.forEach((m) => {
      const li = document.createElement("li");
      li.textContent = `${sanitizeInput(m.nome)} - ${sanitizeInput(m.funcao)}`;
      lista.appendChild(li);
    });
  }
}

// PAINEL MEMBRO - ESTILO DE JOGO
function adicionarEstilo() {
  const estilo = sanitizeInput(document.getElementById("novoEstilo").value);
  if (estilo) {
    const estilos = carregarDados("estilos");
    estilos.push(estilo);
    salvarDados("estilos", estilos, true);
    carregarEstilos();
    document.getElementById("novoEstilo").value = "";
  }
}

function carregarEstilos() {
  const lista = document.getElementById("listaEstilos");
  if (lista) {
    lista.innerHTML = "";
    const estilos = carregarDados("estilos");
    estilos.forEach((e) => {
      const li = document.createElement("li");
      li.textContent = sanitizeInput(e);
      lista.appendChild(li);
    });
  }
}

// PAINEL MEMBRO - JUSTIFICATIVA
function enviarMotivo() {
  const motivo = sanitizeInput(document.getElementById("motivoInput").value);
  if (motivo) {
    const mensagens = carregarDados("mensagens");
    mensagens.push({ tipo: "Justificativa", texto: motivo });
    salvarDados("mensagens", mensagens, true);
    document.getElementById("motivoInput").value = "";
    alert("Justificativa enviada!");
  }
}

// PAINEL MEMBRO - DENÚNCIA COM IMAGEM
function enviarDenuncia() {
  const nome = sanitizeInput(document.getElementById("nomeDenunciado").value);
  const detalhe = sanitizeInput(document.getElementById("detalheDenuncia").value);
  const imagem = document.getElementById("evidenciaImagem").files[0];

  if (nome && detalhe) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imagemBase64 = imagem ? e.target.result : null;
      const mensagens = carregarDados("mensagens");
      mensagens.push({
        tipo: "Denúncia",
        nome,
        detalhe,
        imagem: imagemBase64,
      });
      salvarDados("mensagens", mensagens, true);
      alert("Denúncia enviada!");
      document.getElementById("nomeDenunciado").value = "";
      document.getElementById("detalheDenuncia").value = "";
      document.getElementById("evidenciaImagem").value = "";
    };

    if (imagem) {
      reader.readAsDataURL(imagem);
    } else {
      reader.onload();
    }
  } else {
    alert("Preencha os campos obrigatórios!");
  }
}

// PAINEL ADM E MEMBRO - VER MENSAGENS
function carregarMensagens() {
  const lista = document.getElementById("mensagensMembro");
  if (lista) {
    lista.innerHTML = "";
    const mensagens = carregarDados("mensagens");
    mensagens.forEach((msg) => {
      const li = document.createElement("li");
      if (msg.tipo === "Justificativa") {
        li.innerHTML = `<strong>Justificativa:</strong> ${sanitizeInput(msg.texto)}`;
      } else if (msg.tipo === "Denúncia") {
        li.innerHTML = `
          <strong>Denúncia contra:</strong> ${sanitizeInput(msg.nome)}<br/>
          <strong>Detalhes:</strong> ${sanitizeInput(msg.detalhe)}<br/>
          ${
            msg.imagem
              ? `<a href="${sanitizeInput(msg.imagem)}" target="_blank">Ver Evidência</a>`
              : "Sem imagem"
          }
        `;
      }
      lista.appendChild(li);
    });
  }
}

// Funções auxiliares para manipulação de dados
function salvarDados(chave, valor, substituir = false) {
  const dadosAtuais = JSON.parse(localStorage.getItem(chave)) || [];
  const novosDados = substituir ? valor : [...dadosAtuais, valor];
  localStorage.setItem(chave, JSON.stringify(novosDados));
}

function carregarDados(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}
