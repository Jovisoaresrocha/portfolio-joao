const baus = document.querySelector(".baus");

baus.addEventListener("wheel", (e) => {
  e.preventDefault();
  baus.scrollLeft += e.deltaY;
});
