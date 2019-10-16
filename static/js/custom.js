// typing effect
const words = [
  "software engineer.",
  "frontend enthusiast.",
  "tech enthusiast.",
  "Singaporean."
];
const typeEl = document.querySelector(".typity");
let idx = 0;
let typed = "";

const startType = (pun, index) => {
  if (index < pun.length) {
    typed += pun.charAt(index);
    typeEl.innerHTML = typed;
    index++;
    setTimeout(() => {
      startType(pun, index);
    }, 50);
  } else {
    setTimeout(() => {
      typeEl.classList.add("highlight");
    }, 1000);

    setTimeout(() => {
      typeEl.classList.remove("highlight");
      typed = "";
      typeEl.innerHTML = typed;

      idx = idx < words.length - 1 ? idx + 1 : 0;
      startType(words[idx], 0);
    }, 2000);
  }
};

startType(words[0], 0);

// side navigation init
const sideNavEls = document.querySelectorAll(".sidenav");
M.Sidenav.init(sideNavEls, { closeOnClick: true, draggable: true });

// scroll effect
const handleNavItemClick = e => {
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

  e.preventDefault();
  const targetId = e.currentTarget.getAttribute("href");
  const targetEl = document.querySelector(targetId);
  if (!targetEl) {
    return;
  }

  const originalTop = distanceToTop(targetEl);
  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });

  const checkIfDone = setInterval(() => {
    const atBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetEl) === 0 || atBottom) {
      window.history.pushState("", "", targetId);
      clearInterval(checkIfDone);
    }
  }, 1000);
};

const navItems = document.querySelectorAll('#slide-out > li > a[href*="#"]');
navItems.forEach(navItem => {
  navItem.onclick = handleNavItemClick;
});
