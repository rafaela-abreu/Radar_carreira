// crawler.js - Motor Autônomo de Busca de Vagas e Cruzamento
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.use(express.json());

// Palavras-chave do seu perfil para cruzamento automático
const SEU_PERFIL_SKILLS = ['javascript', 'html', 'css', 'react', 'git', 'github', 'figma'];

// Função que raspa vagas automaticamente na web sem intervenção humana
async function buscarVagasAutonomo(termoBusca = 'Front-End Junior') {
  try {
    // Exemplo de integração de busca via RSS / API pública de vagas
    const url = `https://remotar.com.br/api/v1/jobs?search=${encodeURIComponent(termoBusca)}`;
    const response = await axios.get(url);
    const vagasEncontradas = response.data;

    return vagasEncontradas.map(vaga => {
      const textoDescricao = (vaga.title + " " + vaga.description).toLowerCase();
      
      // Cruzamento de dados 100% automático
      const skillsEncontradas = SEU_PERFIL_SKILLS.filter(skill => textoDescricao.includes(skill));
      const porcentagemMatch = Math.round((skillsEncontradas.length / SEU_PERFIL_SKILLS.length) * 100);

      return {
        empresa: vaga.company || 'Empresa Privada',
        cargo: vaga.title,
        modelo: vaga.type || 'Remoto',
        desc: vaga.description,
        match: porcentagemMatch,
        dataCaptura: new Date().toLocaleDateString('pt-BR')
      };
    });
  } catch (error) {
    console.error("Erro na busca automática:", error);
    return [];
  }
}

// Rota onde o aplicativo chama a atualização automática
app.get('/api/auto-fetch', async (req, res) => {
  const vagas = await buscarVagasAutonomo();
  res.json({ status: 'sucesso', total: vagas.length, dados: vagas });
});

app.listen(3000, () => console.log('⚡ Motor Autônomo do Radar rodando na porta 3000'));
