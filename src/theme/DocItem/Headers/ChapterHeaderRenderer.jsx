// src/theme/DocItem/Headers/ChapterHeaderRenderer.jsx
import React, { useState, useEffect } from 'react';
import ChapterHeader from './ChapterHeader';
import SectionHeader from './SectionHeader';

/**
 * Header renderer that handles bounds measurement and delegates to appropriate header type
 * This component gets the REAL frontmatter data from DocItem level
 */
export default function ChapterHeaderRenderer({ 
  frontMatter, 
  metadata, 
  title, 
  location, 
  isChapterPage, 
  isSectionPage 
}) {
  const [mainWidth, setMainWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Measure bounds
  useEffect(() => {
    const updateMainWidth = () => {
      const mainContainer = document.querySelector('.docMainContainer_TBSr');
      const width = mainContainer?.getBoundingClientRect().width || 0;
      
      if (width > 0) {
        setMainWidth(width);
        setIsReady(true);
      }
    };

    // Try immediately
    updateMainWidth();
    
    // If not ready, try a few more times with short delays
    if (!isReady) {
      const attempts = [50, 100, 200];
      attempts.forEach(delay => {
        setTimeout(updateMainWidth, delay);
      });
    }
    
    // Also listen for resize events
    window.addEventListener('resize', updateMainWidth);
    return () => window.removeEventListener('resize', updateMainWidth);
  }, [isReady]);

  const getChapterAndSectionNumbers = () => {
    const match = location?.pathname?.match(/\/chapters\/(\d+)\/(\d+)/);
    if (match) {
      return { chapterNumber: match[1], sectionNumber: match[2] };
    }
    
    const chapterMatch = location?.pathname?.match(/\/chapters\/(\d+)/);
    return { 
      chapterNumber: chapterMatch ? chapterMatch[1] : '?', 
      sectionNumber: null 
    };
  };

  const { chapterNumber, sectionNumber } = getChapterAndSectionNumbers();

  // Debug to console only (not UI)
  console.log('🎯 ChapterHeaderRenderer data check:', {
    isReady,
    mainWidth,
    isChapterPage,
    isSectionPage,
    title,
    chapterNumber,
    sectionNumber,
    pathname: location?.pathname,
    frontMatterKeys: Object.keys(frontMatter || {}),
    fullFrontMatter: frontMatter
  });

  // Header bounds container
  const headerStyle = {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    width: `${mainWidth}px`,
    margin: '-1rem 0 2rem 0'
  };

  // Render nothing while measuring - no visible loading state
  if (!isReady || mainWidth <= 0) {
    return null;
  }

  return (
    <div style={headerStyle}>
      {isChapterPage ? (
        <ChapterHeader 
          frontMatter={frontMatter}
          title={title}
          chapterNumber={chapterNumber}
          boundWidth={mainWidth}
          metadata={metadata}
        />
      ) : isSectionPage ? (
        <SectionHeader 
          frontMatter={frontMatter}
          title={title}
          chapterNumber={chapterNumber}
          sectionNumber={sectionNumber}
          boundWidth={mainWidth}
          metadata={metadata}
        />
      ) : (
        <div style={{
          padding: '1rem',
          background: '#f8d7da',
          border: '2px solid #721c24',
          textAlign: 'center'
        }}>
          ❓ UNKNOWN PAGE TYPE
          <br />
          Path: {location?.pathname} | Title: {title}
        </div>
      )}
    </div>
  );
}
