// Perioodide tüüpide definitsioonid ühes kohas
const PERIOD_TYPES = {
  ettekasvatus: { name: 'Ettekasvatus', symbol: 'E' },
  otsekulv: { name: 'Otsekülv avamaale', symbol: 'O' },
  kasvuhoonesse: { name: 'Istutamine kasvuhoonesse', symbol: 'KH' },
  oue: { name: 'Istutamine õue', symbol: 'Õ' }
};

// Kultuuride andmebaas
const crops = [
  {
    id: 'tsilli',
    name: 'Tšilli',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 2, end: 3 },
      { id: 'otsekulv', start: 0, end: 0 },
      { id: 'kasvuhoonesse', start: 5, end: 5 },
      { id: 'oue', start: 6, end: 6 },
    ]
  },
  {
    id: 'paprika',
    name: 'Paprika',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 2, end: 2 },
      { id: 'otsekulv', start: 0, end: 0 },
      { id: 'kasvuhoonesse', start: 5, end: 5 },
      { id: 'oue', start: 0, end: 0 }
    ]
  },
  {
    id: 'tomat',
    name: 'Tomat',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 2, end: 3 },
      { id: 'otsekulv', start: 0, end: 0 },
      { id: 'kasvuhoonesse', start: 5, end: 5 },
      { id: 'oue', start: 6, end: 6 }
    ]
  },
  {
    id: 'baklazaan',
    name: 'Baklažaan',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 2, end: 2 },
      { id: 'otsekulv', start: 0, end: 0 },
      { id: 'kasvuhoonesse', start: 5, end: 5 },
      { id: 'oue', start: 0, end: 0 }
    ]
  },
  {
    id: 'peakapsas',
    name: 'Peakapsas',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 3, end: 4 },
      { id: 'otsekulv', start: 5, end: 6 },
      { id: 'kasvuhoonesse', start: 4, end: 4 },
      { id: 'oue', start: 5, end: 5 }
    ]
  },
  {
    id: 'lillkapsas',
    name: 'Lillkapsas',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 3, end: 4 },
      { id: 'otsekulv', start: 5, end: 6 },
      { id: 'kasvuhoonesse', start: 4, end: 4 },
      { id: 'oue', start: 5, end: 5 }
    ]
  },
  {
    id: 'sibul',
    name: 'Sibul (Tippsubul)',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 0, end: 0 },
      { id: 'otsekulv', start: 4, end: 5 },
      { id: 'kasvuhoonesse', start: 0, end: 0 },
      { id: 'oue', start: 0, end: 0 }
    ]
  },
  {
    id: 'porgand',
    name: 'Porgand',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 0, end: 0 },
      { id: 'otsekulv', start: 4, end: 5 },
      { id: 'kasvuhoonesse', start: 0, end: 0 },
      { id: 'oue', start: 0, end: 0 }
    ]
  },
  {
    id: 'hernes',
    name: 'Hernes',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 0, end: 0 },
      { id: 'otsekulv', start: 4, end: 5 },
      { id: 'kasvuhoonesse', start: 0, end: 0 },
      { id: 'oue', start: 0, end: 0 }
    ]
  },
  {
    id: 'aeduba',
    name: 'Aeduba',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 0, end: 0 },
      { id: 'otsekulv', start: 5, end: 6 },
      { id: 'kasvuhoonesse', start: 0, end: 0 },
      { id: 'oue', start: 0, end: 0 }
    ]
  },
  {
    id: 'redis',
    name: 'Redis',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 0, end: 0 },
      { id: 'otsekulv', start: 4, end: 9 },
      { id: 'kasvuhoonesse', start: 0, end: 0 },
      { id: 'oue', start: 0, end: 0 }
    ]
  },
  {
    id: 'salat-spinat',
    name: 'Salat/Spinat',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 3, end: 3 },
      { id: 'otsekulv', start: 4, end: 8 },
      { id: 'kasvuhoonesse', start: 3, end: 3 },
      { id: 'oue', start: 4, end: 4 }
    ]
  },
  {
    id: 'peet',
    name: 'Peet',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 5, end: 5 },
      { id: 'otsekulv', start: 5, end: 5 },
      { id: 'kasvuhoonesse', start: 0, end: 0 },
      { id: 'oue', start: 5, end: 6}
    ]
  },
  {
    id: 'kurk',
    name: 'Kurk',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 4, end: 4 },
      { id: 'otsekulv', start: 5, end: 5 },
      { id: 'kasvuhoonesse', start: 5, end: 5 },
      { id: 'oue', start: 6, end: 6}
    ]
  },
  {
    id: 'korvits',
    name: 'Kõrvits',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 4, end: 4 },
      { id: 'otsekulv', start: 5, end: 6 },
      { id: 'kasvuhoonesse', start: 5, end: 5 },
      { id: 'oue', start: 6, end: 6}
    ]
  },
  {
    id: 'suvikorvits',
    name: 'Suvikõrvits',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 4, end: 4 },
      { id: 'otsekulv', start: 5, end: 6 },
      { id: 'kasvuhoonesse', start: 5, end: 5 },
      { id: 'oue', start: 6, end: 6}
    ]
  },
  {
    id: 'melon',
    name: 'Melon',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 3, end: 4 },
      { id: 'otsekulv', start: 0, end: 0 },
      { id: 'kasvuhoonesse', start: 5, end: 5 },
      { id: 'oue', start: 0, end: 0}
    ]
  },
  {
    id: 'kuuslauk',
    name: 'Küüslauk',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      { id: 'ettekasvatus', start: 0, end: 0 },
      { id: 'otsekulv', start: 10, end: 10 },
      { id: 'kasvuhoonesse', start: 0, end: 0 },
      { id: 'oue', start: 0, end: 0}
    ]
  },
]; 

