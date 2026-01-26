// Kultuuride andmebaas
const crops = [
  {
    id: 'tsilli',
    name: 'Tšilli',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      {
        id: 'ettekasvatus',
        name: 'Ettekasvatus',
        symbol: 'E',
        start: 2,
        end: 3
      },
      {
        id: 'otsekulv',
        name: 'Otsekülv avamaale',
        symbol: 'O',
        start: 0,
        end: 0
      },
      {
        id: 'kasvuhoonesse',
        name: 'Istutamine kasvuhoonesse',
        symbol: 'KH',
        start: 5,
        end: 5
      },
      {
        id: 'oue',
        name: 'Istutamine õue',
        symbol: 'Õ',
        start: 6,
        end: 6
      },
    ]
  },
  {
    id: 'paprika',
    name: 'Paprika',
    description: 'Taimede kasvatamisel on oluline arvestada iga liigi vajadustega, eriti valguse, vee ja toitainete osas. Enamik taimi eelistab valget ja sobiva temperatuuriga kasvukohta. Muld peaks olema õhuline ja toitaineterikas, et juured saaksid hästi areneda. Kastmisel tuleb hoida tasakaalu, sest nii liigne kuivus kui ka ülekastmine võivad taimi kahjustada. Regulaarne väetamine aitab tagada tugeva kasvu ja parema saagi. Samuti on oluline taimi aeg-ajalt kontrollida, et märgata varakult kahjureid või haigusi. Hoolikas ja järjepidev tähelepanu loob head eeldused taimede tervislikuks kasvuks.',
    periods: [
      {
        id: 'ettekasvatus',
        name: 'Ettekasvatus',
        symbol: 'E',
        start: 2,
        end: 2
      },
      {
        id: 'otsekulv',
        name: 'Otsekülv avamaale',
        symbol: 'O',
        start: 0,
        end: 0
      },
      {
        id: 'kasvuhoonesse',
        name: 'Istutamine kasvuhoonesse',
        symbol: 'KH',
        start: 5,
        end: 5
      },
      {
        id: 'oue',
        name: 'Istutamine õue',
        symbol: 'Õ',
        start: 0,
        end: 0
      },
    ]
  },
