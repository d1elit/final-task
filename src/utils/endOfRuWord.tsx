export enum WordGenger {
  male = 'male',
  female = 'female',
}

export enum WordCase {
  nominative = 'nominative',
  parent = 'parent',
  accusative = 'accusative ',
}

export enum EndOfWord {
  f1 = 'а',
  f1_accusative = 'у',
  f234 = 'и',
  f520 = 'ок',
  m1 = '',
  m234 = 'а',
  m520 = 'ов',
}

export enum Lang {
  en = 'en',
  ru = 'ru',
}

/**
 * Returns the ending of a Russian word based on the amount of what you want to describe.
 * Like: 1 - плиткА, 2, - плиткИ, 5 - плитОК
 * @param {Lang} lang Current language
 * @param {WordGenger} gender Gender of word (male / female)
 * @param {WordCase} wordCase Case of word
 * @param {number} count The amount of what you want to describe
 * @author EvgeniiKolesnikov
 */

export const GetEndOfWord = (
  lang: string,
  gender: WordGenger,
  wordCase: WordCase,
  count: number
): string => {
  const last: string = count.toString().at(-1) || '';
  const lastDigit: number = +last || 0;
  if (lang === Lang.en) {
    return count === 1 ? '' : 's';
  }

  if (lang === Lang.ru) {
    if (gender === WordGenger.male) {
      if (count >= 5 && count <= 20) {
        return EndOfWord.m520;
      } else if (lastDigit === 1) {
        return EndOfWord.m1;
      } else if (lastDigit > 1 && lastDigit < 5) {
        return EndOfWord.m234;
      } else if (lastDigit >= 5 && lastDigit < 5) {
        return EndOfWord.m520;
      } else if (lastDigit === 0) {
        return EndOfWord.m520;
      }
    } else if (gender === WordGenger.female) {
      if (count >= 5 && count <= 20) {
        return EndOfWord.m520;
      } else if (lastDigit === 1) {
        return wordCase === WordCase.accusative
          ? EndOfWord.f1_accusative
          : EndOfWord.f1;
      } else if (lastDigit > 1 && lastDigit < 5) {
        return EndOfWord.f234;
      } else if (lastDigit >= 5 && lastDigit < 5) {
        return EndOfWord.f520;
      } else if (lastDigit === 0) {
        return EndOfWord.f520;
      }
    }
  }

  return '';
};
