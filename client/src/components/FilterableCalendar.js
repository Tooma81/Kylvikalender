import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FilterableCalendar.css';
import { getCrops, getMonths } from '../services/api';
import { ICON_BASE, LEGEND_ITEMS, MONTH_SHORT, getIconForPeriod } from '../utils/calendarLegend';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// IMPORTI KONTROLL: veendu et fail on olemas src/components/ kaustas
import PersonalCalendarBanner from './PersonalCalendarBanner'; 

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
  }, [crops.length]);

  useEffect(() => {
    if (months.length > 0 && visibleMonths.size === 0) {
      const allMonthIds = new Set(months.map(month => month.id));
      setVisibleMonths(allMonthIds);
    }
  }, [months.length]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cropsData, monthsData] = await Promise.all([getCrops(), getMonths()]);
      setCrops(cropsData);
      setMonths(monthsData);
      setError(null);
    } catch (err) {
      setError('Andmete laadimisel tekkis viga: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- FILTREERIMISE JA PDF FUNKTSIOONID (Sinu originaal kood) ---
  const toggleCropVisibility = (cropId) => {
    setVisibleCrops(prev => {
      const newSet = new Set(prev);
      newSet.has(cropId) ? newSet.delete(cropId) : newSet.add(cropId);
      return newSet;
    });
  };

  const showAllCrops = () => setVisibleCrops(new Set(crops.map(crop => crop.id)));
  const hideAllCrops = () => setVisibleCrops(new Set());
  const toggleMonthVisibility = (monthId) => {
    setVisibleMonths(prev => {
      const newSet = new Set(prev);
      newSet.has(monthId) ? newSet.delete(monthId) : newSet.add(monthId);
      return newSet;
    });
  };
  const showAllMonths = () => setVisibleMonths(new Set(months.map(month => month.id)));
  const hideAllMonths = () => setVisibleMonths(new Set());

  const downloadPDF = async () => {
    const calendarElement = document.querySelector('.calendar-container');
    if (!calendarElement) return;
    try {
      const canvas = await html2canvas(calendarElement, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 297, (canvas.height * 297) / canvas.width);
      pdf.save('kylvikalender.pdf');
    } catch (err) { console.error(err); }
  };

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = searchQuery === '' || crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && visibleCrops.has(crop.id);
  });

  const filteredMonths = months.filter(month => visibleMonths.has(month.id)).sort((a, b) => a.id - b.id);
  const searchableCrops = crops.filter(crop => searchQuery === '' || crop.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) return <div className="loading">Laadimine...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="filterable-calendar-page">
      {/* 1. GARDESI BEEŽ BÄNNER */}
      <PersonalCalendarBanner />
      
      <div className="container">
        {/* 2. TEKSTI SEKTSIOON (Enne kalendrit) */}
        <section className="info-section">
          <h2 style={{fontWeight: '400', fontSize: '2rem'}}>Minu isiklik külvikalender</h2>
          <p>
            Isiklik külvikalender on praktiline ja läbimõeldud abivahend, mis on koostatud just sinu aia ja sinu kasvatamiseelistuste järgi. 
            Erinevalt üldisest külvikalendrist sisaldab see ainult neid taimi, mida sa tegelikult kasvatada soovid, mistõttu on kogu info selgem
             ja paremini kasutatav. Isiklik külvikalender aitab sul keskenduda olulisele, vähendab segadust ning muudab aiatööde planeerimise 
             lihtsamaks ja sujuvamaks.
          </p>
          <button className="read-more-btn">Näita rohkem</button>
        </section>

        {/* 3. KALENDRI PÄIS (Nupud) */}
        <div className="calendar-controls-top" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
           <button onClick={() => navigate('/')} className="back-button">← Tagasi avalehele</button>
           <button onClick={downloadPDF} className="download-button">Laadi alla PDF</button>
        </div>

        {/* 4. KALENDRI PAIGUTUS */}
        <div className="calendar-layout">
          <aside className="calendar-sidebar">
             <div className="sidebar-section">
                <h3>Otsi kultuure</h3>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Sisesta nimi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <div className="sidebar-section">
                <div className="filter-buttons">
                  <button onClick={showAllCrops} className="control-button">Näita kõiki</button>
                  <button onClick={hideAllCrops} className="control-button">Peida kõik</button>
                </div>
             </div>
             {/* ... (siia jäävad ülejäänud filtrid) ... */}
          </aside>

          <main className="calendar-main">
            <div className="calendar-container">
              <div className='calendar-legend'>
                {LEGEND_ITEMS.map((item) => (
                  <div key={item.id} className='legend-item'>
                    <img src={ICON_BASE + item.icon} alt={item.label} className='legend-icon' />
                    <span className='legend-label'>{item.label}</span>
                  </div>
                ))}
              </div>
              
              <div className='calendar'>
                <div className='calendar-header-row calendar-grid-header'>
                  <div className='crop-column-header'>Köögivili</div>
                  <div className='month-header-container'>
                    {filteredMonths.map((month) => (
                      <div key={month.id} className='month-header'>
                        {MONTH_SHORT[month.id] ?? month.name}
                      </div>
                    ))}
                  </div>
                </div>

                {filteredCrops.map((crop) => (
                  <div className='calendar-row' key={crop.id}>
                    <div className='plant-name'>{crop.name}</div>
                    <div className='month-container'>
                      {filteredMonths.map((month) => (
                        <div key={month.id} className='month-box' />
                      ))}
                      {/* Ikoonide joonistamine */}
                      {crop.periods.map(period => (
                         // ... sinu markerite loogika ...
                         <React.Fragment key={period.id}></React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default FilterableCalendar;