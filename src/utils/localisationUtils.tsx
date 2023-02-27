import i18n from './i18next';

export const setLocalisationStyle = () => {
  const langElem = document.querySelector('.header__lang') as HTMLElement;
  const currentLang = localStorage.getItem('i18nextLng');
  !currentLang
    ? (langElem.className = 'header__lang header__lang_en')
    : (langElem.className = `header__lang header__lang_${currentLang}`);
};

export const setStyles = (): void => {
  const langElem = document.querySelector('.header__lang') as HTMLElement;
  const currentLang = localStorage.getItem('i18nextLng');
  if (!currentLang) {
    langElem.className = 'header__lang header__lang_en';
  } else {
    currentLang === 'en'
      ? void i18n.changeLanguage('ru')
      : void i18n.changeLanguage('en');
    langElem.className = `header__lang header__lang_${i18n.language}`;
  }
};
