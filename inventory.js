document.addEventListener("DOMContentLoaded", () => {
  console.log("Checking for unlocked cards...");

  // Check if Card 1 has been unlocked
  if (localStorage.getItem("unlocked_card1") === "true") {
    console.log("Card 1 is unlocked!");
    unlockCard("slot1", "card1.png", true);
  } else {
    console.log("Card 1 is still locked.");
  }

  // Setup click event for showing full-size cards
  setupCardClickEvents();
});

// Function to unlock a card
function unlockCard(slotId, imageSrc, applyGlow) {
  const slot = document.getElementById(slotId);
  if (slot) {
    slot.classList.add("filled");

    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = "Unlocked Card";
    img.classList.add("clickable-card");

    img.onload = () => {
      console.log(`✅ Image ${imageSrc} loaded successfully!`);
      img.style.animation = "fadeIn 0.8s ease-in-out forwards";

      if (applyGlow) {
        img.style.animation += ", glowEffect 3s ease-in-out 1";
      }
    };

    slot.appendChild(img);
  }
}

// Function to setup click event for full-size card preview
function setupCardClickEvents() {
  const popup = document.getElementById("card-popup");
  const popupImg = document.getElementById("popup-card-img");

  document.querySelectorAll(".clickable-card").forEach(card => {
    card.addEventListener("click", () => {
      popupImg.src = card.src;
      popup.classList.add("show");
    });
  });

  // Close popup when clicking outside the image
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.classList.remove("show");
    }
  });

  // Enable drag-to-rotate only while holding the mouse button
  enableCardRotation();
}

// Function to allow mouse drag rotation **only while holding the button**
function enableCardRotation() {
  const popupImg = document.getElementById("popup-card-img");
  let isRotating = false;
  let startX, startY;
  let rotationY = 0;
  let rotationX = 0;

  // When the card is clicked, toggle rotation mode
  popupImg.addEventListener("click", (event) => {
    isRotating = !isRotating; // Toggle rotation state
    if (isRotating) {
      startX = event.clientX;
      startY = event.clientY;
      popupImg.style.cursor = "grabbing";
    } else {
      popupImg.style.cursor = "grab";
    }
  });

  // When mouse moves (ONLY if rotation is active)
  document.addEventListener("mousemove", (event) => {
    if (!isRotating) return; // ❌ Stop rotation when toggled off

    let deltaX = event.clientX - startX;
    let deltaY = event.clientY - startY;

    rotationY += deltaX * 0.3;
    rotationX -= deltaY * 0.3;

    if (rotationX > 30) rotationX = 30;
    if (rotationX < -30) rotationX = -30;

    popupImg.style.transform = `perspective(800px) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;

    startX = event.clientX;
    startY = event.clientY;
  });
}