/*
  {
    id: 'tomat',
    name: 'Tomat',
    plantingMethod: 'Istutamine',
    description: 'Tomatid on soojalembed kultuurid, mis vajavad palju päikest.',
    periods: {
      'avamaa': {
        start: { month: 5, day: 15 },
        end: { month: 6, day: 10 },
        activities: [
          { type: 'Külv kasvuhoones', month: 3, day: 1, description: 'Alusta seemnete külvamist kasvuhoones' },
          { type: 'Istutamine välja', month: 5, day: 15, description: 'Istuta taimed välja pärast viimaseid külmakünkaid' },
          { type: 'Hooldus', month: 6, day: 1, description: 'Kinnita taimed tugipostide külge' },
          { type: 'Hooldus', month: 7, day: 1, description: 'Korista külgmised võrsed' },
          { type: 'Koristus', month: 8, day: 1, description: 'Alusta viljade koristamist' }
        ]
      },
      'kasvuhoone': {
        start: { month: 2, day: 15 },
        end: { month: 3, day: 15 },
        activities: [
          { type: 'Külv', month: 2, day: 15, description: 'Külva seemned kasvuhoones' },
          { type: 'Istutamine', month: 3, day: 15, description: 'Istuta taimed põllule' },
          { type: 'Hooldus', month: 4, day: 1, description: 'Kinnita taimed tugipostide külge' },
          { type: 'Koristus', month: 6, day: 1, description: 'Alusta viljade koristamist' }
        ]
      }
    }
  },
  {
    id: 'kurk',
    name: 'Kurk',
    plantingMethod: 'Külv või istutamine',
    description: 'Kurgid kasvavad kiiresti ja vajavad palju vett.',
    periods: {
      'avamaa': {
        start: { month: 5, day: 20 },
        end: { month: 6, day: 15 },
        activities: [
          { type: 'Külv kasvuhoones', month: 4, day: 1, description: 'Alusta seemnete külvamist kasvuhoones' },
          { type: 'Istutamine välja', month: 5, day: 20, description: 'Istuta taimed välja' },
          { type: 'Hooldus', month: 6, day: 1, description: 'Kontrolli veevarustust ja väetist' },
          { type: 'Koristus', month: 7, day: 15, description: 'Alusta kurgide koristamist' }
        ]
      },
      'kasvuhoone': {
        start: { month: 3, day: 1 },
        end: { month: 4, day: 15 },
        activities: [
          { type: 'Külv', month: 3, day: 1, description: 'Külva seemned kasvuhoones' },
          { type: 'Hooldus', month: 4, day: 1, description: 'Kontrolli veevarustust' },
          { type: 'Koristus', month: 5, day: 15, description: 'Alusta kurgide koristamist' }
        ]
      }
    }
  },
  {
    id: 'porgand',
    name: 'Porgand',
    plantingMethod: 'Külv',
    description: 'Porgandid on külmakindlad juurviljad, mida saab külvata varakult kevadel.',
    periods: {
      'avamaa': {
        start: { month: 4, day: 15 },
        end: { month: 6, day: 1 },
        activities: [
          { type: 'Külv', month: 4, day: 15, description: 'Külva porgandid välja' },
          { type: 'Hooldus', month: 5, day: 15, description: 'Haruta porgandeid' },
          { type: 'Hooldus', month: 6, day: 1, description: 'Jätka harutamist' },
          { type: 'Koristus', month: 8, day: 1, description: 'Alusta porgandite koristamist' }
        ]
      },
      'kasvuhoone': {
        start: { month: 2, day: 1 },
        end: { month: 3, day: 15 },
        activities: [
          { type: 'Külv', month: 2, day: 1, description: 'Külva porgandid kasvuhoones' },
          { type: 'Hooldus', month: 3, day: 1, description: 'Haruta porgandeid' },
          { type: 'Koristus', month: 5, day: 1, description: 'Alusta porgandite koristamist' }
        ]
      }
    }
  },
  {
    id: 'sibul',
    name: 'Sibul',
    plantingMethod: 'Istutamine',
    description: 'Sibulad on külmakindlad ja saavad istutada varakult kevadel.',
    periods: {
      'avamaa': {
        start: { month: 4, day: 1 },
        end: { month: 5, day: 1 },
        activities: [
          { type: 'Istutamine', month: 4, day: 1, description: 'Istuta sibulad välja' },
          { type: 'Hooldus', month: 5, day: 15, description: 'Kontrolli kasvu' },
          { type: 'Koristus', month: 8, day: 15, description: 'Korista sibulad, kui lehed kollaseks lähevad' }
        ]
      },
      'kasvuhoone': {
        start: { month: 3, day: 1 },
        end: { month: 3, day: 31 },
        activities: [
          { type: 'Istutamine', month: 3, day: 1, description: 'Istuta sibulad kasvuhoones' },
          { type: 'Koristus', month: 6, day: 15, description: 'Korista sibulad' }
        ]
      }
    }
  },
  {
    id: 'kartul',
    name: 'Kartul',
    plantingMethod: 'Istutamine',
    description: 'Kartulid on Eesti põhivili, mida istutatakse kevadel.',
    periods: {
      'avamaa': {
        start: { month: 4, day: 20 },
        end: { month: 5, day: 15 },
        activities: [
          { type: 'Ettevalmistus', month: 3, day: 15, description: 'Valmista kartulid ette (idutamine)' },
          { type: 'Istutamine', month: 4, day: 20, description: 'Istuta kartulid välja' },
          { type: 'Hooldus', month: 6, day: 1, description: 'Künni kartulid esimest korda' },
          { type: 'Hooldus', month: 6, day: 20, description: 'Künni kartulid teist korda' },
          { type: 'Koristus', month: 8, day: 15, description: 'Alusta kartulite koristamist' }
        ]
      }
    }
  },
  {
    id: 'salat',
    name: 'Salat',
    plantingMethod: 'Külv',
    description: 'Salatid on kiiresti kasvavad lehtköögiviljad.',
    periods: {
      'avamaa': {
        start: { month: 4, day: 15 },
        end: { month: 7, day: 1 },
        activities: [
          { type: 'Külv', month: 4, day: 15, description: 'Külva esimene salat' },
          { type: 'Külv', month: 5, day: 15, description: 'Külva teine salat' },
          { type: 'Külv', month: 6, day: 15, description: 'Külva kolmas salat' },
          { type: 'Koristus', month: 5, day: 30, description: 'Alusta salatite koristamist' }
        ]
      },
      'kasvuhoone': {
        start: { month: 2, day: 1 },
        end: { month: 4, day: 1 },
        activities: [
          { type: 'Külv', month: 2, day: 1, description: 'Külva salat kasvuhoones' },
          { type: 'Koristus', month: 3, day: 20, description: 'Alusta salatite koristamist' }
        ]
      }
    }
  } */
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
  return crops;
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
