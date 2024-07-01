/**
 * Duration in milliseconds
 */
export enum Duration {
  Second = 1000,
  Minute = 1000 * 60,
  Hour = 1000 * 60 * 60,
  Day = 1000 * 60 * 60 * 24,
  Month = (1000 * 60 * 60 * 24 * 365) / 12,
  Year = 1000 * 60 * 60 * 24 * 365,
}
