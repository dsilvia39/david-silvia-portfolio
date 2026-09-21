const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
const academaiCarousel = document.querySelector(".academai-carousel");

if (academaiCarousel) {
  const slides = [
    ...academaiCarousel.querySelectorAll(".academai-slide"),
  ];

  const dots = [
    ...academaiCarousel.querySelectorAll(".academai-dot"),
  ];

  const previousButton = academaiCarousel.querySelector(
    ".academai-previous"
  );

  const nextButton = academaiCarousel.querySelector(
    ".academai-next"
  );

  const currentLabel = academaiCarousel.querySelector(
    ".academai-current"
  );

  const titleLabel = academaiCarousel.querySelector(
    ".academai-title"
  );

  let currentSlide = 0;

  function showAcademaiSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentSlide;

      slide.hidden = !isActive;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentSlide;

      dot.classList.toggle("is-active", isActive);

      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    currentLabel.textContent = String(currentSlide + 1).padStart(2, "0");
    titleLabel.textContent = slides[currentSlide].dataset.slideTitle;
  }

  previousButton.addEventListener("click", () => {
    showAcademaiSlide(currentSlide - 1);
  });

  nextButton.addEventListener("click", () => {
    showAcademaiSlide(currentSlide + 1);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showAcademaiSlide(Number(dot.dataset.slide));
    });
  });

  academaiCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showAcademaiSlide(currentSlide - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showAcademaiSlide(currentSlide + 1);
    }
  });
}