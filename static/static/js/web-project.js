links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Dynamic Animation for Sections
const sections = document.querySelectorAll('.section');

const options = {
  threshold: 0.3
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});
// Fade-in animation for profiles
const profileCards = document.querySelectorAll('.profile-card');

const fadeInOptions = {
  threshold: 0.3
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, fadeInOptions);

profileCards.forEach(card => fadeInObserver.observe(card));

// Add hover effect logging
profileCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    console.log(`Hovering over: ${card.textContent}`);
  });
});
