import React from 'react';
import seeds from '../assets/seeds.png';

const CalendarRow = ({ crop, months }) => {
  const [rowExpanded, setRowExpanded] = React.useState(false);

  useEffect(() => {
  if (isMobile) {
    import('./mobile.css');
  } else {
    import('./FilterableCalendar.css');
  }
}, [isMobile]);

  return (
    <div className='calendar-row-container'>
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
              .filter((period) => period.start >= 1 && period.start <= period.end)
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
      {rowExpanded && <div className="expanded-details">
        <div className='crop-details-container'>
          <div className='crop-details'>
            <div className='crop-image-container'>
              <img className='crop-image' src={seeds} alt="Seeds" />
            </div>
            <div className='season-guide-container'>
            {crop.periods
              .filter((period) => period.start >= 1 && period.start <= period.end)
              .map((period) =>
              <div className='season-guide'>
                  <div className='period-marker-title'>
                  <div
                      key={period.id}
                      className={`season-marker ${period.id}`}
                      style={{
                      '--start': period.start,
                      '--end': period.end
                      }}
                  >
                      {period.symbol}
                  </div>
                  <div className='period-title'>
                    {period.name}
                  </div>
                  </div>
                <div className='period-month'>
                  {months
                    .filter((month) => period.start === month.id || period.end === month.id)
                    .map((month) => (
                      <React.Fragment key={month.id}>
                        {period.start === month.id && (
                          <span className='startMonth'>
                            {month.fullName}
                          </span>
                        )}
                        {period.end === month.id && period.start !== period.end && (
                          <span className='endMonth'>
                            /{month.fullName}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            )}
            </div>
          </div>
          <div className='crop-description'>
            {crop.description}
          </div>
        </div>
        <div className='recommended-products'></div>
      </div>}
    </div>
  );
};

export default CalendarRow;