import React from 'react';

const Page2 = ({ flipToPage }) => {
  const handleNav = (e, index) => {
    e.stopPropagation(); // Stops the page from flipping 
    flipToPage(index);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src="/pages/page2.jpg" alt="ToC" style={{ width: '100%', height: '100%' }} />
      
      {/* 03 Wudu Step-by-Step -> Index 4 [cite: 7] */}
      <div onClick={(e) => handleNav(e, 4)} style={navBtnStyle('16.5%')} />
      
      {/* 05 Hero's Guide -> Index 6 [cite: 9] */}
      <div onClick={(e) => handleNav(e, 6)} style={navBtnStyle('21.2%')} />
      
      {/* 08 Prayer Tracker -> Index 11 [cite: 12] */}
      <div onClick={(e) => handleNav(e, 11)} style={navBtnStyle('28.5%')} />
    </div>
  );
};

const navBtnStyle = (top) => ({
  position: 'absolute', top, left: '15%', width: '70%', height: '4%', cursor: 'pointer', zIndex: 100
});

export default Page2;