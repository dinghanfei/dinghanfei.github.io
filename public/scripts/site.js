const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

themeToggle?.addEventListener("click", () => {
  const currentTheme = root.dataset.theme || "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const typedTarget = document.querySelector(".typed-text");

const startTypingLoop = () => {
  if (!typedTarget) return;

  const words = typedTarget.getAttribute("data-typed-text")?.split("|") || ["dinghanfei"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const tick = () => {
    const word = words[wordIndex] || "";
    typedTarget.textContent = word.slice(0, charIndex);

    if (reduceMotion) {
      typedTarget.textContent = words[1] || words[0] || "dinghanfei";
      return;
    }

    if (!isDeleting && charIndex < word.length) {
      charIndex += 1;
      window.setTimeout(tick, 90);
      return;
    }

    if (!isDeleting && charIndex === word.length) {
      isDeleting = true;
      window.setTimeout(tick, 1100);
      return;
    }

    if (isDeleting && charIndex > 0) {
      charIndex -= 1;
      window.setTimeout(tick, 48);
      return;
    }

    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    window.setTimeout(tick, 260);
  };

  tick();
};

const terminal = document.querySelector(".terminal-name");

if (terminal) {
  const steps = Array.from(terminal.querySelectorAll(".cli-step"));
  const readyPrompt = terminal.querySelector("[data-cli-ready]");
  const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

  const runCli = async () => {
    terminal.classList.add("is-cli-running");

    for (const step of steps) {
      const command = step.querySelector("[data-cli-command]");
      const output = step.querySelector("[data-cli-output]");
      const cursor = step.querySelector(".cli-command-cursor");
      const text = command?.getAttribute("data-cli-command") || "";

      step.classList.add("is-active");
      if (command) command.textContent = "";
      cursor?.classList.add("is-active");

      if (reduceMotion) {
        if (command) command.textContent = text;
      } else {
        for (const character of text) {
          if (command) command.textContent += character;
          await wait(42 + Math.random() * 38);
        }
      }

      cursor?.classList.remove("is-active");
      output?.classList.add("is-visible");
      step.classList.add("is-complete");

      if (!reduceMotion) await wait(440);
    }

    readyPrompt?.classList.add("is-visible");
    terminal.classList.remove("is-cli-running");
    terminal.classList.add("is-cli-complete");
    startTypingLoop();
  };

  runCli();
} else {
  startTypingLoop();
}

const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const updateScrollEffects = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  root.style.setProperty("--scroll-progress", String(Math.min(Math.max(progress, 0), 1)));
  root.style.setProperty("--parallax-y", reduceMotion ? "0" : String(Math.min(window.scrollY * 0.035, 22)));

  let activeSection = sections[0]?.id;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.38) {
      activeSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeSection}`);
  });
};

let ticking = false;

const requestScrollUpdate = () => {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(() => {
    updateScrollEffects();
    ticking = false;
  });
};

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
updateScrollEffects();
