import React, { useState, useEffect } from 'react';

const Page12 = () => {
  // LOAD PRIVATE DATA FROM LOCAL STORAGE
  const [todo, setTodo] = useState(() => localStorage.getItem('todo') || "");
  const [reflection, setReflection] = useState(() => localStorage.getItem('reflection') || "");
  const [date, setDate] = useState(() => localStorage.getItem('date') || "");
  const [prayers, setPrayers] = useState(() => {
    const saved = localStorage.getItem('prayers');
    return saved ? JSON.parse(saved) : { fajr: false, duhr: false, asr: false, maghrib: false, isha: false };
  });

  // RESPONSIVE SIZE: Adjust circle size for mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // AUTO-SAVE CHANGES
  useEffect(() => {
    localStorage.setItem('todo', todo);
    localStorage.setItem('reflection', reflection);
    localStorage.setItem('date', date);
    localStorage.setItem('prayers', JSON.stringify(prayers));
  }, [todo, reflection, date, prayers]);

  const stop = (e) => {
    e.stopPropagation();
    if (e.currentTarget.tagName === 'TEXTAREA' || e.currentTarget.tagName === 'INPUT') {
      e.currentTarget.focus();
    }
  };

  const resetTracker = (e) => {
    stop(e);
    setTodo(""); 
    setReflection(""); 
    setDate("");
    setPrayers({ fajr: false, duhr: false, asr: false, maghrib: false, isha: false });
    localStorage.clear();
  };

  // Salah Tracker: Baby Blue color and responsive sizing
  const circleStyle = (top, left, active) => ({
    position: 'absolute', top, left, 
    // Smaller size for mobile (22px) vs Desktop (28px)
    width: isMobile ? '22px' : '28px', 
    height: isMobile ? '22px' : '28px', 
    borderRadius: '50%',
    // Baby Blue color applied here
    backgroundColor: active ? '#89CFF0' : 'transparent', 
    cursor: 'pointer', zIndex: 5000, pointerEvents: 'auto',
    transform: 'translate(-50%, -50%)', 
    transition: 'background-color 0.2s ease',
    border: active ? '1px solid white' : 'none'
  });

  const textStyle = {
    background: 'transparent', border: 'none', resize: 'none', outline: 'none',
    fontWeight: '900', fontSize: '12px', color: '#1a2a3a', zIndex: 6000,
    pointerEvents: 'auto', padding: '0 5px', fontFamily: 'inherit'
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }} onClick={stop}>
      <img src="/pages/page12.jpg" style={{ width: '100%', height: '100%', pointerEvents: 'none', display: 'block' }} alt="Tracker" />

      {/* DATE AREA */}
      <input 
        type="text" value={date} onChange={(e) => setDate(e.target.value)} onMouseDown={stop} onClick={stop} placeholder="00/00"
        style={{ ...textStyle, fontSize: '11px', position: 'absolute', top: '10.2%', right: '15.5%', width: '13%', textAlign: 'center' }} 
      />

      {/* TO DO LIST */}
      <textarea 
        value={todo} onChange={(e) => setTodo(e.target.value)} onMouseDown={stop} onClick={stop}
        style={{ ...textStyle, position: 'absolute', top: '23.5%', left: '21.5%', width: '57%', height: '13.5%', lineHeight: '2.18' }}
      />

      {/* SALAH TRACKER: Precise positioning Left & Down */}
      <div onClick={(e) => { stop(e); setPrayers({...prayers, fajr: !prayers.fajr}) }} style={circleStyle('48.4%', '38.1%', prayers.fajr)} />
      <div onClick={(e) => { stop(e); setPrayers({...prayers, duhr: !prayers.duhr}) }} style={circleStyle('52.9%', '38.1%', prayers.duhr)} />
      <div onClick={(e) => { stop(e); setPrayers({...prayers, asr: !prayers.asr}) }} style={circleStyle('57.6%', '38.1%', prayers.asr)} />
      <div onClick={(e) => { stop(e); setPrayers({...prayers, maghrib: !prayers.maghrib}) }} style={circleStyle('48.4%', '59.0%', prayers.maghrib)} />
      <div onClick={(e) => { stop(e); setPrayers({...prayers, isha: !prayers.isha}) }} style={circleStyle('52.9%', '59.0%', prayers.isha)} />

      {/* REFLECTIONS */}
      <textarea 
        value={reflection} onChange={(e) => setReflection(e.target.value)} onMouseDown={stop} onClick={stop}
        style={{ ...textStyle, position: 'absolute', top: '75.6%', left: '13.5%', width: '74%', height: '11.8%', lineHeight: '1.92' }}
      />

      {/* RESET BUTTON */}
      <button 
        onClick={resetTracker} 
        style={{ position: 'absolute', bottom: '1.5%', right: '2%', width: '12%', height: '8%', cursor: 'pointer', background: 'transparent', border: 'none', zIndex: 7000 }} 
      />
    </div>
  );
};

export default Page12;