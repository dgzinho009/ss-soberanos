Arquivo: script.js

// Salvar novo membro no localStorage document.getElementById("criarMembroForm")?.addEventListener("submit", function (e) { e.preventDefault();

const nome = document.getElementById("nomeMembro").value; const funcao = document.getElementById("funcaoMembro").value;

if (nome && funcao) { const membros = JSON.parse(localStorage.getItem("membros")) || []; membros.push({ nome, funcao }); localStorage.setItem("membros", JSON.stringify(membros)); alert("Membro criado com sucesso!"); document.getElementById("criarMembroForm").reset(); } });

// Listar membros no painel de membro function carregarMembros() { const lista = document.getElementById("listaMembros"); const membros = JSON.parse(localStorage.getItem("membros")) || []; if (lista) { lista.innerHTML = membros .map( (m) => <li><strong>${m.nome}</strong> - Função: ${m.funcao}</li> ) .join(""); } }

document.addEventListener("DOMContentLoaded", carregarMembros);

