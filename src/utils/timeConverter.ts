export function UTCtoLocalDate(UTCStr: string): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: string;
  period: 'am' | 'pm';
} {
  const date = new Date(UTCStr);
  const hour = date.getHours();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // Months are zero-based in JavaScript
    day: date.getDate(),
    hour: hour % 12 || 12,
    minute: date.getMinutes().toString().padStart(2, '0'),
    period: date.getHours() >= 12 ? 'pm' : 'am',
  };
}

export function timeToString(time: ReturnType<typeof UTCtoLocalDate>): string {
  const { year, month, day, hour, minute, period } = time;
  return `${year}. ${month}. ${day}. ${hour}:${minute}${period}`;
}
