// Andmete valideerimise funktsioonid

function validateUserSelection(cropId, location) {
  if (!cropId || typeof cropId !== 'string' || cropId.trim() === '') {
    return 'Kultuuri ID on kohustuslik';
  }
  
  if (!location || typeof location !== 'string') {
    return 'Kasvukoht on kohustuslik';
  }
  
  const validLocations = ['avamaa', 'kasvuhoone'];
  if (!validLocations.includes(location)) {
    return 'Kehtetu kasvukoht. Vali "avamaa" või "kasvuhoone"';
  }
  
  return null; // No error
}

function validateDateRange(days) {
  if (days === undefined || days === null) {
    return null; // Optional parameter
  }
  
  const daysNum = parseInt(days);
  if (isNaN(daysNum)) {
    return 'Päevade arv peab olema number';
  }
  
  if (daysNum < 1) {
    return 'Päevade arv peab olema vähemalt 1';
  }
  
  if (daysNum > 365) {
    return 'Päevade arv ei tohi ületada 365';
  }
  
  return null; // No error
}

function validateCropId(cropId) {
  if (!cropId || typeof cropId !== 'string' || cropId.trim() === '') {
    return 'Kultuuri ID on kohustuslik';
  }
  return null;
}

module.exports = {
  validateUserSelection,
  validateDateRange,
  validateCropId
};
