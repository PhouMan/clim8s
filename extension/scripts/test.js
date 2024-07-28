function extractLinkText() {
  const linkElements = document.querySelectorAll("a.result");
  const extractedTexts = [];

  linkElements.forEach((link) => {
    const text = link.textContent;
    if (text && text.includes(":")) {
      extractedTexts.push({ text, url: link.href });
    }
  });

  return extractedTexts;
}

function injectContent() {
  const contentScript = document.createElement("script");
  contentScript.src = "content.js";
  document.body.appendChild(contentScript);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractLinkText") {
    const extractedTexts = extractLinkText();
    chrome.runtime.sendMessage({ action: "displayContent", texts: extractedTexts });
  }
});

injectContent();
