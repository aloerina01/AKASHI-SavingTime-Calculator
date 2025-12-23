// Popup Script
document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup loaded');
  
  // ここにポップアップのロジックを追加
  const app = document.getElementById('app');
  if (app) {
    app.textContent = 'AKASHI SavingTime Calculator';
  }
});

