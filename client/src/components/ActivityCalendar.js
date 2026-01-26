import React, { useState, useEffect } from 'react';
import './ActivityCalendar.css';
import { getCrops, getMonths, getUserCrops, addUserCrop, removeUserCrop, getUserActivities } from '../services/api';

function ActivityCalendar() {
  const [crops, setCrops] = useState([]);
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cropsData, monthsData] = await Promise.all([
      getCrops(),
      getMonths()
    ]);
      setCrops(cropsData);
      setMonths(monthsData);
      setError(null);
    } catch (err) {
      setError('Andmete laadimisel tekkis viga: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(crops)
  console.log(months)

  return (
    <div className="activity-calendar">
      <h1 className="calendar-title">Külvikalender</h1>
      <div className='calendar-search'></div>
      <div className='month-filter'>
      </div>
      <div className='calendar'>
        {crops.map((crop) => (
          <div className='calendar-row' key={crop.id}>
          <div className='plant-name'>{crop.name}</div>
            <div className='month-container'>
              {crop.periods
                .filter((period) => period.start >= 1)
                .map((period) =>
                  <div
                    key={period.id}
                    className={`period-marker ${period.id}`}
                    style={{
                      '--start': period.start,
                      '--end': period.end
                    }}
                  >
                    {period.symbol}
                  </div>
              )}
              {months.map((month) => (
                <div 
                  key={month.id} 
                  className={`month-box ${month.season}`}
                  title={month.name} // Näitab kuu nime peale liikudes
                >
                  {/* Soovi korral võid siia sisse panna ka teksti: {month.id} */}
                </div>
              ))}
            </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityCalendar;
