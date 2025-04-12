document.addEventListener("DOMContentLoaded", () => {
  console.log("Script carregado com sucesso!");

  // Botões de Logout
  const logoutBtns = document.querySelectorAll("#logout, #logoutBtn");
  logoutBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (confirm("Você realmente deseja desconectar?")) {
        alert("Você será desconectado!");
        window.location.href = "index.html";
      }
    });
  });

  // Função para carregar membros no painel ADM
  function carregarMembros() {
    try {
      const membros = JSON.parse(localStorage.getItem("membros")) || [];
      const listaMembros = document.getElementById("listaMembros");

      if (listaMembros) {
        listaMembros.innerHTML = ""; // Limpar lista
        if (membros.length === 0) {
          listaMembros.innerHTML = "<p>Nenhum membro cadastrado.</p>";
          return;
        }

        membros.forEach((membro, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <span>${membro.nome} - ${membro.funcao}</span>
            <button class="btn-remover" data-index="${index}">Remover</button>
          `;
          listaMembros.appendChild(li);
        });

        // Adicionar eventos aos botões de remover
        document.querySelectorAll(".btn-remover").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            removerMembro(index);
          });
        });
      }
    } catch (error) {
      console.error("Erro ao carregar membros:", error);
    }
  }

  // Função para remover membros
  function removerMembro(index) {
    try {
      const membros = JSON.parse(localStorage.getItem("membros")) || [];
      membros.splice(index, 1);
      localStorage.setItem("membros", JSON.stringify(membros));
      carregarMembros();
      alert("Membro removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover membro:", error);
    }
  }

  // Função para adicionar membros
  const btnCriarMembro = document.getElementById("criarMembro");
  if (btnCriarMembro) {
    btnCriarMembro.addEventListener("click", () => {
      try {
        const nome = prompt("Digite o nome do membro:");
        const funcao = prompt("Digite a função do membro:");

        if (!nome || !funcao) {
          alert("Nome e função são obrigatórios!");
          return;
        }

        const membros = JSON.parse(localStorage.getItem("membros")) || [];
        membros.push({ nome, funcao });
        localStorage.setItem("membros", JSON.stringify(membros));
        carregarMembros();
        alert("Membro adicionado com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar membro:", error);
      }
    });
  }

  // Carregar membros ao carregar a página
  carregarMembros();
});
