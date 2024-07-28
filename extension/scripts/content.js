function createContentElement(text) {
  const element = document.createElement("div");
  element.textContent = text;
  return element;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "displayContent") {
    const texts = request.texts;
    texts.forEach((textObject) => {
      const contentElement = createContentElement(textObject.text);
      const linkElement = document.createElement("a");
      linkElement.href = textObject.url;
      linkElement.appendChild(contentElement);
      document.body.appendChild(linkElement);
    });
  }
});
