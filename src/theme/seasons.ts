/** Seasonal moments the site dresses up for. Windows use the visitor's local date. */
export const SEASONS = ['halloween', 'thanksgiving', 'christmas', 'newyear', 'lunar'] as const;
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

/** Lunar New Year's day as [month, day] per Gregorian year. The season runs from the eve through the Lantern Festival. */
export const lunarNewYear: Record<number, [number, number]> = {
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
};

/**
 * Which season a date falls in, or null.
 * Halloween Oct 15-31, Thanksgiving week (Monday to Sunday around the fourth Thursday of November),
 * Christmas Dec 1-30, New Year Dec 31 to Jan 2, Lunar New Year from its eve through the Lantern Festival.
 * Self-contained so it can be serialized into the pre-paint script.
 */
export function seasonOn(now: Date, lny: Record<number, [number, number]>): Season | null {
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const monthDay = month * 100 + day;

  if (monthDay >= 1015 && monthDay <= 1031) return 'halloween';
  if (month === 11) {
    const firstThursday = 1 + ((11 - new Date(year, 10, 1).getDay()) % 7);
    const thanksgiving = firstThursday + 21;
    if (day >= thanksgiving - 3 && day <= thanksgiving + 3) return 'thanksgiving';
  }
  if (monthDay >= 1201 && monthDay <= 1230) return 'christmas';
  if (monthDay === 1231 || monthDay <= 102) return 'newyear';

  const newYearsDay = lny[year];
  if (newYearsDay) {
    const start = new Date(year, newYearsDay[0] - 1, newYearsDay[1] - 1);
    const end = new Date(year, newYearsDay[0] - 1, newYearsDay[1] + 15);
    if (now >= start && now < end) return 'lunar';
  }
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
