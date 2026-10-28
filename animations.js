(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) return;

  const header = document.querySelector(".header");
  const hero = document.querySelector(".hero");
  const introElements = [header, hero].filter(Boolean);

  const scrollElements = [...document.querySelectorAll("main > *, .footer")]
    .filter((element) => !introElements.includes(element));

  document.body.classList.add("motion-ready");

  header?.classList.add("reveal", "reveal--header");
  hero?.classList.add("reveal", "reveal--hero");

  requestAnimationFrame(() => {
    introElements.forEach((element) => {
      element.classList.add("reveal--visible");
    });

    scrollElements.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.transitionDelay = `${Math.min(index * 45, 180)}ms`;
    });

    if (!("IntersectionObserver" in window)) {
      scrollElements.forEach((element) => {
        element.classList.add("reveal--visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("reveal--visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px",
      },
    );

    scrollElements.forEach((element) => observer.observe(element));
  });
})();