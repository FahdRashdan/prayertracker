import React, { useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page12 from './components/Page12';
import './App.css';

// --- UNIVERSAL GESTURE FIX ---
const PageWrapper = forwardRef((props, ref) => {
  return (
    <div 
      className="page" 
      ref={ref} 
      style={{ 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'auto', 
        backgroundColor: '#004c68',
        /* Prevents browser from interfering with swipes */
        touchAction: 'none' 
      }}
    >
      {props.children}
    </div>
  );
});

function App() {
  const bookRef = useRef();

  return (
    <div className="app-viewport">
      <div className="studio-background">
        <div className="book-frame">
          <HTMLFlipBook 
            ref={bookRef} 
            width={550} 
            height={780} 
            size="stretch"
            minWidth={300} 
            maxWidth={800} 
            minHeight={400} 
            maxHeight={1500}
            showCover={true}
            disableFlipByClick={true} 
            useMouseEvents={true}      
            mobileScrollSupport={true}
            /* Lower distance = easier to flip on mobile */
            swipeDistance={10} 
            showPageCorners={false} 
            clickEventForward={false} 
            usePortrait={true}
            startPage={0}
            className="professional-book-shadow"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
              <PageWrapper key={num}>
                <img 
                  src={`/pages/page${num}.jpg`} 
                  style={{
                    width:'100%', 
                    height:'100%', 
                    /* Allows swipe gestures to reach the book library */
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }} 
                  alt={`Page ${num}`} 
                />
              </PageWrapper>
            ))}

            <PageWrapper>
              <Page12 />
            </PageWrapper>
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}

export default App;