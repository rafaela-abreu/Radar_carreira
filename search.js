// search.js - Filtragem no Navegador e Atualização das Estantes
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

  let countVagas = 0;
  let mapVagas = {};

  // Carregar Vagas
  const txVagas = db.transaction(["vagas"], "readonly");
  txVagas.objectStore("vagas").openCursor().onsuccess = function(e) {
    const cursor = e.target.result;
    if (cursor) {
      countVagas++;
      const v = cursor.value;
      mapVagas[v.id] = v;

      estanteVagas.innerHTML += `
        <div class="shelf-item">
          <div style="display:flex; justify-content:space-between;">
            <strong style="font-size:0.9rem;">${v.cargo}</strong>
            <span class="tag tag-info">${v.modelo}</span>
          </div>
          <span style="font-size:0.8rem; color:var(--text-muted);">${v.empresa} • Cadastrado em ${v.data}</span>
          <p style="font-size:0.75rem; background:var(--surface-2); padding:8px; border-radius:6px; max-height:80px; overflow:hidden;">${v.desc}</p>
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

  // Carregar Candidaturas
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
