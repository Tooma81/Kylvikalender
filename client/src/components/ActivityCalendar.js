import React, { useMemo } from 'react';
import './ActivityCalendar.css';

function ActivityCalendar({ activities, selectedLocation }) {
  const groupedActivities = useMemo(() => {
    const grouped = {};
    activities.forEach(activity => {
      const date = activity.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(activity);
    });
    return grouped;
  }, [activities]);

  const sortedDates = Object.keys(groupedActivities).sort();

  if (sortedDates.length === 0) {
    return (
      <div className="activity-calendar">
        <h2>Lähimad tegevused (14 päeva)</h2>
        <p className="empty-message">
          Lähima 14 päeva jooksul ei ole planeeritud ühtegi tegevust.
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', weekday: 'long' };
    return date.toLocaleDateString('et-EE', options);
  };

  const getDaysUntilText = (days) => {
    if (days === 0) return 'Täna';
    if (days === 1) return 'Homme';
    return `${days} päeva`;
  };

  return (
    <div className="activity-calendar">
      <h2>Lähimad tegevused (14 päeva)</h2>
      <div className="activities-list">
        {sortedDates.map(date => (
          <div key={date} className="activity-day">
            <div className="activity-date-header">
              <h3>{formatDate(date)}</h3>
              <span className="days-until">
                {getDaysUntilText(groupedActivities[date][0].daysUntil)}
              </span>
            </div>
            <div className="activities-for-day">
              {groupedActivities[date].map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-type-badge">{activity.type}</div>
                  <div className="activity-content">
                    <div className="activity-crop">{activity.cropName}</div>
                    <div className="activity-description">{activity.description}</div>
                  </div>
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
