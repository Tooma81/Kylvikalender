import React, { useState, useEffect } from 'react';
import './App.css';
import CropSelector from './components/CropSelector';
import ActivityCalendar from './components/ActivityCalendar';
import UserCropsList from './components/UserCropsList';
import { getCrops, getUserCrops, addUserCrop, removeUserCrop, getUserActivities } from './services/api';

function App() {
  const [crops, setCrops] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('avamaa');
  const [userCrops, setUserCrops] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      loadUserActivities();
    }
  }, [selectedLocation, userCrops]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cropsData, userCropsData] = await Promise.all([
        getCrops(),
        getUserCrops()
      ]);
      setCrops(cropsData);
      setUserCrops(userCropsData);
      setError(null);
    } catch (err) {
      setError('Andmete laadimisel tekkis viga: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadUserActivities = async () => {
    try {
      const activitiesData = await getUserActivities(selectedLocation, 14);
      setActivities(activitiesData);
    } catch (err) {
      console.error('Tegevuste laadimisel tekkis viga:', err);
    }
  };

  const handleAddCrop = async (cropId) => {
    try {
      await addUserCrop(cropId, selectedLocation);
      const updatedUserCrops = await getUserCrops();
      setUserCrops(updatedUserCrops);
    } catch (err) {
      setError('Kultuuri lisamisel tekkis viga: ' + err.message);
    }
  };

  const handleRemoveCrop = async (cropId) => {
    try {
      await removeUserCrop(cropId, selectedLocation);
      const updatedUserCrops = await getUserCrops();
      setUserCrops(updatedUserCrops);
    } catch (err) {
      setError('Kultuuri eemaldamisel tekkis viga: ' + err.message);
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Laadimine...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌱 Külvikalender</h1>
        <p className="subtitle">Mida ja millal peaksin oma aias tegema?</p>
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <main className="app-main">
        <div className="location-selector">
          <h2>Vali kasvukoht</h2>
          <div className="location-buttons">
            <button
              className={selectedLocation === 'avamaa' ? 'active' : ''}
              onClick={() => handleLocationChange('avamaa')}
            >
              Avamaa
            </button>
            <button
              className={selectedLocation === 'kasvuhoone' ? 'active' : ''}
              onClick={() => handleLocationChange('kasvuhoone')}
            >
              Kasvuhoone
            </button>
          </div>
        </div>

        <div className="content-grid">
          <div className="content-section">
            <CropSelector
              crops={crops}
              selectedLocation={selectedLocation}
              userCrops={userCrops}
              onAddCrop={handleAddCrop}
            />
          </div>

          <div className="content-section">
            <UserCropsList
              userCrops={userCrops}
              selectedLocation={selectedLocation}
              onRemoveCrop={handleRemoveCrop}
            />
          </div>
        </div>

        <div className="content-section full-width">
          <ActivityCalendar
            activities={activities}
            selectedLocation={selectedLocation}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
