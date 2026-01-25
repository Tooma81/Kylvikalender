import React from 'react';
import './UserCropsList.css';

function UserCropsList({ userCrops, selectedLocation, onRemoveCrop }) {
  const filteredCrops = userCrops.filter(
    uc => uc.location === selectedLocation && uc.crop
  );

  if (filteredCrops.length === 0) {
    return (
      <div className="user-crops-list">
        <h2>Minu valitud kultuurid</h2>
        <p className="empty-message">
          Sa pole veel ühtegi kultuuri valinud. Vali kultuurid vasakult.
        </p>
      </div>
    );
  }

  return (
    <div className="user-crops-list">
      <h2>Minu valitud kultuurid ({filteredCrops.length})</h2>
      <div className="crops-grid">
        {filteredCrops.map(userCrop => {
          const crop = userCrop.crop;
          const period = crop.periods && crop.periods[selectedLocation];
          
          return (
            <div key={`${userCrop.cropId}-${userCrop.location}`} className="user-crop-card">
              <div className="user-crop-header">
                <h3>{crop.name}</h3>
                <button
                  className="remove-button"
                  onClick={() => onRemoveCrop(crop.id)}
                  title="Eemalda"
                >
                  ×
                </button>
              </div>
              
              <div className="user-crop-info">
                <p className="crop-method">
                  <strong>Külvimeetod:</strong> {crop.plantingMethod}
                </p>
                {period && (
                  <p className="crop-period">
                    <strong>Külviaeg:</strong> {period.start.day}.{period.start.month} - {period.end.day}.{period.end.month}
                  </p>
                )}
                <p className="crop-description">{crop.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserCropsList;
