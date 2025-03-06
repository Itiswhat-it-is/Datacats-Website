document.addEventListener("DOMContentLoaded", () => {
  console.log("🔍 Checking for unlocked cards...");

  const unlockedCards = [];
  
  // 🔹 Loop through all keys in localStorage to find unlocked cards
  for (let i = 1; i <= 50; i++) { 
    const cardKey = `unlocked_card${i}`;
    if (localStorage.getItem(cardKey) === "true") {
      unlockedCards.push(`card${i}.png`);
      unlockCard(`slot${i}`, `card${i}.png`, true);
    }
  }

  generateFloatingCards(unlockedCards);
  setupCardClickEvents(); // Ensure click events are set up correctly
});

// Function to unlock a card in the inventory
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

// List of secret passwords and their corresponding cards
const secretPasswords = {
  "secret1": "card2.png",      // Example: Unlocks Card #2
  "secret2": "card3.png",     // Example: Unlocks Card #3
  "secret3": "card4.png"      // Example: Unlocks Card #4
};

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

function generateFloatingCards(unlockedCards) {
  const container = document.querySelector(".floating-cards-container");
  const hero = document.querySelector(".hero");

  if (!container) {
    console.warn("❌ Floating cards container not found.");
    return;
  }

  if (!hero) {
    console.warn("❌ Hero section not found.");
    return;
  }

  const heroRect = hero.getBoundingClientRect();

  console.log(`🎴 Adding ${unlockedCards.length} floating cards...`);

  unlockedCards.forEach((cardSrc, index) => {
    const card = document.createElement("img");
    card.src = cardSrc;
    card.classList.add("floating-card");

    // Start off-screen on the left
    card.style.left = `-100px`;
    card.style.top = `${Math.random() * (heroRect.height - 70)}px`; // Random Y position

    container.appendChild(card);
    console.log(`✅ Floating card ${index + 1} added.`);

    // Start the movement
    moveCardAcrossScreen(card, heroRect.width);
  });
}

// Function to move cards left to right, then restart
function moveCardAcrossScreen(card, screenWidth) {
  function move() {
    const speed = 8000 + Math.random() * 10000; // Different speed per card (8-18s)
    card.style.transition = `transform ${speed}ms linear`;
    card.style.transform = `translateX(${screenWidth + 100}px)`; // Move off-screen right

    setTimeout(() => {
      // Reset position back to the left side
      card.style.transition = "none"; // Remove transition effect momentarily
      card.style.transform = "translateX(-100px)"; // Move back off-screen left

      // Restart movement after a slight delay
      setTimeout(move, 500);
    }, speed);
  }

  move();
}

document.addEventListener("DOMContentLoaded", () => {
  let konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA"
  ];

  let userInput = [];
  let inputDisabled = false; // ✅ Prevents accidental input

  document.addEventListener("keydown", (event) => {
    if (inputDisabled) return; // ✅ Ignore keypresses while input is open

    userInput.push(event.code);

    // Keep array the same length as the Konami code
    if (userInput.length > konamiCode.length) {
      userInput.shift();
    }

    // Check if user input matches Konami code
    if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
      console.log("🎮 Konami Code Entered!");

      // ✅ Disable keyboard input briefly to prevent auto-typing
      inputDisabled = true;

      // Show custom input popup
      const popup = document.getElementById("secret-code-popup");
      const inputField = document.getElementById("secret-code-input");

      setTimeout(() => {
        inputField.value = ""; // ✅ Clear previous input
        popup.style.display = "flex";
        inputField.focus();
      }, 100); // ✅ Small delay to prevent "A" from being typed

      // ✅ Re-enable input after popup is fully opened
      setTimeout(() => {
        inputDisabled = false;
      }, 500);
    }
  });

  // Handle Secret Code Submission
  document.getElementById("submit-secret").addEventListener("click", () => {
    let secretMessage = document.getElementById("secret-code-input").value.trim().toLowerCase(); // Convert input to lowercase

    if (secretMessage in secretPasswords) {
      let cardImage = secretPasswords[secretMessage]; // Get corresponding card

      // Create unique key for localStorage (e.g., unlocked_card2)
      let cardKey = `unlocked_${cardImage.replace(".png", "")}`;

      // Check if the card is already unlocked
      if (!localStorage.getItem(cardKey)) {
        localStorage.setItem(cardKey, "true"); // ✅ Store unlock in localStorage
        console.log(`🎉 Card Unlocked: ${cardImage}`);
        showUnlockPopup(cardImage, "New Card Unlocked!");
      } else {
        console.log(`🔹 Card already unlocked: ${cardImage}`);
      }
    } else {
      console.log("❌ Incorrect password. Try again.");
      alert("Wrong code! Try again.");
    }

    // ✅ Clear input field before hiding the popup
    document.getElementById("secret-code-input").value = "";
    document.getElementById("secret-code-popup").style.display = "none";
  });

});



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

  enableCardRotation();
}

// Function to allow mouse drag rotation **only while holding the button**
function enableCardRotation() {
  const popupImg = document.getElementById("popup-card-img");
  let isRotating = false;
  let startX, startY;
  let rotationY = 0;
  let rotationX = 0;

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

  document.addEventListener("mousemove", (event) => {
    if (!isRotating) return;

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
