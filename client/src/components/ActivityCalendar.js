import React, { useState, useEffect } from 'react';
import './ActivityCalendar.css';
import { getCrops, getMonths } from '../services/api';

function ActivityCalendar() {
  const [crops, setCrops] = useState([]);
  const [months, setMonths] = useState([]);
  const [monthFilter, setMonthFilter] = useState(0)
  const [rowExpanded, setRowExpanded] = useState(false)
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

  const handleFilterChange = async (id) => {
    try {
      monthFilter === id ? setMonthFilter(0) : setMonthFilter(id);
    } catch (err) {
      setError('Filtri muutmisel tekkis viga: ' + err.message);
    } finally {
      loadData();
    }
  };

  const toggleRowExpanded = async () => {
    try {
      rowExpanded ? setRowExpanded(false) : setRowExpanded(true);
    } catch (err) {
      setError('Andmete laadimisel tekkis viga: ' + err.message);
    } finally {
      loadData();
    }
  }

  return (
    <div className="activity-calendar">
      <h1 className="calendar-title">Külvikalender</h1>
      <div className='calendar-search'></div>
      <div className='calendar'>
        <div className='month-filter'>
          <h1 style={{fontSize: 28}}>Filtreeri kuu järgi</h1>
          {months.map((month) => (
            <div
              key={month.id}
              className={`month-filter-btn prevent-select ${month.season} ${monthFilter === month.id ? 'selected' : ''}`}
              onClick={() => handleFilterChange(month.id)}
            >
              {month.name}
            </div>
          ))}
        </div>
        {crops
        .filter((crop) => {
          // Kui väärtus 0, siis filter puudub
          if (!monthFilter || monthFilter === 0) return true;
          return crop.periods.some((period) => 
            monthFilter >= period.start && monthFilter <= period.end
          );
        })
        .map((crop) => (
          <div className='calendar-row' key={crop.id}>
            <div 
              className={`row-toggle prevent-select ${rowExpanded ? 'open' : ''}`}
              onClick={() => toggleRowExpanded()}
            >
              ⌵
            </div>
            <div className='plant-name'>{crop.name}</div>
              <div className='month-container'>
                {months.map((month) => (
                  <div 
                    key={month.id} 
                    className={`month-box ${month.season}`}
                    title={month.name} // Näitab kuu nime peale liikudes
                  >
                    {/* Soovi korral võid siia sisse panna ka teksti: {month.id} */}
                  </div>
                ))}
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
              </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityCalendar;
