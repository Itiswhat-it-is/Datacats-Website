document.getElementById("contact-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();
  const responseMessage = document.getElementById("form-response");

  if (!name || !message) {
    responseMessage.textContent = "❌ Please fill out all fields.";
    return;
  }

  // GitHub Issue Data
  const repoOwner = "itiswhat-it-is"; // 🔹 Replace with your GitHub username
  const repoName = "itiswhat-it-is/Datacats-Website"; // 🔹 Replace with your repository name
  const issueTitle = `New Message from ${name}`;
  const issueBody = `**Name:** ${name}\n\n**Message:**\n${message}`;

  // GitHub Issues URL
  const githubUrl = `https://github.com/${repoOwner}/${repoName}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;

  // Open GitHub Issues page in a new tab
  window.open(githubUrl, "_blank");

  responseMessage.textContent = "✅ Redirecting to GitHub to submit your message.";
  document.getElementById("contact-form").reset();
});
