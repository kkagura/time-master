export function secondToString(s: number) {
  const restS = s % 60;
  const min = Math.floor(s / 60);
  const restMin = min % 60;
  const hour = Math.floor(min / 60);
  return `${hour}小时${restMin}分${restS}秒`;
}
