const darkBtn = document.querySelector(".dark-mode");
const lightBtn = document.querySelector(".light-mode");
const logo = document.querySelector(".logo");
const servicoTitles = document.querySelectorAll(".card-title");
const logoHome = document.querySelector(".logo-home");
const btnFaleConosco = document.querySelector(".btn-contato");
const menuItens = document.querySelectorAll(".menu-item");
const navBar = document.querySelector(".navbar");
const hamburguerMenuIcon = document.querySelector(".hamburguer-menu-icon");
const hamburguerMenuItens = document.querySelector(".menu-hamburguer")
const lineHamburguer = document.querySelectorAll(".line");
const xHamburguerIcon = document.querySelector(".hamburguer-x-icon");
const cards = document.querySelectorAll(".card");
const cardsTitles = document.querySelectorAll(".card-title")
const cardsTitlesOcultos = document.querySelectorAll(".card-title-oculto");
const cardsTextsOcultos = document.querySelectorAll(".card-text-oculto");
const cardsIcons = document.querySelectorAll(".icon");


darkBtn.addEventListener("click", () => {
  darkBtn.classList.add("pink");
  lightBtn.classList.add("white");
  lightBtn.classList.remove("pink");
  document.body.classList.add("dark");
  document.body.classList.remove("light");
  logo.classList.add("light-blue");
  logoHome.classList.add("light-blue");
  btnFaleConosco.classList.add("light-blue-background");
  navBar.classList.add("gray");
  //hamburguerMenu.classList.add("light-blue");
  menuItens.forEach(item => {
    item.classList.add("light-blue");
  });
  servicoTitles.forEach(title => {
    title.classList.add("light-blue");
  });
  lineHamburguer.forEach(line => {
    line.classList.add("light-blue-background");
  });

});

lightBtn.addEventListener("click", () => {
  lightBtn.classList.add("pink");
  darkBtn.classList.add("white");
  darkBtn.classList.remove("pink");
  document.body.classList.add("light");
  document.body.classList.remove("dark");
  logo.classList.remove("light-blue");
  logoHome.classList.remove("light-blue");
  //hamburguerMenu.classList.remove("light-blue-background");
  btnFaleConosco.classList.remove("light-blue-background");
  navBar.classList.remove("gray");
  menuItens.forEach(item => {
    item.classList.remove("light-blue");
  });
  servicoTitles.forEach(title => {
    title.classList.remove("light-blue");
  });
  lineHamburguer.forEach(line => {
    line.classList.remove("light-blue-background");
  })
});

hamburguerMenuIcon.addEventListener("click", () => {
  hamburguerMenuItens.classList.add("active");
  xHamburguerIcon.classList.add("active");
  hamburguerMenuIcon.classList.add("active");
});

xHamburguerIcon.addEventListener("click", () => {
  hamburguerMenuItens.classList.remove("active");
  xHamburguerIcon.classList.remove("active");
  hamburguerMenuIcon.classList.remove("active");
});


function clickCard(card) {
  card.querySelector(".card-interior").classList.toggle("flip");
};

/* for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
      cardsTitles[i].classList.toggle("inactive");
      cardsIcons[i].classList.toggle("inactive");
      cardsTitlesOcultos[i].classList.toggle("active");
      cardsTextsOcultos[i].classList.toggle("active");
      cards[i].classList.toggle("card-oculto");
    });
  }*/