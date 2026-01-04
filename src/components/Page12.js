// import React, { useState, useEffect } from 'react';

// const Page12 = () => {
//   // LOAD PRIVATE DATA FROM LOCAL STORAGE
//   const [todo, setTodo] = useState(() => localStorage.getItem('todo') || "");
//   const [reflection, setReflection] = useState(() => localStorage.getItem('reflection') || "");
//   const [date, setDate] = useState(() => localStorage.getItem('date') || "");
//   const [prayers, setPrayers] = useState(() => {
//     const saved = localStorage.getItem('prayers');
//     return saved ? JSON.parse(saved) : { fajr: false, duhr: false, asr: false, maghrib: false, isha: false };
//   });

//   // RESPONSIVE CHECKS: Circle scaling and Button positioning
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // AUTO-SAVE CHANGES
//   useEffect(() => {
//     localStorage.setItem('todo', todo);
//     localStorage.setItem('reflection', reflection);
//     localStorage.setItem('date', date);
//     localStorage.setItem('prayers', JSON.stringify(prayers));
//   }, [todo, reflection, date, prayers]);

//   const stop = (e) => {
//     e.stopPropagation();
//     if (e.currentTarget.tagName === 'TEXTAREA' || e.currentTarget.tagName === 'INPUT') {
//       e.currentTarget.focus();
//     }
//   };

//   const resetTracker = (e) => {
//     stop(e);
//     setTodo(""); 
//     setReflection(""); 
//     setDate("");
//     setPrayers({ fajr: false, duhr: false, asr: false, maghrib: false, isha: false });
//     localStorage.clear();
//   };

//   // Salah Tracker: Baby Blue and responsive sizing
//   const circleStyle = (top, left, active) => ({
//     position: 'absolute', top, left, 
//     width: isMobile ? '22px' : '28px', 
//     height: isMobile ? '22px' : '28px', 
//     borderRadius: '50%',
//     backgroundColor: active ? '#89CFF0' : 'transparent', 
//     cursor: 'pointer', zIndex: 5000, pointerEvents: 'auto',
//     transform: 'translate(-50%, -50%)', 
//     transition: 'background-color 0.2s ease',
//     border: active ? '1px solid white' : 'none'
//   });

//   const textStyle = {
//     background: 'transparent', border: 'none', resize: 'none', outline: 'none',
//     fontWeight: '900', fontSize: '12px', color: '#1a2a3a', zIndex: 6000,
//     pointerEvents: 'auto', padding: '0 5px', fontFamily: 'inherit'
//   };

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }} onClick={stop}>
//       <img src="/pages/page12.jpg" style={{ width: '100%', height: '100%', pointerEvents: 'none', display: 'block' }} alt="Tracker" />

//       {/* DATE AREA */}
//       <input 
//         type="text" value={date} onChange={(e) => setDate(e.target.value)} onMouseDown={stop} onClick={stop} placeholder="00/00"
//         style={{ ...textStyle, fontSize: '11px', position: 'absolute', top: '10.2%', right: '15.5%', width: '13%', textAlign: 'center' }} 
//       />

//       {/* TO DO LIST */}
//       <textarea 
//         value={todo} onChange={(e) => setTodo(e.target.value)} onMouseDown={stop} onClick={stop}
//         style={{ ...textStyle, position: 'absolute', top: '23.5%', left: '21.5%', width: '57%', height: '13.5%', lineHeight: '2.18' }}
//       />

//       {/* SALAH TRACKER: Precision alignment */}
//       <div onClick={(e) => { stop(e); setPrayers({...prayers, fajr: !prayers.fajr}) }} style={circleStyle('48.4%', '38.1%', prayers.fajr)} />
//       <div onClick={(e) => { stop(e); setPrayers({...prayers, duhr: !prayers.duhr}) }} style={circleStyle('52.9%', '38.1%', prayers.duhr)} />
//       <div onClick={(e) => { stop(e); setPrayers({...prayers, asr: !prayers.asr}) }} style={circleStyle('57.6%', '38.1%', prayers.asr)} />
//       <div onClick={(e) => { stop(e); setPrayers({...prayers, maghrib: !prayers.maghrib}) }} style={circleStyle('48.4%', '59.0%', prayers.maghrib)} />
//       <div onClick={(e) => { stop(e); setPrayers({...prayers, isha: !prayers.isha}) }} style={circleStyle('52.9%', '59.0%', prayers.isha)} />

//       {/* REFLECTIONS */}
//       <textarea 
//         value={reflection} onChange={(e) => setReflection(e.target.value)} onMouseDown={stop} onClick={stop}
//         style={{ ...textStyle, position: 'absolute', top: '75.6%', left: '13.5%', width: '74%', height: '11.8%', lineHeight: '1.92' }}
//       />

