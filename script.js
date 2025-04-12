document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll("aside ul li a");
  const mainContent = document.querySelector("main");

  // Adiciona eventos de clique a cada link do menu
  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Evita o redirecionamento padrão

      // Remove a classe ativa de todos os links
      menuLinks.forEach((link) => link.classList.remove("active"));

      // Adiciona a classe ativa ao link clicado
      link.classList.add("active");

      // Carrega o conteúdo correspondente com base no href do link
      const page = link.getAttribute("href");
      if (page === "index.html") {
        mainContent.innerHTML = `
          <h2>Início</h2>
          <p>Escolha no menu as opções que deseja acessar.</p>
        `;
      } else if (page === "painel-membros.html") {
        mainContent.innerHTML = `
          <h2>Painel Membros</h2>
          <p>Aqui você verá os membros da guilda.</p>
        `;
      } else if (page === "painel-adm.html") {
        mainContent.innerHTML = `
          <h2>Painel ADM</h2>
          <p>Gerencie as opções administrativas da guilda.</p>
        `;
      } else {
        mainContent.innerHTML = `
          <h2>Erro</h2>
          <p>Página não encontrada.</p>
        `;
      }
    });
  });

  // Define a página inicial como padrão
  mainContent.innerHTML = `
    <h2>Início</h2>
    <p>Escolha no menu as opções que deseja acessar.</p>
  `;
});