const months = [
  { id: 1, name: 'JAAN', season: 'winter' },
  { id: 2, name: 'VEEB', season: 'winter' },
  { id: 3, name: 'MÄR', season: 'spring' },
  { id: 4, name: 'APR', season: 'spring' },
  { id: 5, name: 'MAI', season: 'spring' },
  { id: 6, name: 'JUN', season: 'summer' },
  { id: 7, name: 'JUL', season: 'summer' },
  { id: 8, name: 'AUG', season: 'summer' },
  { id: 9, name: 'SEPT', season: 'autumn' },
  { id: 10, name: 'OKT', season: 'autumn' },
  { id: 11, name: 'NOV', season: 'autumn' },
  { id: 12, name: 'DETS', season: 'winter' }
];

// Get all crops
function getCrops() {
  return crops.map(crop => ({
    ...crop,
    periods: crop.periods
      .filter(p => p.start > 0) // Filtreerime tühjad kohe välja
      .map(p => ({
        ...p,
        ...PERIOD_TYPES[p.id] // See lisab 'name' ja 'symbol' otse perioodi külge
      }))
  }));
}

// Get all months
function getMonths() {
  return months;
}

// Get crop by ID
function getCropById(id) {
  return crops.find(crop => crop.id === id);
}

// Get user activities for selected crops (location and days used for filtering/range)
function getUserActivities(userCrops, location, days) {
  const activities = [];
  const now = new Date();
  const startMonth = now.getMonth() + 1; // 1–12

  userCrops.forEach((uc) => {
    const crop = getCropById(uc.cropId);
    if (!crop) return;

    (crop.periods || []).forEach((p) => {
      const periodType = PERIOD_TYPES[p.id];
      if (!periodType || (p.start === 0 && p.end === 0)) return;

      for (let month = p.start; month <= p.end; month++) {
        activities.push({
          cropId: crop.id,
          cropName: crop.name,
          periodId: p.id,
          periodName: periodType.name,
          symbol: periodType.symbol,
          month,
          location: uc.location || location
        });
      }
    });
  });

  return activities.sort((a, b) => a.month - b.month);
}

module.exports = {
  getCrops,
  getCropById,
  getMonths,
  getUserActivities,
};
