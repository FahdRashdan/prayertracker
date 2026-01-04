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

  // Navigation functions
  const goNext = () => {
    bookRef.current.pageFlip().flipNext();
  };

  const goPrev = () => {
    bookRef.current.pageFlip().flipPrev();
  };

  return (
    <div className="app-viewport">
      <div className="studio-background">
        
        {/* Left Navigation Arrow */}
        <button className="nav-btn left" onClick={goPrev}>
          ‹
        </button>

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
            disableFlipByClick={true} 
            clickEventForward={false}
            useMouseEvents={true}
            showPageCorners={true} // Visual hint for users
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

        {/* Right Navigation Arrow */}
        <button className="nav-btn right" onClick={goNext}>
          ›
        </button>

      </div>
    </div>
  );
}

export default App;