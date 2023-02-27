export const initSound = (): void => {
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

  if (isMobileDevice) {
    localStorage.setItem('lumosityIsSound', 'false');
  }
};

export const setIsSound = (isSound: boolean): void => {
  localStorage.setItem('lumosityIsSound', isSound.toString());
};

export const getIsSound = (): boolean => {
  const isSound = localStorage.getItem('lumosityIsSound');
  const isSoundBool = isSound === 'false' ? false : true;

  return isSoundBool;
};
