// Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  console.log('AKASHI SavingTime Calculator installed');
});

// メッセージリスナー
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);
  return true;
});

