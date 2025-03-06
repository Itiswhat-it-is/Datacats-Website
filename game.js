document.addEventListener("DOMContentLoaded", () => {
  const datacat = document.getElementById("datacat");
  const happinessText = document.getElementById("happiness");
  let happiness = 50; // Start at neutral happiness
  
  // Wait for animation to finish, then swap the GIF for the PNG
  setTimeout(() => {
    datacat.src = "BlackCat.png"; // Replace moving GIF with static PNG
  }, 10000); // Matches the animation duration
  
  // Button Actions
  document.getElementById("feed-button").addEventListener("click", () => {
    updateHappiness(5);
    showAction("Datacat eats happily! 🍖");
  });

  document.getElementById("play-button").addEventListener("click", () => {
    updateHappiness(7);
    showAction("Datacat plays excitedly! 🎾");
  });

  document.getElementById("sleep-button").addEventListener("click", () => {
    updateHappiness(3);
    showAction("Datacat goes to sleep. 💤");
  });

  // Function to Update Happiness
  function updateHappiness(amount) {
    happiness = Math.min(100, Math.max(0, happiness + amount)); // Limit between 0 and 100

    // Update happiness bar fill
    const happinessFill = document.getElementById("happiness-fill");
    happinessFill.style.width = happiness + "%";

    updateCatMood();
  }


  // Function to Change Cat Expression Based on Happiness
  function updateCatMood() {
    if (happiness < 30) {
      datacat.src = "datacat-sad.png"; // Sad cat image
    } else if (happiness > 70) {
      datacat.src = "datacat-happy.png"; // Happy cat image
    } else {
      datacat.src = "Datacat.png"; // Neutral cat
    }
  }

  // Function to Show a Temporary Action Message
  function showAction(message) {
    const actionText = document.createElement("p");
    actionText.textContent = message;
    actionText.style.position = "absolute";
    actionText.style.bottom = "20px";
    actionText.style.color = "#00ff88";
    actionText.style.fontFamily = "Courier New, monospace";
    actionText.style.animation = "fadeOut 1.5s ease-in-out forwards";
    document.getElementById("game-container").appendChild(actionText);

    setTimeout(() => {
      actionText.remove();
    }, 1500);
  }
});
