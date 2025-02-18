// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});



// Select the period (".") and the cat sprite
const dot = document.querySelector('.dot');
const cat = document.querySelector('.cat-sprite');

// Add a click event listener to the period
dot.addEventListener('click', () => {
  // Make the cat visible and add the animation
  cat.style.display = 'block';
  cat.style.animation = 'walk-across 20s linear'; // Adjust duration as needed

  // Listen for the animation to finish
  cat.addEventListener('animationend', () => {
    // Add a page sliding transition
    document.body.classList.add('slide-out');

    // Redirect to the new page after the transition
    setTimeout(() => {
      window.location.href = 'hiddenpage.html'; // Change to your new page URL
    }, 750); // Match the transition duration (1s)
  });
});



  // Matrix in hidden page //
// Select the canvas and set up the context
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
const characters = matrixChars.split("");

const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

// Load the cat sprite image
const catImage = new Image();
catImage.src = "Datacat.png"; // Ensure this file exists in the correct directory

// Store cat positions to create clickable divs
let catPositions = [];


// Function to create an invisible clickable overlay
function createCatClickArea(x, y, size) {
  const catDiv = document.createElement("div");
  catDiv.style.position = "absolute";
  catDiv.style.left = `${x}px`;
  catDiv.style.top = `${y}px`;
  catDiv.style.width = `${size}px`;
  catDiv.style.height = `${size}px`;
  catDiv.style.cursor = "pointer";
  catDiv.style.background = "transparent"; // Invisible but clickable
  catDiv.style.zIndex = "100"; // Ensure it's above the canvas

  // Redirect when clicking the cat
  catDiv.addEventListener("click", () => {
    window.location.href = "cybersecurity.html";
  });

  document.body.appendChild(catDiv);

  // Remove after a short time to avoid too many elements
  setTimeout(() => {
    document.body.removeChild(catDiv);
  }, 2250);
}

// Function to draw the Matrix effect
function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = fontSize + "px Arial";

  catPositions = []; // Clear previous cat positions

  for (let i = 0; i < drops.length; i++) {
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    if (Math.random() > 0.99 && catImage.complete) {
      // Draw the cat sprite
      ctx.drawImage(catImage, x, y - fontSize, fontSize, fontSize);

      // Store the position and create a clickable area
      createCatClickArea(x, y - fontSize, fontSize);
    } else {
      // Draw regular Matrix text
      ctx.fillStyle = "#0f0";
      ctx.fillText(characters[Math.floor(Math.random() * characters.length)], x, y);
    }

    if (y > canvas.height && Math.random() > 0.99) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}

// Start animation loop
requestAnimationFrame(drawMatrix);

// Resize event to adjust canvas size
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drops.fill(1);
});
