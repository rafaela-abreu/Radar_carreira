/* =========================================
   RADAR DA CARREIRA
   CENTRO DE INTELIGÊNCIA PROFISSIONAL
========================================= */


/* BANCO DE DADOS LOCAL */

const DB = {

  vagas: JSON.parse(localStorage.getItem("radar_vagas")) || [],

  candidaturas:
    JSON.parse(localStorage.getItem("radar_candidaturas")) || [],

  empresas:
    JSON.parse(localStorage.getItem("radar_empresas")) || [],

  curriculos:
    JSON.parse(localStorage.getItem("radar_curriculos")) || [],

  evolucao:
    JSON.parse(localStorage.getItem("radar_evolucao")) || [],

  alertas:
    JSON.parse(localStorage.getItem("radar_alertas")) || []

};


function salvarBanco() {

  localStorage.setItem(
    "radar_vagas",
    JSON.stringify(DB.vagas)
  );

  localStorage.setItem(
    "radar_candidaturas",
    JSON.stringify(DB.candidaturas)
  );

  localStorage.setItem(
    "radar_empresas",
    JSON.stringify(DB.empresas)
  );

  localStorage.setItem(
    "radar_curriculos",
    JSON.stringify(DB.curriculos)
  );

  localStorage.setItem(
    "radar_evolucao",
    JSON.stringify(DB.evolucao)
  );

  localStorage.setItem(
    "radar_alertas",
    JSON.stringify(DB.alertas)
  );

}


/* =========================================
   NAVEGAÇÃO
========================================= */

const botoes = document.querySelectorAll(".nav-btn");

const abas = document.querySelectorAll(".tab");


