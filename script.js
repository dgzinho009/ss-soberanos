document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("btnLogin");
  const usuarioInput = document.getElementById("usuario");

  // Preencher login salvo
  if (usuarioInput && localStorage.getItem("usuarioSalvo")) {
    usuarioInput.value = localStorage.getItem("usuarioSalvo");
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const usuario = usuarioInput.value.trim().toLowerCase();
      const senha = document.getElementById("senha").value;

      // Salvar login
      localStorage.setItem("usuarioSalvo", usuario);

      if ((usuario === "dg" || usuario === "lk") && senha === "admin123") {
        localStorage.setItem("usuarioTipo", "adm");
        window.location.href = "doindic.html";
      } else if (senha === "123") {
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

// Função para gerar sensibilidade usando API
function gerarSensi() {
  fetch("https://sensibilidadeapi.vercel.app/api")
    .then(res => res.json())
    .then(data => {
      const texto = `
        DPI: ${data.dpi}
        Geral: ${data.geral}
        Mira Red Dot: ${data.redDot}
        Mira 2x: ${data.mira2x}
        Mira 4x: ${data.mira4x}
        AWM: ${data.awm}
        Olhadinha: ${data.olhadinha}
      `;
      document.getElementById("resultadoSensi").innerText = texto;
    })
    .catch(() => {
      document.getElementById("resultadoSensi").innerText = "Erro ao gerar sensi.";
    });
}

// PAINEL ADM - CRIAR MEMBRO
const formCriarMembro = document.getElementById("formCriarMembro");
if (formCriarMembro) {
  formCriarMembro.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nomeMembro").value;
    const funcao = document.getElementById("funcaoMembro").value;
    const membros = JSON.parse(localStorage.getItem("membros")) || [];
    membros.push({ nome, funcao });
    localStorage.setItem("membros", JSON.stringify(membros));
    carregarMembros();
    formCriarMembro.reset();
  });
}

// PAINEL ADM - LISTAR MEMBROS
function carregarMembros() {
  const lista = document.getElementById("listaMembros");
  if (lista) {
    lista.innerHTML = "";
    const membros = JSON.parse(localStorage.getItem("membros")) || [];
    membros.forEach(m => {
      const li = document.createElement("li");
      li.textContent = `${m.nome} - ${m.funcao}`;
      lista.appendChild(li);
    });
  }
}

// PAINEL MEMBRO - ESTILO DE JOGO
function adicionarEstilo() {
  const estilo = document.getElementById("novoEstilo").value;
  if (estilo) {
    const estilos = JSON.parse(localStorage.getItem("estilos")) || [];
    estilos.push(estilo);
    localStorage.setItem("estilos", JSON.stringify(estilos));
    carregarEstilos();
    document.getElementById("novoEstilo").value = "";
  }
}

function carregarEstilos() {
  const lista = document.getElementById("listaEstilos");
  if (lista) {
    lista.innerHTML = "";
    const estilos = JSON.parse(localStorage.getItem("estilos")) || [];
    estilos.forEach(e => {
      const li = document.createElement("li");
      li.textContent = e;
      lista.appendChild(li);
    });
  }
}

// PAINEL MEMBRO - JUSTIFICATIVA
function enviarMotivo() {
  const motivo = document.getElementById("motivoInput").value;
  if (motivo) {
    const mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    mensagens.push({ tipo: "Justificativa", texto: motivo });
    localStorage.setItem("mensagens", JSON.stringify(mensagens));
    document.getElementById("motivoInput").value = "";
    alert("Justificativa enviada!");
  }
}

// PAINEL MEMBRO - DENÚNCIA COM IMAGEM
function enviarDenuncia() {
  const nome = document.getElementById("nomeDenunciado").value;
  const detalhe = document.getElementById("detalheDenuncia").value;
  const imagem = document.getElementById("evidenciaImagem").files[0];

  if (nome && detalhe) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imagemBase64 = imagem ? e.target.result : null;
      const mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
      mensagens.push({
        tipo: "Denúncia",
        nome,
        detalhe,
        imagem: imagemBase64
      });
      localStorage.setItem("mensagens", JSON.stringify(mensagens));
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
    const mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    mensagens.forEach((msg, index) => {
      const li = document.createElement("li");
      if (msg.tipo === "Justificativa") {
        li.innerHTML = `<strong>Justificativa:</strong> ${msg.texto}`;
      } else if (msg.tipo === "Denúncia") {
        li.innerHTML = `
          <strong>Denúncia contra:</strong> ${msg.nome}<br/>
          <strong>Detalhes:</strong> ${msg.detalhe}<br/>
          ${msg.imagem ? `<a href="${msg.imagem}" target="_blank">Ver Evidência</a>` : "Sem imagem"}
        `;
      }
      lista.appendChild(li);
    });
  }
    }
