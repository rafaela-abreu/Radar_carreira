// search.js - Filtragem com Cruzamento de Dados e Compatibilidade

// Lista de palavras-chave técnicas para identificar no texto
const SKILLS_TECNICAS = [
  'html', 'css', 'javascript', 'js', 'react', 'reactjs', 'node', 'nodejs', 
  'typescript', 'ts', 'git', 'github', 'sql', 'python', 'figma', 'tailswind', 'bootstrap'
];

// Extrai palavras-chave do texto
function extrairSkills(texto) {
  if (!texto) return [];
  const textoLimpo = texto.toLowerCase();
  return SKILLS_TECNICAS.filter(skill => textoLimpo.includes(skill));
}

// Calcula a porcentagem de compatibilidade entre o currículo e a vaga
function calcularCompatibilidade(skillsCv, descVaga) {
  if (!skillsCv || skillsCv.length === 0 || !descVaga) return { porcentagem: 0, faltantes: [] };

  const skillsVaga = extrairSkills(descVaga);
  if (skillsVaga.length === 0) return { porcentagem: 100, faltantes: [] }; // Se a vaga não pede nada específico

  const enquadradas = skillsVaga.filter(s => skillsCv.includes(s));
  const faltantes = skillsVaga.filter(s => !skillsCv.includes(s));
  
  const porcentagem = Math.round((enquadradas.length / skillsVaga.length) * 100);
  return { porcentagem, faltantes };
}

// Renderiza a estante de vagas cruzando com o perfil do banco
function carregarEstantes() {
  if (!db) return;

  const estanteVagas = document.getElementById('estante-vagas');
  const candSelect = document.getElementById('cand-vaga-select');
  const cvCrossSelect = document.getElementById('cv-vaga-cross');
  const estanteCand = document.getElementById('estante-candidaturas');

  if (!estanteVagas) return;

  estanteVagas.innerHTML = '';
  candSelect.innerHTML = '';
  cvCrossSelect.innerHTML = '';
  estanteCand.innerHTML = '';

  // 1. Puxar o texto do currículo carregado na tela
  const cvText = document.getElementById('cv-text') ? document.getElementById('cv-text').value : '';
  const skillsPerfil = extrairSkills(cvText);

  let countVagas = 0;
  let mapVagas = {};

  // 2. Carregar Vagas e cruzar dados
  const txVagas = db.transaction(["vagas"], "readonly");
  txVagas.objectStore("vagas").openCursor().onsuccess = function(e) {
    const cursor = e.target.result;
    if (cursor) {
      countVagas++;
      const v = cursor.value;
      mapVagas[v.id] = v;

      // Calcular match com o perfil
      const match = calcularCompatibilidade(skillsPerfil, v.desc);
      let tagClasse = 'tag-warning';
      if (match.porcentagem >= 70) tagClasse = 'tag-success';
      else if (match.porcentagem < 40) tagClasse = 'tag-info';

      estanteVagas.innerHTML += `
        <div class="shelf-item" data-match="${match.porcentagem}">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size:0.9rem;">${v.cargo}</strong>
            <span class="tag ${tagClasse}">${match.porcentagem}% Match</span>
          </div>
          <span style="font-size:0.8rem; color:var(--text-muted);">${v.empresa} • ${v.modelo}</span>
          <p style="font-size:0.75rem; background:var(--surface-2); padding:8px; border-radius:6px; max-height:80px; overflow:hidden;">${v.desc}</p>
          ${match.faltantes.length > 0 ? `<span style="font-size:0.7rem; color:var(--status-warning);">⚠️ A aprender: ${match.faltantes.join(', ')}</span>` : ''}
        </div>
      `;

      const opt = `<option value="${v.id}">${v.cargo} - ${v.empresa}</option>`;
      candSelect.innerHTML += opt;
      cvCrossSelect.innerHTML += opt;

      cursor.continue();
    } else {
      const dashVagas = document.getElementById('dash-vagas');
      if (dashVagas) dashVagas.innerText = countVagas;
    }
  };

  // 3. Carregar Candidaturas
  let countCand = 0;
  const txCand = db.transaction(["candidaturas"], "readonly");
  txCand.objectStore("candidaturas").openCursor().onsuccess = function(e) {
    const cursor = e.target.result;
    if (cursor) {
      countCand++;
      const c = cursor.value;
      const vaga = mapVagas[c.vagaId] || { cargo: "Vaga", empresa: "Empresa" };

      estanteCand.innerHTML += `
        <div class="shelf-item">
          <div style="display:flex; justify-content:space-between;">
            <strong style="font-size:0.9rem;">${vaga.cargo}</strong>
            <span class="tag tag-success">Enviado</span>
          </div>
          <span style="font-size:0.8rem; color:var(--text-muted);">${vaga.empresa} • ${c.data}</span>
          <span style="font-size:0.75rem; color:var(--primary);">📄 Versão: ${c.versao}</span>
          <p style="font-size:0.75rem; background:var(--surface-2); padding:8px; border-radius:6px;">${c.texto || 'Sem texto anexado.'}</p>
        </div>
      `;
      cursor.continue();
    } else {
      const dashCand = document.getElementById('dash-candidaturas');
      if (dashCand) dashCand.innerText = countCand;
    }
  };
}

// Filtragem em tempo real por termo ou nota de compatibilidade
function filtrarVagas(termo) {
  const itens = document.querySelectorAll('#estante-vagas .shelf-item');
  const termoLower = termo.toLowerCase();

  itens.forEach(item => {
    const texto = item.innerText.toLowerCase();
    if (texto.includes(termoLower)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
