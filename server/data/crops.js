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
  { id: 3, name: 'MÄRTS', season: 'spring' },
  { id: 4, name: 'APRIL', season: 'spring' },
  { id: 5, name: 'MAI', season: 'spring' },
  { id: 6, name: 'JUUNI', season: 'summer' },
  { id: 7, name: 'JUULI', season: 'summer' },
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

// Get user activities based on selected crops and location
function getUserActivities(userCrops, location, days = 14) {
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + days);
  
  const activities = [];
  
  userCrops.forEach(userCrop => {
    const crop = getCropById(userCrop.cropId);
    if (!crop || !crop.periods[location]) {
      return;
    }
    
    const period = crop.periods[location];
    const year = today.getFullYear();
    
    period.activities.forEach(activity => {
      // Create date for this year
      let activityDate = new Date(year, activity.month - 1, activity.day);
      
      // If activity date has passed this year, check next year
      if (activityDate < today) {
        activityDate = new Date(year + 1, activity.month - 1, activity.day);
      }
      
      // Check if activity is within the date range
      if (activityDate >= today && activityDate <= endDate) {
        activities.push({
          date: activityDate.toISOString().split('T')[0],
          cropId: crop.id,
          cropName: crop.name,
          location: location,
          type: activity.type,
          description: activity.description,
          daysUntil: Math.ceil((activityDate - today) / (1000 * 60 * 60 * 24))
        });
      }
    });
  });
  
  // Sort by date
  activities.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  return activities;
}

module.exports = {
  getCrops,
  getCropById,
  getUserActivities,
  getMonths,
};
