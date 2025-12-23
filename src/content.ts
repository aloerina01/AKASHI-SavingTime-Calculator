// Content Script
console.log('AKASHI SavingTime Calculator content script loaded');

// ページ読み込み時の処理
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  console.log('Content script initialized');
  // ここにコンテンツスクリプトのロジックを追加
}

