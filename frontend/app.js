document.addEventListener("DOMContentLoaded", () => {
  const matchesContainer = document.getElementById("matches");

  fetch("http://localhost:3000/matches") // ✅ FIXED: Full URL
    .then((res) => res.json())
    .then((data) => {
      if (!data.events || data.events.length === 0) {
        matchesContainer.innerHTML = "<p>No upcoming matches found.</p>";
        return;
      }

      data.events.forEach((match) => {
        const matchEl = document.createElement("div");
        matchEl.className = "match";
        matchEl.innerHTML = `
          <h3>${match.homeTeam} vs ${match.awayTeam}</h3>
          <p>Date: ${new Date(match.date).toLocaleString()}</p>
        `;
        matchesContainer.appendChild(matchEl);
      });
    })
    .catch((err) => {
      console.error("Error fetching matches:", err);
      matchesContainer.innerHTML = "<p>Failed to load matches.</p>";
    });
});
