document.addEventListener("DOMContentLoaded", () => {
  console.log("Script carregado com sucesso!");

  // Exemplo de funcionalidade para redirecionar ao clicar em `Logout`
  const logoutBtns = document.querySelectorAll("#logout, #logoutBtn");
  logoutBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Você será desconectado!");
      window.location.href = "index.html";
    });
  });

  // Função para carregar membros no painel ADM
  function carregarMembros() {
    const membros = JSON.parse(localStorage.getItem("membros")) || [];
    const listaMembros = document.getElementById("listaMembros");
    if (listaMembros) {
      listaMembros.innerHTML = "";
      membros.forEach((membro, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          ${membro.nome} - ${membro.funcao}
          <button onclick="removerMembro(${index})">Remover</button>
        `;
        listaMembros.appendChild(li);
      });
    }
  }

  // Função para remover membros
  window.removerMembro = function (index) {
    const membros = JSON.parse(localStorage.getItem("membros")) || [];
    membros.splice(index, 1);
    localStorage.setItem("membros", JSON.stringify(membros));
    carregarMembros();
    alert("Membro removido com sucesso!");
  };

  // Função para adicionar membros
  const btnCriarMembro = document.getElementById("criarMembro");
  if (btnCriarMembro) {
    btnCriarMembro.addEventListener("click", () => {
      const nome = prompt("Digite o nome do membro:");
      const funcao = prompt("Digite a função do membro:");
      const membros = JSON.parse(localStorage.getItem("membros")) || [];
      membros.push({ nome, funcao });
      localStorage.setItem("membros", JSON.stringify(membros));
      carregarMembros();
      alert("Membro adicionado com sucesso!");
    });
  }

  carregarMembros(); // Chamada inicial para carregar membros
});
