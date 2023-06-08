document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'getNewsSummaries'}, function(response) {
      const newsList = document.getElementById('newsList');
      if (response && response.articles) {
        response.articles.forEach(function(article) {
          const li = document.createElement('li');
          li.textContent = article.title + ': ' + article.summary;
          newsList.appendChild(li);
        });
      } else {
        const li = document.createElement('li');
        li.textContent = 'No news articles found.';
        newsList.appendChild(li);
      }
    });
  });
});
