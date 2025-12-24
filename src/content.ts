// Content Script
import { timeToNumber, numberToTime } from './utils/timeUtils';

let isProcessed = false;

const addTableHeader = (): void => {
  const thead = document.querySelector('thead');
  if (!thead) {
    return;
  }

  const headerRow = thead.children[0];
  if (!headerRow) {
    return;
  }

  const th = document.createElement('th');
  th.className = "c-main-table-header__cell sticky";
  th.textContent = '累計貯金時間';
  headerRow.appendChild(th);
};

const calculateSavingTime = (): void => {
  if (isProcessed) {
    return;
  }
  
  const elms = document.querySelectorAll("[id^='working_report_']");
  const trs = Array.from(elms);
  
  if (trs.length === 0) {
    return;
  }

  let totalSaving = 0;
  const SCHEDULED_WORKING_TIME = 480; // 8時間

  trs.forEach((tr) => {
    // 想定外データをはじく
    if (!tr?.children[4]) return;

    // 労働時間がまだ埋まってない場合は何もしない
    const timeStr = tr.children[4].textContent?.replace(" ", "") || "";
    const time = timeToNumber(timeStr);
    if (Number.isNaN(time)) return;

    let saving = 0;
    if (!tr.children[3].textContent?.includes("休")) {
      saving = time - SCHEDULED_WORKING_TIME;
    }

    tr.children[4].textContent += ` (${numberToTime(saving)})`;
    totalSaving += saving;
    
    const td = document.createElement("td");
    td.className = "c-main-table-body__cell";
    const totalSavingStr = numberToTime(totalSaving);
    td.textContent = totalSavingStr;
    td.style.color = totalSavingStr.includes("-") ? "red" : "#2a77fa";
    tr.appendChild(td);
  });
  
  isProcessed = true;
  console.log('AKASHI SavingTime Calculator: 勤怠計算を実行しました');
};

// MutationObserverを使用して要素の出現を待つ
const waitForElements = (): void => {
  const targetSelector = "[id^='working_report_']";

  // 既に要素が存在する場合は即座に実行
  if (document.querySelector(targetSelector)) {
    addTableHeader();
    return calculateSavingTime();
  }

  // MutationObserverでDOMの変更を監視
  const observer = new MutationObserver((mutations, obs) => {
    const elements = document.querySelectorAll(targetSelector);
    
    if (elements.length > 0) {
      addTableHeader();
      calculateSavingTime();
      obs.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

const init = (): void => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForElements);
  } else {
    waitForElements();
  }
};

init();

