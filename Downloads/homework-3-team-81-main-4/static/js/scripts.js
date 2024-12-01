const header = document.querySelector(".header");
const navbarLogo = document.querySelector(".navbar__logo");
// navbar.offsetTop won't work when the user reloads the page while the navbar is sticky
const navPos = header ? header.offsetHeight : 0;

window.addEventListener("scroll", () => {
  navbarLogo.classList.toggle("navbar__logo--visible", navPos < window.scrollY);
});

const navbarMenuBtnContainer = document.querySelector(
  ".navbar__dropdown-menu-btn-container",
);
const navbarMenuBtn = document.querySelector(".navbar__dropdown-menu-btn");

navbarMenuBtnContainer.onclick = () =>
  navbarMenuBtn.classList.toggle("navbar__dropdown-menu-btn--active");
