import React from 'react';
import './FilterableCalendar.css';

const CalendarRow = ({ crop, months }) => {
  const [rowExpanded, setRowExpanded] = React.useState(false);

  return (
    <div className='calendar-row' key={crop.id}>
      <div 
        className={`row-toggle prevent-select ${rowExpanded ? 'open' : ''}`}
        onClick={() => setRowExpanded(!rowExpanded)}
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
      {rowExpanded && <div className="expanded-details">Details for {crop.name}</div>}
    </div>
  );
};

export default CalendarRow;