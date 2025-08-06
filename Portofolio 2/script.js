const scrollElements = document.querySelectorAll('.scroll-hidden');

function elementInView(el, offset = 0.8) {
  const elementTop = el.getBoundingClientRect().top;
  const elementBottom = el.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  return elementTop < windowHeight * offset && elementBottom > 0;
}

function handleScrollAnimation() {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1)) {
      el.classList.add('scroll-show');
    } else {
      el.classList.remove('scroll-show');
    }
  });
}

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);
