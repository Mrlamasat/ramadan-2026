import React, { useState, useRef, useEffect } from 'react';
import { Home, RefreshCw, Send, Share2, MessageCircle, Maximize, Minimize } from 'lucide-react';

const MY_TG_URL = "https://t.me/RamadanSeries26";
const TIKTOK_URL = "https://www.tiktok.com/@1118.8111?_r=1&_t=ZG-93qhRpdxK5Y";
const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbCPDBw4tRs210hx2D3a"; 
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.39-.01 2.34.01 4.68-.01 7.02-.14 5.74-7.41 8.26-10.89 4.39-2.38-2.61-1.23-7.1 2.22-8.02.82-.21 1.69-.21 2.53-.08V11c-1.3-.17-2.66-.13-3.92.3-3.05 1.05-4.43 5.18-2.62 7.9 1.76 2.65 5.8 3.06 8 1 1.41-1.31 1.69-3.41 1.69-5.21V.02Z"/>
  </svg>
);

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const [isMaximized, setIsMaximized] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const appContainerRef = useRef<HTMLDivElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  const toggleFullscreen = async () => {
    if (!isMaximized) {
      if (appContainerRef.current?.requestFullscreen) {
        await appContainerRef.current.requestFullscreen();
      }
      setIsMaximized(true);
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsMaximized(false);
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsMaximized(false);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div ref={appContainerRef} className="relative h-screen w-screen bg-black overflow-hidden" dir="rtl">
      
      {/* الهيدر العلوي */}
      <header className={`fixed top-0 left-0 w-full h-[65px] bg-[#0c0c16] flex items-center justify-between px-8 z-[100] border-b border-red-600/40 transition-transform duration-500 ${isMaximized ? '-translate-y-full' : 'translate-y-0'}`}>
        <button onClick={() => setUrl(`${BASE_URL}&v=${Date.now()}`)} className="text-gray-300 flex flex-col items-center active:scale-90 outline-none">
          <Home size={22} className="text-red-500" />
          <span className="text-[9px] mt-1 font-bold">الرئيسية</span>
        </button>
        <button onClick={handleRefresh} className="text-gray-300 flex flex-col items-center active:scale-90 outline-none">
          <RefreshCw size={22} className="text-green-500" />
          <span className="text-[9px] mt-1 font-bold">تحديث</span>
        </button>
        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center active:scale-90 no-underline">
          <Send size={22} className="text-blue-400" />
          <span className="text-[9px] mt-1 font-bold">قناتنا</span>
        </a>
        <button onClick={() => navigator.share?.({url: window.location.href})} className="text-gray-300 flex flex-col items-center active:scale-90 outline-none">
          <Share2 size={22} className="text-purple-500" />
          <span className="text-[9px] mt-1 font-bold">مشاركة</span>
        </button>
      </header>

      {/* منطقة المشغل */}
      <main className={`relative w-full transition-all duration-700 ${isMaximized ? 'h-screen' : 'h-[calc(100vh-65px)] mt-[65px]'}`}>
        <div className="w-full h-full overflow-hidden bg-black">
          <iframe
            ref={iframeRef}
            src={url}
            className="border-none transition-all duration-700"
            style={isMaximized ? {
              width: '100%',
              height: '180%',
              marginTop: '-15%',
              transform: 'scale(1.1)',
              transformOrigin: 'top center'
            } : {
              width: '102%',
              height: '150%',
              marginTop: '-275px',
              marginLeft: '-1%',
              transform: 'scale(1.02)',
              transformOrigin: 'top center'
            }}
            referrerPolicy="no-referrer"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* الأزرار العائمة - نظام تحول المربعات الممركزة */}
        <div className={`absolute left-0 w-full flex items-center z-[500] pointer-events-none transition-all duration-700 ${isMaximized ? 'bottom-10 justify-center gap-2' : 'bottom-24 justify-between px-6'}`}>
          
          <div className={`flex transition-all duration-700 ${isMaximized ? 'gap-2' : 'gap-4'}`}>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" 
               className={`pointer-events-auto flex items-center justify-center bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 active:scale-90 ${isMaximized ? 'w-12 h-10 rounded-lg opacity-40 hover:opacity-100' : 'w-14 h-14 rounded-full'}`}>
              <MessageCircle size={isMaximized ? 20 : 28} />
            </a>
            <a href={MY_TG_URL} target="_blank" rel="noreferrer" 
               className={`pointer-events-auto flex items-center justify-center bg-[#229ED9] text-white shadow-lg transition-all hover:scale-110 active:scale-90 ${isMaximized ? 'w-12 h-10 rounded-lg opacity-40 hover:opacity-100' : 'w-14 h-14 rounded-full'}`}>
              <Send size={isMaximized ? 20 : 28} />
            </a>
          </div>

          <div className={`flex transition-all duration-700 ${isMaximized ? 'gap-2' : 'gap-4'}`}>
            <a href={TIKTOK_URL} target="_blank" rel="noreferrer" 
               className={`pointer-events-auto flex items-center justify-center bg-black border border-white/20 text-white shadow-lg transition-all hover:scale-110 active:scale-90 ${isMaximized ? 'w-12 h-10 rounded-lg opacity-40 hover:opacity-100' : 'w-14 h-14 rounded-full'}`}>
              <TikTokIcon className={isMaximized ? 'w-5 h-5' : 'w-7 h-7'} />
            </a>
            <button onClick={toggleFullscreen} 
               className={`pointer-events-auto flex items-center justify-center bg-yellow-500 text-black shadow-2xl transition-all hover:scale-110 active:scale-90 ${isMaximized ? 'w-12 h-10 rounded-lg' : 'w-14 h-14 rounded-full animate-bounce-slow'}`}>
              {isMaximized ? <Minimize size={20} /> : <Maximize size={28} />}
            </button>
          </div>
        </div>

        {!isMaximized && <div className="absolute bottom-0 left-0 w-full h-[120px] bg-transparent z-[99] pointer-events-auto"></div>}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
        iframe { pointer-events: auto !important; }
      `}} />
    </div>
  );
}
