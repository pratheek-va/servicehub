"use strict";
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const leftbtn = document.querySelector(".leftbtn");
const rightbtn = document.querySelector(".rightbtn");
const header1 = document.querySelector(".main-heading");
const header2 = document.querySelector(".photoshop");
const nav = document.querySelector("nav");

// Navigation bar
document.querySelector(".main-nav").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Hero text navigation
document
  .querySelector(".hero-text-box")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("hero-link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

//Sticky Navigation
const navHeight = nav.getBoundingClientRect().height;
const header = document.querySelector("header");
const obsCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight - 12}px`,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

//Left and Right arrow buttons and sliding animations
const slides = document.querySelectorAll(".slide");
const maxSlide = slides.length;
let curSlide = 0;
slides.forEach(
  (slide, i) => (slide.style.transform = `translateX(${i * 100}%)`)
);
const currentRight = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  curSlide++;
  slideAnime(curSlide);
};
const currentLeft = function () {
  if (curSlide === 0) curSlide = maxSlide - 1;
  curSlide--;
  slideAnime(curSlide);
};
const slideAnime = function (curSlide) {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${(i - curSlide) * 100}%)`)
  );
};
rightArrow.addEventListener("click", function () {
  rightArrow.classList.add("hidden");
  leftArrow.classList.remove("hidden");
  currentRight();
});
leftArrow.addEventListener("click", function () {
  leftArrow.classList.add("hidden");
  rightArrow.classList.remove("hidden");
  currentLeft();
});
