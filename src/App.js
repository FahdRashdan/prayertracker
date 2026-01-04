import React, { useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page12 from './components/Page12';
import './App.css';

const PageWrapper = forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref} style={{ width: '100%', height: '100%' }}>
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
            maxHeight={1100}
            showCover={true}
            // Essential: Allows you to click inputs without the page flipping
            disableFlipByClick={true} 
            // Enables mouse and touch dragging for swiping
            useMouseEvents={true}
            // Better mobile gesture support
            mobileScrollSupport={true}
            // How far a user must swipe to trigger a page turn
            swipeDistance={30}
            // Shows a visual page curl at the corner to help users find the swipe area
            showPageCorners={true} 
            className="professional-book-shadow"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
              <PageWrapper key={num}>
                <img src={`/pages/page${num}.jpg`} style={{width:'100%', height:'100%'}} alt={`Page ${num}`} />
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