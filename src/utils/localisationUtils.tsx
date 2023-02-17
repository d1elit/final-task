export const setStyles = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
): void => {
  const langs = document.querySelectorAll('.header__lang') as NodeList;
  const target = e.target as HTMLElement;
  langs.forEach(lang => {
    (lang as HTMLElement).innerHTML === target.innerHTML
      ? (lang as HTMLElement).classList.add('header__lang_active')
      : (lang as HTMLElement).classList.remove('header__lang_active');
  });
};
