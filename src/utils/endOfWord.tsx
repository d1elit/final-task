export enum Lang {
  en = 'en',
  ru = 'ru',
}

/**
 * Returns the ending of a Russian word based on the amount of what you want to describe.
 * Like: 1 - плитКА, 2, - плитКИ, 5 - плитОК.
 * - e.g. GetEndOfWord('ru', 5, 'ка', 'ки', 'ок') // ок
 * @param {Lang} lang Current language
 * @param {number} count The amount of what you want to describe
 * @param {string} end1 The end of the word when if 1 unit
 * @param {string} end234 The end of the word when if 2-4 unit
 * @param {string} end520 The end of the word when if 0, 5-20 unit
 * @author EvgeniiKolesnikov
 */

export const GetEndOfWord = (
  lang: string,
  count: number,
  end1: string,
  end234: string,
  end520: string
): string => {
  const last: string = count.toString().at(-1) || '';
  const lastDigit: number = +last || 0;

  if (lang === 'en') {
    return count === 1 ? '' : 's';
  }

  if (lang === 'ru') {
    if (count >= 5 && count <= 20) {
      return end520;
    } else if (lastDigit === 1) {
      return end1;
    } else if (lastDigit > 1 && lastDigit < 5) {
      return end234;
    } else if (lastDigit >= 5 && lastDigit < 5) {
      return end520;
    } else if (lastDigit === 0) {
      return end520;
    }
  }

  return '';
};
