export const ICON_BASE = process.env.PUBLIC_URL + '/Img/Kalender/';

export const LEGEND_ITEMS = [
  { id: 'ettekasvatus', symbol: 'E', label: 'Ettekasvatus', icon: 'ettekasvatus.png' },
  { id: 'otsekulv', symbol: 'O', label: 'Otsekülv avamaale', icon: 'avamaale.png' },
  { id: 'kasvuhoonesse', symbol: 'KH', label: 'Istutus kasvuhoonesse', icon: 'kasvuhoonesse.png' },
  { id: 'oue', symbol: 'Õ', label: 'Istutus õue', icon: 'õue.png' },
];

/** Kuude lühendid pildi stiilis (JAN, VEEB, MÄR, …) */
export const MONTH_SHORT = {
  1: 'JAN', 2: 'VEEB', 3: 'MÄR', 4: 'APR', 5: 'MAI', 6: 'JUN',
  7: 'JUL', 8: 'AUG', 9: 'SEPT', 10: 'OKT', 11: 'NOV', 12: 'DETS',
};

export const getIconForPeriod = (periodId) => {
  const item = LEGEND_ITEMS.find((l) => l.id === periodId);
  return item ? ICON_BASE + item.icon : null;
};

export const getLabelForPeriod = (periodId) => {
  const item = LEGEND_ITEMS.find((l) => l.id === periodId);
  return item ? item.label : '';
};
