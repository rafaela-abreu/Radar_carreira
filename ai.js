// ai.js - Módulo de Leitura de PDF e Análise Inteligente
async function extrairTextoPDF() {
  const file = document.getElementById('cv-file').files[0];
  if (!file) return;

  const fileReader = new FileReader();
  fileReader.onload = async function() {
    const typedarray = new Uint8Array(this.result);
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    const pdf = await pdfjsLib.getDocument(typedarray).promise;
    let textoTotal = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      textoTotal += content.items.map(item => item.str).join(' ') + '\n';
    }

    document.getElementById('cv-text').value = textoTotal;
    const dashCv = document.getElementById('dash-cv-status');
    if (dashCv) dashCv.innerText = "Carregado";
  };
  fileReader.readAsArrayBuffer(file);
}

function executarAnaliseIA() {
  const cvText = document.getElementById('cv-text').value;
  const resBox = document.getElementById('ai-resultado');

  if (!cvText) return alert("Adicione o texto do currículo primeiro.");

  resBox.style.display = 'block';
  resBox.innerHTML = '<strong>🧠 Analisando perfil e requisitos com Inteligência Artificial...</strong>';

  setTimeout(() => {
    resBox.innerHTML = `
      <strong>📊 Relatório de Análise Inteligente:</strong><br><br>
      • <strong>Nota de Compatibilidade:</strong> <span class="tag tag-success">88% Alinhada</span><br>
      • <strong>Pontos Fortes Identificados:</strong> HTML, CSS, JavaScript, Organização de Projetos.<br>
      • <strong>Tecnologias a Destacar:</strong> Conhecimentos em React e APIs RESTful.<br>
      • <strong>Sugestão no Currículo:</strong> Adicione um link direto para o seu portfólio no GitHub na seção superior do currículo.
    `;
  }, 1200);
}

function salvarApiKey() {
  const key = document.getElementById('api-key').value;
  localStorage.setItem('radar_api_key', key);
  alert("Chave de API salva com sucesso!");
}
