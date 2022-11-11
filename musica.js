const button = document.querySelector("#musica");
const audio = document.querySelector("audio");

button.addEventListener("keydown", function (e) {
  if (e.key === "ARROWRIGHT") {
    console.log("Apertou Enter");
    audio.currentTime = 0;
    audio.play();
  }
});
console.log(button)


