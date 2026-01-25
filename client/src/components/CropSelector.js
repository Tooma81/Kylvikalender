import React, { useState } from 'react';
import './CropSelector.css';

function CropSelector({ crops, selectedLocation, userCrops, onAddCrop }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const hasLocation = crop.periods && crop.periods[selectedLocation];
    return matchesSearch && hasLocation;
  });

  const isCropSelected = (cropId) => {
    return userCrops.some(
      uc => uc.cropId === cropId && uc.location === selectedLocation
    );
  };

  return (
    <div className="crop-selector">
      <h2>Vali kultuurid</h2>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Otsi kultuuri..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="crops-list">
        {filteredCrops.length === 0 ? (
          <p className="no-results">Kultuure ei leitud</p>
        ) : (
          filteredCrops.map(crop => {
            const period = crop.periods[selectedLocation];
            const isSelected = isCropSelected(crop.id);
            
            return (
              <div key={crop.id} className={`crop-card ${isSelected ? 'selected' : ''}`}>
                <div className="crop-header">
                  <h3>{crop.name}</h3>
                  {isSelected && <span className="selected-badge">✓ Valitud</span>}
                </div>
                
                <div className="crop-info">
                  <p className="crop-description">{crop.description}</p>
                  <p className="crop-method">
                    <strong>Külvimeetod:</strong> {crop.plantingMethod}
                  </p>
                  {period && (
                    <p className="crop-period">
                      <strong>Soovituslik ajavahemik:</strong>{' '}
                      {period.start.day}.{period.start.month} - {period.end.day}.{period.end.month}
                    </p>
                  )}
                </div>

                <button
                  className={`add-button ${isSelected ? 'disabled' : ''}`}
                  onClick={() => !isSelected && onAddCrop(crop.id)}
                  disabled={isSelected}
                >
                  {isSelected ? 'Juba valitud' : 'Lisa valikutesse'}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CropSelector;
