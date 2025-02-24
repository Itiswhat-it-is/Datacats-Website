document.addEventListener("DOMContentLoaded", () => {
  let coins = parseInt(localStorage.getItem("coins")) || 500;
  document.getElementById("coin-count").textContent = coins;

  const availableCards = Array.from({ length: 75 }, (_, i) => i + 1).filter(n => n > 10);
  const cardList = document.querySelector(".card-list");

  let lastUpdate = localStorage.getItem("shopLastUpdate");
  let currentTime = new Date().getTime();
  let oneDay = 24 * 60 * 60 * 1000;

  if (!lastUpdate || currentTime - lastUpdate > oneDay) {
    let dailyCards = [];
    while (dailyCards.length < 5) {
      let randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      if (!dailyCards.includes(randomCard)) {
        dailyCards.push(randomCard);
      }
    }
    localStorage.setItem("dailyShopCards", JSON.stringify(dailyCards));
    localStorage.setItem("shopLastUpdate", currentTime);
  }

  let dailyShopCards = JSON.parse(localStorage.getItem("dailyShopCards")) || [];

  dailyShopCards.forEach(cardNum => {
    let cardItem = document.createElement("div");
    cardItem.classList.add("card-item");
    cardItem.innerHTML = `
      <img src="card${cardNum}.png" alt="Card ${cardNum}">
      <button data-card="${cardNum}" data-price="1500">Buy (1500 Coins)</button>
    `;
    cardList.appendChild(cardItem);
  });

  document.querySelectorAll(".card-item button").forEach(button => {
    button.addEventListener("click", () => {
      let cardNum = button.dataset.card;
      let price = parseInt(button.dataset.price);

      if (coins >= price) {
        coins -= price;
        localStorage.setItem("coins", coins);
        localStorage.setItem(`unlocked_card${cardNum}`, "true");
        document.getElementById("coin-count").textContent = coins;
        alert(`🎉 You bought Card ${cardNum}!`);
      } else {
        alert("❌ Not enough coins!");
      }
    });
  });

  function updateTimer() {
    let nextRefresh = parseInt(lastUpdate) + oneDay;
    let remainingTime = nextRefresh - new Date().getTime();

    let hours = Math.floor(remainingTime / (1000 * 60 * 60));
    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("timer").textContent = `${hours}h ${minutes}m`;
  }

  setInterval(updateTimer, 60000);
  updateTimer();
});
