const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".nav-item");
const pageTitle = document.getElementById("page-title");

const titles = {
  inicio: "Seu radar",
  vagas: "Radar de vagas",
  candidaturas: "Minhas candidaturas",
  alertas: "Alertas",
  mercado: "Radar do mercado",
  desenvolvimento: "Meu desenvolvimento",
  projetos: "Meus projetos",
  personalizacao: "Personalização"
};


function openPage(pageId) {

  pages.forEach(page => {
    page.classList.remove("active-page");
  });

  navItems.forEach(item => {
    item.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.add("active-page");
  }

  const button = document.querySelector(
    `.nav-item[data-page="${pageId}"]`
  );

  if (button) {
    button.classList.add("active");
  }

  pageTitle.textContent = titles[pageId] || "Radar";
}


navItems.forEach(item => {

  item.addEventListener("click", () => {

    const page = item.dataset.page;

    openPage(page);

  });

});


function showMessage(message) {

  const toast = document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2800);

}


/* PERSONALIZAÇÃO */

const fontSelect = document.getElementById("fontSelect");
const accentColor = document.getElementById("accentColor");
const cardSize = document.getElementById("cardSize");
const themeButton = document.getElementById("themeButton");


fontSelect.addEventListener("change", () => {

  document.body.style.fontFamily =
    fontSelect.value + ", sans-serif";

  localStorage.setItem(
    "radar-font",
    fontSelect.value
  );

});


accentColor.addEventListener("input", () => {

  document.documentElement.style
    .setProperty("--accent", accentColor.value);

  localStorage.setItem(
    "radar-accent",
    accentColor.value
  );

});


cardSize.addEventListener("input", () => {

  const size = cardSize.value;

  document.documentElement.style
    .setProperty("--card-size", size + "px");

  document.querySelectorAll(".book-cover").forEach(
    element => {
      element.style.minWidth = size / 2.5 + "px";
    }
  );

  localStorage.setItem(
    "radar-card-size",
    size
  );

});


themeButton.addEventListener("click", () => {

  const dark =
    document.body.classList.toggle("dark");

  if (dark) {

    document.documentElement.style
      .setProperty("--background", "#151414");

    document.documentElement.style
      .setProperty("--surface", "#211f1d");

    document.documentElement.style
      .setProperty("--surface-soft", "#302d29");

    document.documentElement.style
      .setProperty("--text", "#f5f1ea");

    document.documentElement.style
      .setProperty("--muted", "#aaa29a");

    document.documentElement.style
      .setProperty("--border", "#3b3732");

  } else {

    document.documentElement.style
      .setProperty("--background", "#f4f1eb");

    document.documentElement.style
      .setProperty("--surface", "#ffffff");

    document.documentElement.style
      .setProperty("--surface-soft", "#eeeae2");

    document.documentElement.style
      .setProperty("--text", "#24221f");

    document.documentElement.style
      .setProperty("--muted", "#817b72");

    document.documentElement.style
      .setProperty("--border", "#ddd7cd");

  }

});


/* RESTAURA PREFERÊNCIAS */

const savedFont =
  localStorage.getItem("radar-font");

const savedAccent =
  localStorage.getItem("radar-accent");

const savedCardSize =
  localStorage.getItem("radar-card-size");


if (savedFont) {

  fontSelect.value = savedFont;

  document.body.style.fontFamily =
    savedFont + ", sans-serif";

}


if (savedAccent) {

  accentColor.value = savedAccent;

  document.documentElement.style
    .setProperty("--accent", savedAccent);

}


if (savedCardSize) {

  cardSize.value = savedCardSize;

}


/* INICIALIZA */

openPage("inicio");
