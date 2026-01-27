import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FilterableCalendar.css';
import { getCrops, getMonths } from '../services/api';
import { ICON_BASE, LEGEND_ITEMS, MONTH_SHORT, getIconForPeriod } from '../utils/calendarLegend';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function FilterableCalendar() {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCrops, setVisibleCrops] = useState(new Set());
  const [visibleMonths, setVisibleMonths] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (crops.length > 0 && visibleCrops.size === 0) {
      const allCropIds = new Set(crops.map(crop => crop.id));
      setVisibleCrops(allCropIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crops.length]);

  useEffect(() => {
    if (months.length > 0 && visibleMonths.size === 0) {
      const allMonthIds = new Set(months.map(month => month.id));
      setVisibleMonths(allMonthIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [months.length]);

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

  // Kultuuri nähtavuse muutmine
  const toggleCropVisibility = (cropId) => {
    setVisibleCrops(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cropId)) {
        newSet.delete(cropId);
      } else {
        newSet.add(cropId);
      }
      return newSet;
    });
  };

  // Kõigi kultuuride nähtavaks muutmine
  const showAllCrops = () => {
    const allCropIds = new Set(crops.map(crop => crop.id));
    setVisibleCrops(allCropIds);
  };

  // Kõigi kultuuride peitmine
  const hideAllCrops = () => {
    setVisibleCrops(new Set());
  };

  // Kuu nähtavuse muutmine
  const toggleMonthVisibility = (monthId) => {
    setVisibleMonths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(monthId)) {
        newSet.delete(monthId);
      } else {
        newSet.add(monthId);
      }
      return newSet;
    });
  };

  // Kõigi kuude nähtavaks muutmine
  const showAllMonths = () => {
    const allMonthIds = new Set(months.map(month => month.id));
    setVisibleMonths(allMonthIds);
  };

  // Kõigi kuude peitmine
  const hideAllMonths = () => {
    setVisibleMonths(new Set());
  };

  // PDF allalaadimine – kõik ühele A4-landscape lehele
  const downloadPDF = async () => {
    const calendarElement = document.querySelector('.calendar-container');
    const pageElement = document.querySelector('.filterable-calendar-page');

    if (!calendarElement || !pageElement) {
      alert('Kalendrit ei leitud!');
      return;
    }

    try {
      const sidebarElement = document.querySelector('.calendar-sidebar');
      const headerElement = document.querySelector('.calendar-header');
      const sidebarOriginalDisplay = sidebarElement?.style.display;
      const headerOriginalDisplay = headerElement?.style.display;

      if (sidebarElement) sidebarElement.style.display = 'none';
      if (headerElement) headerElement.style.display = 'none';

      // Kompaktne PDF-stiil ühele lehele
      pageElement.classList.add('pdf-export');
      await new Promise(resolve => setTimeout(resolve, 150));

      const canvas = await html2canvas(calendarElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      pageElement.classList.remove('pdf-export');
      if (sidebarElement) sidebarElement.style.display = sidebarOriginalDisplay || '';
      if (headerElement) headerElement.style.display = headerOriginalDisplay || '';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pageW = 297;
      const pageH = 210;
      const aspect = canvas.width / canvas.height;
      let w = pageW;
      let h = pageW / aspect;
      if (h > pageH) {
        h = pageH;
        w = pageH * aspect;
      }
      const x = (pageW - w) / 2;
      const y = (pageH - h) / 2;
      pdf.addImage(imgData, 'PNG', x, y, w, h);
      pdf.save('kylvikalender.pdf');
    } catch (err) {
      console.error('PDF genereerimise viga:', err);
      alert('PDF genereerimisel tekkis viga: ' + err.message);
      pageElement?.classList.remove('pdf-export');
      const sidebarElement = document.querySelector('.calendar-sidebar');
      const headerElement = document.querySelector('.calendar-header');
      if (sidebarElement) sidebarElement.style.display = '';
      if (headerElement) headerElement.style.display = '';
    }
  };

  // Otsingu ja filtreerimisega kultuurid
  const filteredCrops = crops.filter(crop => {
    const matchesSearch = searchQuery === '' || 
      crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    const isVisible = visibleCrops.has(crop.id);
    return matchesSearch && isVisible;
  });

  // Filtreeritud kuud (nähtavad kuud), sorteeritud ID järgi
  const filteredMonths = months
    .filter(month => visibleMonths.has(month.id))
    .sort((a, b) => a.id - b.id);

  // Otsingu jaoks nähtavad kultuurid (filtreerimiseks)
  const searchableCrops = crops.filter(crop => 
    searchQuery === '' || crop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading">
        Laadimine...
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="filterable-calendar-page">
      <div className="calendar-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Tagasi avalehele
        </button>
        <h1>Külvikalender</h1>
        <button onClick={downloadPDF} className="download-button">
          Laadi alla PDF
        </button>
      </div>

      <div className="calendar-layout">
        <aside className="calendar-sidebar">
          <div className="sidebar-section">
            <h3>Otsi kultuure</h3>
            <input
              type="text"
              className="search-input"
              placeholder="Sisesta kultuuri nimi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="sidebar-section">
            <div className="filter-buttons">
              <button onClick={showAllCrops} className="control-button">
                Näita kõiki
              </button>
              <button onClick={hideAllCrops} className="control-button">
                Peida kõik
              </button>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Filtreeri kultuure</h3>
            <div className="filter-checkboxes">
              {searchableCrops.map((crop) => (
                <label key={crop.id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={visibleCrops.has(crop.id)}
                    onChange={() => toggleCropVisibility(crop.id)}
                  />
                  <span>{crop.name}</span>
                </label>
              ))}
              {searchableCrops.length === 0 && searchQuery && (
                <p className="no-results">Otsingule ei leitud tulemusi</p>
              )}
            </div>
          </div>

          <div className="sidebar-section">
            <div className="filter-buttons">
              <button onClick={showAllMonths} className="control-button">
                Näita kõiki kuusid
              </button>
              <button onClick={hideAllMonths} className="control-button">
                Peida kõik kuud
              </button>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Filtreeri kuusid</h3>
            <div className="filter-checkboxes">
              {months.map((month) => (
                <label key={month.id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={visibleMonths.has(month.id)}
                    onChange={() => toggleMonthVisibility(month.id)}
                  />
                  <span>{month.name}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="calendar-main">
          <div className="calendar-container">
            {/* Legend ikoonidega - alati nähtav */}
            <div className='calendar-legend'>
              {LEGEND_ITEMS.map((item) => (
                <div key={item.id} className='legend-item'>
                  <img src={ICON_BASE + item.icon} alt={item.label} className='legend-icon' />
                  <span className='legend-label'>{item.label}</span>
                </div>
              ))}
            </div>
            {filteredCrops.length === 0 ? (
              <div className="no-crops-message">
                <p>Valitud kultuure ei ole nähtaval.</p>
                <p>Palun vali vähemalt üks kultuur filtreerimisribalt.</p>
              </div>
            ) : (
              <>
                <div className='calendar'>
                {/* Kuude päised – kõik 12 kuud, klikk näitab/peidab kuu */}
                <div className='calendar-header-row calendar-grid-header'>
                  <div className='crop-column-header'>Köögivili</div>
                  <div className='month-header-container'>
                    {months.map((month) => {
                      const isHidden = !visibleMonths.has(month.id);
                      return (
                        <button
                          key={month.id}
                          type="button"
                          className={`month-header${isHidden ? ' hidden' : ''}`}
                          title={isHidden ? `Näita ${month.name}` : `Peida ${month.name}`}
                          onClick={() => toggleMonthVisibility(month.id)}
                        >
                          {MONTH_SHORT[month.id] ?? month.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* Kultuuride read – 12 veergu, iga kuu lahtris ikoonid ühel real */}
                {filteredCrops.map((crop) => (
                  <div className='calendar-row' key={crop.id}>
                    <div className='plant-name'>{crop.name}</div>
                    <div className='month-container'>
                      {months.map((month) => {
                        const isVisible = visibleMonths.has(month.id);
                        const markersForMonth = isVisible
                          ? crop.periods
                              .filter((period) => period.start >= 1 && month.id >= period.start && month.id <= period.end)
                              .map((period) => {
                                const label = LEGEND_ITEMS.find((l) => l.id === period.id)?.label ?? '';
                                const iconSrc = getIconForPeriod(period.id);
                                return (
                                  <div
                                    key={`${crop.id}-${period.id}-${month.id}`}
                                    className={`period-marker ${period.id}`}
                                    title={label}
                                  >
                                    {iconSrc ? (
                                      <img src={iconSrc} alt={label} className="period-marker-icon" />
                                    ) : (
                                      period.symbol
                                    )}
                                  </div>
                                );
                              })
                          : [];
                        return (
                          <div
                            key={month.id}
                            className={`month-cell${!isVisible ? ' hidden' : ''}`}
                            title={month.name}
                          >
                            <div className='month-box' />
                            <div className='month-markers'>{markersForMonth}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default FilterableCalendar;
