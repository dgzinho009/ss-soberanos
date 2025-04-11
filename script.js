// Simulando LocalStorage para exemplo
let membros = JSON.parse(localStorage.getItem("membros")) || [];
let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
let denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
let ausencias = JSON.parse(localStorage.getItem("ausencias")) || [];

// Estilos de jogo
function adicionarEstilo() {
  const estiloInput = document.getElementById("novoEstilo");
  const estilo = estiloInput.value.trim();
  if (estilo !== "") {
    const lista = document.getElementById("listaEstilos");
    const li = document.createElement("li");
    li.textContent = estilo;
    lista.appendChild(li);
    estiloInput.value = "";
  }
}

// Motivo de ausência
function enviarMotivo() {
  const motivo = document.getElementById("motivoInput").value.trim();
  if (motivo !== "") {
    ausencias.push({ membro: "SSDG001", motivo, status: "pendente" });
    localStorage.setItem("ausencias", JSON.stringify(ausencias));
    alert("Justificativa enviada com sucesso.");
    document.getElementById("motivoInput").value = "";
  }
}

// Denúncia com evidência
function enviarDenuncia() {
  const nome = document.getElementById("nomeDenunciado").value.trim();
  const detalhe = document.getElementById("detalheDenuncia").value.trim();
  const imagem = document.getElementById("evidenciaImagem").files[0];

  if (nome && detalhe) {
    const leitor = new FileReader();
    leitor.onload = function(e) {
      denuncias.push({
        membro: "SSDG001",
        denunciado: nome,
        detalhe: detalhe,
        imagem: e.target.result,
        status: "pendente"
      });
      localStorage.setItem("denuncias", JSON.stringify(denuncias));
      alert("Denúncia enviada com sucesso.");
      document.getElementById("nomeDenunciado").value = "";
      document.getElementById("detalheDenuncia").value = "";
      document.getElementById("evidenciaImagem").value = "";
    };
    if (imagem) {
      leitor.readAsDataURL(imagem);
    } else {
      denuncias.push({
        membro: "SSDG001",
        denunciado: nome,
        detalhe: detalhe,
        imagem: null,
        status: "pendente"
      });
      localStorage.setItem("denuncias", JSON.stringify(denuncias));
      alert("Denúncia enviada sem imagem.");
    }
  }
}

// Correio
function carregarMensagens() {
  const lista = document.getElementById("mensagensMembro");
  if (lista) {
    lista.innerHTML = "";
    mensagens.forEach((msg) => {
      if (msg.destino === "SSDG001" || msg.destino === "TODOS") {
        const li = document.createElement("li");
        li.textContent = msg.conteudo;
        lista.appendChild(li);
      }
    });
  }
}

// Carregar mensagens ao abrir o painel
document.addEventListener("DOMContentLoaded", carregarMensagens);
