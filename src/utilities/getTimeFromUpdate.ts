export function getTimeFromUpdate(date: string) {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  const { unit, time } = getTimeUnit(seconds);
  const rtf = new Intl.RelativeTimeFormat("pl", { numeric: "auto" });
  const formatedTime = rtf.format(-time, (unit as any));

  return formatedTime;
}

function getTimeUnit(time: number): { unit: string, time: number } { // time in seconds
  const timestamps = {
    seconds: 60,
    minutes: 60 * 60,
    hours: 60 * 60 * 24,
    days: 60 * 60 * 24 * 365 / 12,
    months: 60 * 60 * 24 * 365,
  }
  let unit = "year";
  if (time < timestamps.seconds) {
    unit = "second";
  } else if (time < timestamps.minutes) {
    unit = "minute";
    time /= timestamps.seconds;
  } else if (time < timestamps.hours) {
    unit = "hour";
    time /= timestamps.minutes;
  } else if (time < timestamps.days) {
    unit = "day";
    time /= timestamps.hours;
  } else if (time < timestamps.months) {
    unit = "month";
    time /= timestamps.days;
  } else {
    time /= timestamps.months;
  }
  return { unit: unit, time: Math.floor(time) }
}

