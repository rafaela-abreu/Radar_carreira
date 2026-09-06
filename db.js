// db.js - Gerenciador do Banco de Dados Local do Radar da Carreira
let db;
const request = indexedDB.open("RadarCarreiraDB", 3);

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
  if (typeof carregarEstantes === 'function') {
    carregarEstantes();
  }
};

request.onerror = function(e) {
  console.error("Erro no IndexedDB:", e);
};