botoes.forEach(botao => {

  botao.addEventListener("click", () => {

    const destino = botao.dataset.tab;

    botoes.forEach(b =>
      b.classList.remove("ativo")
    );

    abas.forEach(a =>
      a.classList.remove("ativo")
    );

    botao.classList.add("ativo");

    document
      .getElementById(destino)
      .classList
      .add("ativo");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

});


/* =========================================
   DATA
========================================= */

const dataAtual =
  document.getElementById("dataAtual");

if (dataAtual) {

  dataAtual.textContent =
    new Date().toLocaleDateString(
      "pt-BR",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );

}


/* =========================================
   UTILITÁRIOS
========================================= */

function id() {

  return Date.now() +
    Math.floor(Math.random() * 1000);

}


function escapar(texto = "") {

  const div =
    document.createElement("div");

  div.textContent = texto;

  return div.innerHTML;

}


function excluir(tipo, identificador) {

  if (!confirm("Deseja realmente excluir este registro?")) {
    return;
  }

  DB[tipo] =
    DB[tipo].filter(
      item => item.id !== identificador
    );

  salvarBanco();

  renderizarTudo();

}


/* =========================================
   VAGAS
========================================= */

const formVaga =
  document.getElementById("formVaga");


formVaga?.addEventListener(
  "submit",
  e => {

    e.preventDefault();

    DB.vagas.unshift({

      id: id(),

      empresa:
        vagaEmpresa.value,

      cargo:
        vagaCargo.value,

      localizacao:
        vagaLocalizacao.value,

      modelo:
        vagaModelo.value,

      salario:
        vagaSalario.value,

      beneficios:
        vagaBeneficios.value,

      compatibilidade:
        vagaCompatibilidade.value,

      requisitos:
        vagaRequisitos.value,

      descricao:
        vagaDescricao.value,

      criadoEm:
        new Date().toLocaleString("pt-BR")

    });


    salvarBanco();

    formVaga.reset();

    renderizarTudo();

  }
);


function renderizarVagas() {

  const lista =
    document.getElementById("listaVagas");

  if (!lista) return;

  if (DB.vagas.length === 0) {

    lista.innerHTML =
      `<div class="lista-vazia">
        Nenhuma vaga registrada ainda.
      </div>`;

    return;
  }


  lista.innerHTML =
    DB.vagas.map(vaga => `

      <article class="card">

        <h4>${escapar(vaga.cargo)}</h4>

        <span class="tag">
          🏢 ${escapar(vaga.empresa)}
        </span>

        ${
          vaga.compatibilidade
          ?
          `<span class="tag">
            🎯 ${vaga.compatibilidade}%
          </span>`
          :
          ""
        }

        <div class="card-info">

          ${
            vaga.modelo
            ?
            `<p>💻 ${escapar(vaga.modelo)}</p>`
            :
            ""
          }

          ${
            vaga.localizacao
            ?
            `<p>📍 ${escapar(vaga.localizacao)}</p>`
            :
            ""
          }

          ${
            vaga.salario
            ?
            `<p>💰 ${escapar(vaga.salario)}</p>`
            :
            ""
          }

          ${
            vaga.beneficios
            ?
            `<p>🎁 ${escapar(vaga.beneficios)}</p>`
            :
            ""
          }

        </div>

        ${
          vaga.requisitos
          ?
          `<p>
            <strong>Requisitos:</strong><br>
            ${escapar(vaga.requisitos)}
          </p>`
          :
          ""
        }

        <button
          class="btn-excluir"
          onclick="excluir('vagas', ${vaga.id})"
        >
          EXCLUIR
        </button>

      </article>

    `).join("");

}


/* =========================================
   CANDIDATURAS
========================================= */

const formCandidatura =
  document.getElementById("formCandidatura");


formCandidatura?.addEventListener(
  "submit",
  e => {

    e.preventDefault();

    DB.candidaturas.unshift({

      id: id(),

      empresa:
        candEmpresa.value,

      cargo:
        candCargo.value,

      data:
        candData.value,

      status:
        candStatus.value,

      curriculo:
        candCurriculo.value,

      enviado:
        candEnviado.value,

      observacoes:
        candObservacoes.value

    });


    salvarBanco();

    formCandidatura.reset();

    renderizarTudo();

  }
);


function renderizarCandidaturas() {

  const lista =
    document.getElementById(
      "listaCandidaturas"
    );

  if (!lista) return;


  if (DB.candidaturas.length === 0) {

    lista.innerHTML =
      `<div class="lista-vazia">
        Nenhuma candidatura registrada.
      </div>`;

    return;
  }


  lista.innerHTML =
    DB.candidaturas.map(c => `

      <article class="card">

        <h4>${escapar(c.cargo)}</h4>

        <span class="tag">
          🏢 ${escapar(c.empresa)}
        </span>

        <span class="tag">
          ${escapar(c.status)}
        </span>

        ${
          c.data
          ?
          `<p>📅 ${escapar(c.data)}</p>`
          :
          ""
        }

        ${
          c.curriculo
          ?
          `<p>
            📄 ${escapar(c.curriculo)}
          </p>`
          :
          ""
        }

        ${
          c.enviado
          ?
          `<p>
            <strong>Enviado:</strong><br>
            ${escapar(c.enviado)}
          </p>`
          :
          ""
        }

        <button
          class="btn-excluir"
          onclick="excluir('candidaturas', ${c.id})"
        >
          EXCLUIR
        </button>

      </article>

    `).join("");

}


/* =========================================
   EMPRESAS
========================================= */

const formEmpresa =
  document.getElementById("formEmpresa");


formEmpresa?.addEventListener(
  "submit",
  e => {

    e.preventDefault();

    DB.empresas.unshift({

      id: id(),

      nome:
        empresaNome.value,

      area:
        empresaArea.value,

      local:
        empresaLocal.value,

      site:
        empresaSite.value,

      tecnologias:
        empresaTecnologias.value,

      beneficios:
        empresaBeneficios.value,

      cultura:
        empresaCultura.value

    });


    salvarBanco();

    formEmpresa.reset();

    renderizarTudo();

  }
);


function renderizarEmpresas() {

  const lista =
    document.getElementById("listaEmpresas");

  if (!lista) return;


  if (DB.empresas.length === 0) {

    lista.innerHTML =
      `<div class="lista-vazia">
        Nenhuma empresa registrada.
      </div>`;

    return;
  }


  lista.innerHTML =
    DB.empresas.map(e => `

      <article class="card">

        <h4>${escapar(e.nome)}</h4>

        ${
          e.area
          ?
          `<p>💼 ${escapar(e.area)}</p>`
          :
          ""
        }

        ${
          e.local
          ?
          `<p>📍 ${escapar(e.local)}</p>`
          :
          ""
        }

        ${
          e.tecnologias
          ?
          `<p>
            <strong>Tecnologias:</strong><br>
            ${escapar(e.tecnologias)}
          </p>`
          :
          ""
        }

        <button
          class="btn-excluir"
          onclick="excluir('empresas', ${e.id})"
        >
          EXCLUIR
        </button>

      </article>

    `).join("");

}


/* =========================================
   CURRÍCULOS
========================================= */

const formCurriculo =
  document.getElementById("formCurriculo");


formCurriculo?.addEventListener(
  "submit",
  e => {

    e.preventDefault();

    DB.curriculos.unshift({

      id: id(),

      nome:
        curriculoNome.value,

      data:
        curriculoData.value,

      descricao:
        curriculoDescricao.value,

      conteudo:
        curriculoConteudo.value

    });


    salvarBanco();

    formCurriculo.reset();

    renderizarTudo();

  }
);


function renderizarCurriculos() {

  const lista =
    document.getElementById(
      "listaCurriculos"
    );

  if (!lista) return;


  if (DB.curriculos.length === 0) {

    lista.innerHTML =
      `<div class="lista-vazia">
        Nenhum currículo registrado.
      </div>`;

    return;
  }


  lista.innerHTML =
    DB.curriculos.map(c => `

      <article class="card">

        <h4>${escapar(c.nome)}</h4>

        ${
          c.data
          ?
          `<p>📅 ${escapar(c.data)}</p>`
          :
          ""
        }

        ${
          c.descricao
          ?
          `<p>${escapar(c.descricao)}</p>`
          :
          ""
        }

        <button
          class="btn-excluir"
          onclick="excluir('curriculos', ${c.id})"
        >
          EXCLUIR
        </button>

      </article>

    `).join("");

}


/* =========================================
   EVOLUÇÃO
========================================= */

const formEvolucao =
  document.getElementById("formEvolucao");


formEvolucao?.addEventListener(
  "submit",
  e => {

    e.preventDefault();

    DB.evolucao.unshift({

      id: id(),

      titulo:
        evolucaoTitulo.value,

      prioridade:
        evolucaoPrioridade.value,

      estudo:
        evolucaoEstudo.value,

      projeto:
        evolucaoProjeto.value,

      observacao:
        evolucaoObservacao.value

    });


    salvarBanco();

    formEvolucao.reset();

    renderizarTudo();

  }
);


function renderizarEvolucao() {

  const lista =
    document.getElementById("listaEvolucao");

  if (!lista) return;


  if (DB.evolucao.length === 0) {

    lista.innerHTML =
      `<div class="lista-vazia">
        Seu plano estratégico ainda está vazio.
      </div>`;

    return;
  }


  lista.innerHTML =
    DB.evolucao.map(item => `

      <article class="card">

        <h4>${escapar(item.titulo)}</h4>

        <span class="tag">
          Prioridade: ${escapar(item.prioridade)}
        </span>

        ${
          item.estudo
          ?
          `<p>
            📚 <strong>Estudar:</strong><br>
            ${escapar(item.estudo)}
          </p>`
          :
          ""
        }

        ${
          item.projeto
          ?
          `<p>
            🛠️ <strong>Projeto:</strong><br>
            ${escapar(item.projeto)}
          </p>`
          :
          ""
        }

        <button
          class="btn-excluir"
          onclick="excluir('evolucao', ${item.id})"
        >
          EXCLUIR
        </button>

      </article>

    `).join("");

}


/* =========================================
   ALERTAS
========================================= */

const formAlerta =
  document.getElementById("formAlerta");


formAlerta?.addEventListener(
  "submit",
  e => {

    e.preventDefault();

    DB.alertas.unshift({

      id: id(),

      titulo:
        alertaTitulo.value,

      tipo:
        alertaTipo.value,

      descricao:
        alertaDescricao.value,

      criado:
        new Date().toLocaleString("pt-BR")

    });


    salvarBanco();

    formAlerta.reset();

    renderizarTudo();

  }
);


function renderizarAlertas() {

  const lista =
    document.getElementById("listaAlertas");

  if (!lista) return;


  if (DB.alertas.length === 0) {

    lista.innerHTML =
      `<div class="lista-vazia">
        Nenhum alerta registrado.
      </div>`;

    return;
  }


  lista.innerHTML =
    DB.alertas.map(a => `

      <article class="card">

        <span class="tag">
          ${escapar(a.tipo)}
        </span>

        <h4>${escapar(a.titulo)}</h4>

        ${
          a.descricao
          ?
          `<p>${escapar(a.descricao)}</p>`
          :
          ""
        }

        <button
          class="btn-excluir"
          onclick="excluir('alertas', ${a.id})"
        >
          RESOLVER / EXCLUIR
        </button>

      </article>

    `).join("");

}


/* =========================================
   DASHBOARD
========================================= */

function atualizarDashboard() {

  const totalCandidaturas =
    document.getElementById(
      "totalCandidaturas"
    );

  const totalVagas =
    document.getElementById(
      "totalVagas"
    );

  const totalEmpresas =
    document.getElementById(
      "totalEmpresas"
    );

  const totalCurriculos =
    document.getElementById(
      "totalCurriculos"
    );


  if (totalCandidaturas)
    totalCandidaturas.textContent =
      DB.candidaturas.length;

  if (totalVagas)
    totalVagas.textContent =
      DB.vagas.length;

  if (totalEmpresas)
    totalEmpresas.textContent =
      DB.empresas.length;

  if (totalCurriculos)
    totalCurriculos.textContent =
      DB.curriculos.length;


  const dashboardAlertas =
    document.getElementById(
      "dashboardAlertas"
    );


  if (dashboardAlertas) {

    const prioritarios =
      DB.alertas
        .filter(
          a =>
            a.tipo === "Prioridade"
        )
        .slice(0, 3);


    dashboardAlertas.innerHTML =
      prioritarios.length
      ?
      prioritarios.map(a =>
        `🚨 <strong>${escapar(a.titulo)}</strong><br>
         <small>${escapar(a.descricao)}</small><hr>`
      ).join("")
      :
      "Nenhum alerta prioritário.";
  }


  const proximasAcoes =
    document.getElementById(
      "proximasAcoes"
    );


  if (proximasAcoes) {

    const prioridades =
      DB.evolucao
        .filter(
          i =>
            i.prioridade === "Alta"
        )
        .slice(0, 3);


    proximasAcoes.innerHTML =
      prioridades.length
      ?
      prioridades.map(i =>
        `🎯 <strong>${escapar(i.titulo)}</strong><br>
         <small>${escapar(i.estudo)}</small><hr>`
      ).join("")
      :
      "Nenhuma prioridade alta cadastrada.";
  }

}


/* =========================================
   PERSONALIZAÇÃO
========================================= */

const corPrincipal =
  document.getElementById("corPrincipal");


const tamanhoFonte =
  document.getElementById("tamanhoFonte");


const corSalva =
  localStorage.getItem("radar_cor");


const fonteSalva =
  localStorage.getItem("radar_fonte");


if (corSalva) {

  document.documentElement
    .style
    .setProperty(
      "--principal",
      corSalva
    );

  if (corPrincipal)
    corPrincipal.value =
      corSalva;

}


if (fonteSalva) {

  document.documentElement
    .style
    .fontSize =
    fonteSalva + "px";

  if (tamanhoFonte)
    tamanhoFonte.value =
      fonteSalva;

}


corPrincipal?.addEventListener(
  "input",
  () => {

    document.documentElement
      .style
      .setProperty(
        "--principal",
        corPrincipal.value
      );

    localStorage.setItem(
      "radar_cor",
      corPrincipal.value
    );

  }
);


tamanhoFonte?.addEventListener(
  "input",
  () => {

    document.documentElement
      .style
      .fontSize =
      tamanhoFonte.value + "px";

    localStorage.setItem(
      "radar_fonte",
      tamanhoFonte.value
    );

  }
);


/* =========================================
   LIMPAR BANCO
========================================= */

document
  .getElementById("limparDados")
  ?.addEventListener(
    "click",
    () => {

      const confirmar =
        confirm(
          "ATENÇÃO: todos os dados serão apagados permanentemente."
        );

      if (!confirmar) return;

      localStorage.clear();

      location.reload();

    }
  );


/* =========================================
   RENDERIZAÇÃO GERAL
========================================= */

function renderizarTudo() {

  renderizarVagas();

  renderizarCandidaturas();

  renderizarEmpresas();

  renderizarCurriculos();

  renderizarEvolucao();

  renderizarAlertas();

  atualizarDashboard();

}


/* INICIAR */

renderizarTudo();