//       {/* RESET BUTTON: Shifted further left on Mobile */}
//       <button 
//         onClick={resetTracker} 
//         style={{ 
//             position: 'absolute', 
//             bottom: '1.5%', 
//             // Now shifted to 8% on Mobile to move it a bit more to the left
//             right: isMobile ? '8%' : '2%', 
//             width: '12%', 
//             height: '8%', 
//             cursor: 'pointer', 
//             background: 'transparent', 
//             border: 'none', 
//             zIndex: 7000 
//         }} 
//       />
//     </div>
//   );
// };

// export default Page12;

import React, { useState, useEffect } from 'react';

const Page12 = () => {
  // --- CHILD-FRIENDLY STATE ---
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || ["", "", "", ""]);
  const [reflection, setReflection] = useState(() => localStorage.getItem('reflection') || "");
  const [date, setDate] = useState(() => localStorage.getItem('date') || "");
  const [prayers, setPrayers] = useState(() => {
    const saved = localStorage.getItem('prayers');
    return saved ? JSON.parse(saved) : { fajr: false, duhr: false, asr: false, maghrib: false, isha: false };
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('reflection', reflection);
    localStorage.setItem('date', date);
    localStorage.setItem('prayers', JSON.stringify(prayers));
  }, [todos, reflection, date, prayers]);

  // THE ULTIMATE FIX: This prevents the book from "eating" the child's clicks
  const handleInteraction = (e) => {
    e.stopPropagation();
    if (e.currentTarget.tagName === 'INPUT' || e.currentTarget.tagName === 'TEXTAREA') {
        e.currentTarget.focus();
    }
  };

  const resetTracker = (e) => {
    e.stopPropagation();
    setTodos(["", "", "", ""]);
    setReflection("");
    setDate("");
    setPrayers({ fajr: false, duhr: false, asr: false, maghrib: false, isha: false });
    localStorage.clear();
  };

  return (
    <div className="adventure-page" onMouseDown={(e) => e.stopPropagation()}>
      <div className="islamic-stars"></div>
      
      {/* LEFT SIDE: Hero Missions */}
      <div className="adventure-col">
        <header className="hero-header">
          <div className="title-area">
            <span className="bismillah-text">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
            <h1 className="hero-title">MY GOOD DEEDS</h1>
            <h1 className="hero-subtitle">ADVENTURE</h1>
          </div>
          <div className="date-cloud">
            <span className="cloud-label">DATE:</span>
            <input 
              type="text" className="child-input date-bubble" 
              value={date} onChange={(e) => setDate(e.target.value)}
              onMouseDown={handleInteraction} onClick={handleInteraction}
              placeholder="00/00"
            />
          </div>
        </header>

        <section className="mission-section">
          <div className="mission-label-row">
            <span className="icon-glow">⭐</span>
            <h2 className="mission-label">TODAY'S MISSIONS</h2>
          </div>
          <div className="mission-list">
            {todos.map((item, index) => (
              <div key={index} className="mission-item">
                <div className="mission-bullet">🌙</div>
                <input 
                  type="text" className="child-input mission-text" 
                  value={item} onChange={(e) => {
                    const newTodos = [...todos];
                    newTodos[index] = e.target.value;
                    setTodos(newTodos);
                  }}
                  onMouseDown={handleInteraction} onClick={handleInteraction}
                  placeholder="I will help someone..."
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* RIGHT SIDE: Prayer Journey */}
      <div className="adventure-col">
        <section className="prayer-journey-box">
          <div className="mission-label-row centered">
            <span className="icon-glow">🕌</span>
            <h2 className="mission-label">MY PRAYER JOURNEY</h2>
          </div>
          <div className="prayer-path">
            {['fajr', 'duhr', 'asr', 'maghrib', 'isha'].map((p) => (
              <div 
                key={p} 
                className={`prayer-step ${prayers[p] ? 'step-complete' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPrayers(prev => ({...prev, [p]: !prev[p]})) }}
              >
                <div className="step-circle">
                  {prayers[p] ? "🌟" : ""}
                </div>
                <span className="step-name">{p.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mission-section grow-box">
          <h2 className="mission-label">Let’s reflect on your day! Think about all the happy moments that have happened to you today</h2>
          <textarea 
            className="child-input heart-textarea" 
            value={reflection} onChange={(e) => setReflection(e.target.value)}
            onMouseDown={handleInteraction} onClick={handleInteraction}
            placeholder="I am happy today because..."
          />
        </section>

        <button className="adventure-reset" onClick={resetTracker}>
          NEW ADVENTURE START!
        </button>
      </div>
    </div>
  );
};

export default Page12;