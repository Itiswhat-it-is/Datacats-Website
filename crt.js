document.addEventListener("DOMContentLoaded", () => {
  const powerButton = document.getElementById("power-button");
  const crtContainer = document.querySelector(".crt-container");

  let isOn = false;

  powerButton.addEventListener("click", () => {
    isOn = !isOn;

    if (isOn) {
      crtContainer.classList.add("crt-active");
    } else {
      crtContainer.classList.remove("crt-active");
    }
  });
});
