import React, { useState, useEffect } from 'react';
import './FilterableCalendar.css';
import { getCrops, getMonths } from '../services/api';
import  CalendarRow  from './CalendarRow';
import { BaselineSearch } from '../assets/icons/svg';
import Select from 'react-select';

function ActivityCalendar() {
  const [crops, setCrops] = useState([]);
  const [months, setMonths] = useState([]);
  const [monthFilter, setMonthFilter] = useState(0);
  const [calendarSearchValue, setCalendarSearchValue] = useState('');
  const [calendarSearch, setCalendarSearch] = useState('');
  const [calendarSort, setCalendarSort] = useState('');
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
    }
  };

  const handleCalendarSearchChange = (event) => {
    const calendarSearchValue = event.target.value;
    setCalendarSearchValue(calendarSearchValue);
    console.log(calendarSearchValue)
  }
  const handleCalendarSortChange = (selected) => {
    if (!selected) {
      setCalendarSort(null);
    } else {
      setCalendarSort(selected);
      console.log("Selected for sorting:", selected);
    }
  };

  const sortOptions = [
    { value: 'ettekasvatus', label: 'Vajab ettekasvatamist' },
    { value: 'kasvuhoonesse', label: 'Kasvuhoones kasvatamiseks' },
    { value: 'otsekulv', label: 'Sobib avamaale' },
    { value: 'kylviaeg', label: 'Varaseim külviaeg' },
  ];

  return (
    <div className="activity-calendar">
      <h1 className="calendar-title">Külvikalender</h1>
      <div className='calendar'>
        <div className='calendar-header-frontpage'>
          <div className='header-title'>
            Koosta oma kalender
          </div>
          <div className='calendar-search'>
            <input 
              className='calendar-search-input'
              type='text'
              value={calendarSearchValue}
              onChange={handleCalendarSearchChange}
              placeholder='Otsi taimi'
            />
            <div 
              className='calendar-search-button' 
              onClick={() => setCalendarSearch(calendarSearchValue)}
            >
              <BaselineSearch />
              Otsi
            </div>
          </div>
          <div className="calendar-sort" style={{ width: '300px' }}>
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: '#64328A',
                }),
              }}
              className='calendar-sort-menu'
              options={sortOptions}
              onChange={handleCalendarSortChange}
              value={calendarSort}
              placeholder="Sorteeri..."
              isSearchable={false} 
              isClearable={true}
              classNamePrefix="react-select"
            />
          </div>
        </div>
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
          // Kuu filter
          .filter((crop) => {
            // Kui väärtus 0, siis filter puudub
            if (!monthFilter || monthFilter === 0) return true;
            return crop.periods.some((period) => 
              monthFilter >= period.start && monthFilter <= period.end
            );
          })
          // Otsingu filter
          .filter((crop) => {
            return crop.name.toLowerCase().includes(calendarSearch.toLowerCase());
          })
          // Sorteeri filter
          .filter((crop) => {
            if (!calendarSort) return true;
            return crop.periods.some((period) => 
              // Kontrollib, kas antud perioodil on alguse aeg
              period.id === calendarSort.value
            );
          })
          .map((crop) => (
            <CalendarRow key={crop.id} crop={crop} months={months} />
          ))}
      </div>
    </div>
  );
}

export default ActivityCalendar;
