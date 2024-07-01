import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getRelativeTime } from "./getRelativeTime";
import { Duration } from "./Duration.enum";

const now = new Date("2024-01-01");
const nowInMs = now.getTime();

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("getRelativeTime", () => {
  it("should handle seconds", () => {
    expect(getRelativeTime(nowInMs - Duration.Second)).toBe("1 sekundę temu");
  });
  it("should handle minutes", () => {
    expect(getRelativeTime(nowInMs - Duration.Minute)).toBe("1 minutę temu");
  });
  it("should handle hours", () => {
    expect(getRelativeTime(nowInMs - Duration.Hour)).toBe("1 godzinę temu");
  });
  it("should handle days", () => {
    expect(getRelativeTime(nowInMs - Duration.Day)).toBe("wczoraj");
    expect(getRelativeTime(nowInMs - Duration.Hour * 47)).toBe("wczoraj");
    expect(getRelativeTime(nowInMs - Duration.Hour * 48)).toBe("przedwczoraj");
  });
  it("should handle months", () => {
    expect(getRelativeTime(nowInMs - Duration.Month)).toBe(
      "w zeszłym miesiącu",
    );
    expect(getRelativeTime(nowInMs - Duration.Month * 2)).toBe(
      "2 miesiące temu",
    );
  });
  it("should handle years", () => {
    expect(getRelativeTime(nowInMs - Duration.Year)).toBe("w zeszłym roku");
    expect(getRelativeTime(nowInMs - Duration.Year * 2)).toBe("2 lata temu");
  });
});

describe("getRelativeTime with smallestDuration equal to day", () => {
  const getRelativeTimeWithDay = (date: string | number | Date) =>
    getRelativeTime(date, Duration.Day);

  it("should handle seconds", () => {
    expect(getRelativeTimeWithDay(nowInMs - Duration.Second)).toBe("dzisiaj");
  });
  it("should handle minutes", () => {
    expect(getRelativeTimeWithDay(nowInMs - Duration.Minute)).toBe("dzisiaj");
  });
  it("should handle hours", () => {
    expect(getRelativeTimeWithDay(nowInMs - Duration.Hour)).toBe("dzisiaj");
  });
  it("should handle days", () => {
    expect(getRelativeTimeWithDay(nowInMs - Duration.Day)).toBe("wczoraj");
    expect(getRelativeTimeWithDay(nowInMs - Duration.Hour * 47)).toBe(
      "wczoraj",
    );
    expect(getRelativeTimeWithDay(nowInMs - Duration.Hour * 48)).toBe(
      "przedwczoraj",
    );
  });
  it("should handle months", () => {
    expect(getRelativeTimeWithDay(nowInMs - Duration.Month)).toBe(
      "w zeszłym miesiącu",
    );
    expect(getRelativeTimeWithDay(nowInMs - Duration.Month * 2)).toBe(
      "2 miesiące temu",
    );
  });
  it("should handle years", () => {
    expect(getRelativeTimeWithDay(nowInMs - Duration.Year)).toBe(
      "w zeszłym roku",
    );
    expect(getRelativeTimeWithDay(nowInMs - Duration.Year * 2)).toBe(
      "2 lata temu",
    );
  });
});
