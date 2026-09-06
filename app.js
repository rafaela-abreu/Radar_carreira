// Controle de Navegação por Abas
function switchTab(tabId) {
  // Esconde todas as abas
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.classList.remove('active'));

  // Remove estado ativo de todos os botões
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Ativa a aba selecionada
  const targetContent = document.getElementById(tabId);
  if (targetContent) {
    targetContent.classList.add('active');
  }

  // Ativa o botão correspondente
  const activeBtn = Array.from(buttons).find(btn => 
    btn.getAttribute('onclick').includes(tabId)
  );
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}
