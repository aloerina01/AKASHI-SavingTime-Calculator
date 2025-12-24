/**
 * 時間文字列（"HH:MM"）を分単位の数値に変換
 * @param timeStr - 時間文字列（例: "8:30"）
 * @returns 分単位の数値（例: 510）
 */
export const timeToNumber = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

/**
 * 分単位の数値を時間文字列（"HH:MM"）に変換
 * 負の値にも対応（"-"プレフィックスを付与）
 * @param totalMinutes - 分単位の数値（例: -30, 510）
 * @returns 時間文字列（例: "-0:30", "8:30"）
 */
export const numberToTime = (totalMinutes: number): string => {
  // 1. 符号を判定し、計算用に絶対値（正の数）にする
  const isNegative = totalMinutes < 0;
  const absMinutes = Math.abs(totalMinutes);

  // 2. 時と分を計算
  const hours = Math.floor(absMinutes / 60);
  const minutes = absMinutes % 60;

  // 3. 分を2桁（00形式）にパディングする
  const formattedMinutes = String(minutes).padStart(2, "0");

  // 4. 符号を付けて結合して返す
  return `${isNegative ? "-" : ""}${hours}:${formattedMinutes}`;
};

