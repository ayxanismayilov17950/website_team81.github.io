const sections = document.querySelectorAll(".section");

sections.forEach((section) => {
  const checkVisibility = () => {
    if (
      section.offsetTop + section.offsetHeight / 5 <=
      window.scrollY + window.innerHeight
    ) {
      section.classList.add("section--visible");
    }
  };
  checkVisibility();
  window.addEventListener("scroll", checkVisibility);
});
