chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getNewsSummaries') {
    const articles = Array.from(document.querySelectorAll('.news-headline-list .story'));
    const newsSummaries = articles.map(function(article) {
      const title = article.querySelector('.story-title a').innerText.trim();
      const summary = article.querySelector('.story-content p').innerText.trim();
      return { title, summary };
    });
    sendResponse({ articles: newsSummaries });
  }
});
