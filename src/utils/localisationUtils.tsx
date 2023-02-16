export const getLang = (): string => {
  return localStorage.getItem('lang') as string;
};
