import React from 'react';

interface BrowserFrameProps {
  url: string;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
}

const BrowserFrame: React.FC<BrowserFrameProps> = ({ url, iframeRef }) => {
  return (
    <div className="absolute top-[65px] left-0 w-full h-[calc(100vh-65px)] bg-black overflow-hidden">
      <div className="w-full h-full overflow-hidden transition-all duration-300">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-[105%] h-[160%] border-none"
          style={{ 
            marginTop: '-275px', 
            marginLeft: '-2.5%', 
            transform: 'scale(1.02)', 
            transformOrigin: 'top center'
          }}
          referrerPolicy="no-referrer"
          sandbox="allow-forms allow-scripts allow-same-origin allow-presentation"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[140px] bg-gradient-to-t from-black via-black/90 to-transparent z-[99] pointer-events-auto"></div>
    </div>
  );
};

export default BrowserFrame; // هذا السطر ضروري لنجاح الاستيراد في App.tsx
