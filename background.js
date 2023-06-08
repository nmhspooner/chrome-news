chrome.runtime.onInstalled.addListener(function () {
  chrome.alarms.create("fetchNews", { periodInMinutes: 60 }); // Fetch news every 60 minutes

  chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "fetchNews") {
      fetchNews();
    }
  });
});

function fetchNews() {
  // Make an API request to fetch the news data
  fetch("http://api.example.com/news") // Update with the actual news API URL
    .then((response) => response.json())
    .then((data) => {
      // Process the news data and store the summaries
      const summaries = data.articles.map((article) => ({
        title: article.title,
        summary: summarize(article.content), // Implement your summarization logic
      }));

      // Store the summaries in Chrome's storage
      chrome.storage.local.set({ newsSummaries: summaries });
    })
    .catch((error) => console.error("Error fetching news:", error));
}

function summarize(content) {
  // Implement your summarization logic here
  // This is a placeholder function that simply truncates the content
  return content.substring(0, 100) + "...";
}
