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
            disableFlipByClick={true} // Essential so users can write
            clickEventForward={false}
            useMouseEvents={true}
            className="professional-book-shadow"
          >
            {/* Pages 1 to 11: Static Content */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
              <PageWrapper key={num}>
                <img src={`/pages/page${num}.jpg`} style={{width:'100%', height:'100%'}} alt={`Page ${num}`} />
              </PageWrapper>
            ))}

            {/* Page 12: The Interactive Tracker with Minimized Text */}
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