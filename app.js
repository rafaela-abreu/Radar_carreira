// db.js - Banco de Dados Local do Radar da Carreira
let db;
const request = indexedDB.open("RadarCarreiraDB", 2);

request.onupgradeneeded = function(e) {
  db = e.target.result;
  if (!db.objectStoreNames.contains("vagas")) {
    db.createObjectStore("vagas", { keyPath: "id", autoIncrement: true });
  }
  if (!db.objectStoreNames.contains("candidaturas")) {
    db.createObjectStore("candidaturas", { keyPath: "id", autoIncrement: true });
  }
};

request.onsuccess = function(e) {
  db = e.target.result;
  carregarEstantes();
};

request.onerror = function(e) {
  console.error("Erro ao abrir banco de dados local:", e);
};

// Salvar Vaga no Banco
function salvarVagaDB() {
  const empresa = document.getElementById('vaga-empresa').value;
  const cargo = document.getElementById('vaga-cargo').value;
  const modelo = document.getElementById('vaga-modelo').value;
  const desc = document.getElementById('vaga-desc').value;

  if (!empresa || !cargo) return alert("Preencha Empresa e Cargo.");

  const tx = db.transaction(["vagas"], "readwrite");
  tx.objectStore("vagas").add({
    empresa, cargo, modelo, desc, data: new Date().toLocaleDateString('pt-BR')
  });

  tx.oncomplete = function() {
    alert("Dossiê da vaga salvo com sucesso!");
    document.getElementById('vaga-empresa').value = '';
    document.getElementById('vaga-cargo').value = '';
    document.getElementById('vaga-desc').value = '';
    carregarEstantes();
  };
}

// Salvar Candidatura no Banco
function salvarCandidaturaDB() {
  const vagaId = document.getElementById('cand-vaga-select').value;
  const versao = document.getElementById('cand-version').value;
  const texto = document.getElementById('cand-texto').value;

  if (!vagaId || !versao) return alert("Selecione a vaga e a versão do currículo.");

  const tx = db.transaction(["candidaturas"], "readwrite");
  tx.objectStore("candidaturas").add({
    vagaId, versao, texto, data: new Date().toLocaleDateString('pt-BR')
  });

  tx.oncomplete = function() {
    alert("Candidatura registrada!");
    document.getElementById('cand-version').value = '';
    document.getElementById('cand-texto').value = '';
    carregarEstantes();
  };
}
