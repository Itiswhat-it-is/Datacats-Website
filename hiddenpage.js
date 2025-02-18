document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("matrixCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
  const characters = matrixChars.split("");

  const fontSize = 18;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  const catImage = new Image();
  catImage.src = "Datacat.png"; // Ensure this file exists in the correct directory

  let catPositions = [];

  function createCatClickArea(x, y, size) {
    const catDiv = document.createElement("div");
    catDiv.style.position = "absolute";
    catDiv.style.left = `${x}px`;
    catDiv.style.top = `${y}px`;
    catDiv.style.width = `${size}px`;
    catDiv.style.height = `${size}px`;
    catDiv.style.cursor = "pointer";
    catDiv.style.background = "transparent"; // Invisible but clickable
    catDiv.style.zIndex = "100";

    catDiv.addEventListener("click", () => {
      console.log("🐱 Cat clicked! Trying to unlock the card...");

      if (!localStorage.getItem("unlocked_card1")) {  
        localStorage.setItem("unlocked_card1", "true");  
        console.log("✅ Card 1 has been unlocked!");
        showUnlockPopup("card1.png", "Card Unlocked!", "unlocked_card1");
      } else {
        console.log("🔹 Card 1 is already unlocked, skipping popup.");
      }

      document.body.removeChild(catDiv);
    });

    document.body.appendChild(catDiv);

    setTimeout(() => {
      if (document.body.contains(catDiv)) {
        document.body.removeChild(catDiv);
      }
    }, 5000);
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px Arial";

    catPositions = [];

    for (let i = 0; i < drops.length; i++) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      if (Math.random() > 0.99 && catImage.complete) {
        ctx.drawImage(catImage, x, y - fontSize, fontSize, fontSize);
        createCatClickArea(x, y - fontSize, fontSize);
      } else {
        ctx.fillStyle = "#0f0";
        ctx.fillText(characters[Math.floor(Math.random() * characters.length)], x, y);
      }

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }

    requestAnimationFrame(drawMatrix);
  }

  requestAnimationFrame(drawMatrix);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.fill(1);
  });

  // Function to Show Unlock Popup
  function showUnlockPopup(imageSrc, message, cardKey) {
      

    console.log("📢 Showing unlock popup...");

    // ✅ Create the bottom-right popup BEFORE setting localStorage
    const popup = document.createElement("div");
    popup.id = "unlock-popup";
    popup.innerHTML = `
      <img src="${imageSrc}" alt="Unlocked Card">
      <p>${message}</p>
    `;

    document.body.appendChild(popup);

    // ✅ Show the popup with a smooth animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 50);

    // ✅ Remove the popup smoothly after 4 seconds
    setTimeout(() => {
      popup.classList.remove("show");
      setTimeout(() => popup.remove(), 1200);
    }, 4000);

    // ✅ Set `localStorage` AFTER the popup appears
    setTimeout(() => {
      localStorage.setItem(cardKey, "true");
      console.log(`✅ ${cardKey} is now stored in localStorage.`);
    }, 1000); // Small delay to ensure the popup appears first
      
  }
});
