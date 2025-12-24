// Content Script
import { timeToNumber, numberToTime } from './utils/timeUtils';

// URLチェック: ak4.jpドメインかつattendanceを含む場合のみ実行
const shouldExecute = (): boolean => {
  const url = window.location.href;
  return url.includes('ak4.jp') && url.includes('attendance');
};

// 勤怠計算処理
function calculateSavingTime(): void {
  const elms = document.querySelectorAll("[id^='working_report_']");
  const trs = Array.from(elms);
  let totalSaving = 0;
  const SCHEDULED_WORKING_TIME = 480; // 8時間 = 480分

  trs.forEach((tr) => {
    // 想定外データをはじく
    if (!tr || !tr.children[4]) return;

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
}

// ページ読み込み時の処理
function init(): void {
  if (!shouldExecute()) {
    console.log('AKASHI SavingTime Calculator: URL条件に一致しないため実行をスキップ');
    return;
  }

  console.log('AKASHI SavingTime Calculator: 勤怠計算を実行');
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', calculateSavingTime);
  } else {
    calculateSavingTime();
  }
}

init();

