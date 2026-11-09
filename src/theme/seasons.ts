/** Seasonal moments the site dresses up for. Windows use the visitor's local date. */
export const SEASONS = ['halloween', 'thanksgiving', 'christmas', 'newyear', 'lunar', 'stpatricks', 'spring', 'july4', 'summer'] as const;
export type Season = (typeof SEASONS)[number];

/** The twelve animals in order, starting from the Year of the Rat (2020). */
export const ZODIAC = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'] as const;
export type Zodiac = (typeof ZODIAC)[number];

/**
 * Preview switch. Set it to force one season everywhere, for example:
 *   { season: 'christmas' }                 Christmas, dressed (brand green stays, the season adds its decor)
 *   { season: 'halloween', style: 'full' }  the Halloween palette replaces the brand green
 *   { season: 'lunar', zodiac: 'dragon' }   Lunar New Year with a chosen animal (otherwise the coming one)
 *   { season: 'none' }                      no season, even inside a seasonal window
 * Leave it null for production so the visitor's date decides. A ?season=&style=&zodiac= query string wins over it.
 */
export const seasonOverride: { season: Season | 'none'; style?: 'dressed' | 'full'; zodiac?: Zodiac } | null = null;

export const seasonGreetings: Record<Season, string> = {
  halloween: 'Happy Halloween',
  thanksgiving: 'Happy Thanksgiving',
  christmas: 'Merry Christmas',
  newyear: 'Happy New Year',
  lunar: 'Happy Lunar New Year',
  stpatricks: "Happy St. Patrick's Day",
  spring: 'Happy Spring',
  july4: 'Happy Fourth of July',
  summer: 'Happy Summer',
};

export const zodiacNames: Record<Zodiac, string> = {
  rat: 'Rat',
  ox: 'Ox',
  tiger: 'Tiger',
  rabbit: 'Rabbit',
  dragon: 'Dragon',
  snake: 'Snake',
  horse: 'Horse',
  goat: 'Goat',
  monkey: 'Monkey',
  rooster: 'Rooster',
  dog: 'Dog',
  pig: 'Pig',
};

/** Each animal's character, set in the red seal of the Lunar New Year decor. */
export const zodiacGlyphs: Record<Zodiac, string> = {
  rat: '鼠',
  ox: '牛',
  tiger: '虎',
  rabbit: '兔',
  dragon: '龍',
  snake: '蛇',
  horse: '馬',
  goat: '羊',
  monkey: '猴',
  rooster: '雞',
  dog: '狗',
  pig: '豬',
};

/** Lunar New Year's day as [month, day] per Gregorian year. A year past the table has no Lunar New Year season. */
export const lunarNewYear: Record<number, [number, number]> = {
  2025: [1, 29],
  2026: [2, 17],
  2027: [2, 6],
  2028: [1, 26],
  2029: [2, 13],
  2030: [2, 3],
  2031: [1, 23],
  2032: [2, 11],
  2033: [1, 31],
  2034: [2, 19],
  2035: [2, 8],
  2036: [1, 28],
  2037: [2, 15],
  2038: [2, 4],
  2039: [1, 24],
  2040: [2, 12],
  2041: [2, 1],
  2042: [1, 22],
  2043: [2, 10],
  2044: [1, 30],
  2045: [2, 17],
  2046: [2, 6],
  2047: [1, 26],
  2048: [2, 14],
  2049: [2, 2],
  2050: [1, 23],
};

/**
 * Which season a date falls in, or null.
 * Halloween is October, Thanksgiving November, Christmas December, New Year Jan 1-14, Lunar New Year two weeks
 * before its day to two weeks after, St. Patrick's Mar 10-17, Spring Mar 18 to Apr 30, July 4th Jun 28 to Jul 7,
 * Summer Jul 8 to Aug 31. The same dates as the eye care site's seasonFor.
 * Self-contained so it can be serialized into the pre-paint script.
 */
export function seasonOn(now: Date, lny: Record<number, [number, number]>): Season | null {
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const monthDay = month * 100 + day;

  if (month === 10) return 'halloween';
  if (month === 11) return 'thanksgiving';
  if (month === 12) return 'christmas';
  // Checked before Lunar New Year, so in a year when its day comes early that season starts on Jan 15
  if (monthDay <= 114) return 'newyear';

  const newYearsDay = lny[year];
  if (newYearsDay) {
    const start = new Date(year, newYearsDay[0] - 1, newYearsDay[1] - 14);
    const end = new Date(year, newYearsDay[0] - 1, newYearsDay[1] + 15);
    if (now >= start && now < end) return 'lunar';
  }

  if (monthDay >= 310 && monthDay <= 317) return 'stpatricks';
  if (monthDay >= 318 && monthDay <= 430) return 'spring';
  if (monthDay >= 628 && monthDay <= 707) return 'july4';
  if (monthDay >= 708 && monthDay <= 831) return 'summer';
  return null;
}

/**
 * The animal of the current Lunar New Year, or of the coming one once this year's has passed.
 * Self-contained so it can be serialized into the pre-paint script.
 */
export function zodiacOn(now: Date, lny: Record<number, [number, number]>, animals: readonly string[]): string {
  let year = now.getFullYear();
  const newYearsDay = lny[year];
  if (newYearsDay && now >= new Date(year, newYearsDay[0] - 1, newYearsDay[1] + 15)) year += 1;
  return animals[(((year - 2020) % 12) + 12) % 12];
}
