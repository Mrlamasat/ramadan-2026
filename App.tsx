import React, { useState, useRef } from 'react';
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

  const handleRefresh = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  return (
    <div className="relative h-screen w-screen bg-[#050505] overflow-hidden" dir="rtl">
      
      {/* هيدر التطبيق - يختفي عند التكبير لتوسيع الرؤية */}
      <div className={`fixed top-0 left-0 w-full h-[65px] bg-[#0c0c16] flex items-center justify-around z-[100] border-b border-red-600/40 shadow-2xl transition-all duration-500 ${isMaximized ? '-top-[70px]' : 'top-0'}`}>
        <button onClick={() => setUrl(`${BASE_URL}&v=${Date.now()}`)} className="text-gray-300 flex flex-col items-center active:scale-95">
          <Home size={20} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>
        <button onClick={handleRefresh} className="text-gray-300 flex flex-col items-center active:scale-95">
          <RefreshCw size={20} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>
        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center active:scale-95">
          <Send size={20} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">قناتنا</span>
        </a>
        <button onClick={() => navigator.share?.({url: window.location.href})} className="text-gray-300 flex flex-col items-center active:scale-95">
          <Share2 size={20} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
      </div>

      <div className={`absolute left-0 w-full bg-black overflow-hidden transition-all duration-500 ${isMaximized ? 'top-0 h-screen' : 'top-[65px] h-[calc(100vh-65px)]'}`}>
        <div className="w-full h-full overflow-hidden">
          <iframe
            ref={iframeRef}
            src={url}
            className="w-[102%] h-[150%] border-none"
            style={{ 
              marginTop: isMaximized ? '-220px' : '-275px', 
              marginLeft: '-1%', 
              transform: isMaximized ? 'scale(1.05)' : 'scale(1.02)', 
              transformOrigin: 'top center'
            }}
            referrerPolicy="no-referrer"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* مجموعة أزرار التواصل + زر التكبير/التصغير */}
        <div className={`absolute left-0 w-full flex justify-center items-center gap-3 z-[500] pointer-events-none px-4 transition-all duration-500 ${isMaximized ? 'bottom-4' : 'bottom-28'}`}>
          
          {/* زر واتساب */}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" 
             className={`pointer-events-auto flex items-center justify-center bg-[#25D366] text-white rounded-full font-black shadow-lg transition-all duration-500 ${isMaximized ? 'p-2 w-10 h-10' : 'px-5 py-3.5 gap-2'}`}>
            <MessageCircle size={isMaximized ? 20 : 22} />
            {!isMaximized && <span className="text-sm">واتساب</span>}
          </a>

          {/* زر تيك توك */}
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" 
             className={`pointer-events-auto flex items-center justify-center bg-black border border-white/30 text-white rounded-full font-black shadow-lg transition-all duration-500 ${isMaximized ? 'p-2 w-10 h-10' : 'px-5 py-3.5 gap-2'}`}>
            <TikTokIcon className={isMaximized ? 'w-5 h-5' : 'w-5 h-5'} />
            {!isMaximized && <span className="text-sm">تيك توك</span>}
          </a>

          {/* زر التكبير والتصغير (المطلوب) */}
          <button onClick={() => setIsMaximized(!isMaximized)} 
             className={`pointer-events-auto flex items-center justify-center bg-yellow-500 text-black rounded-full font-black shadow-xl animate-pulse transition-all duration-500 ${isMaximized ? 'p-2 w-10 h-10' : 'px-5 py-3.5 gap-2'}`}>
            {isMaximized ? <Minimize size={22} /> : <Maximize size={22} />}
            {!isMaximized && <span className="text-sm font-bold">تكبير</span>}
          </button>

          {/* زر تليجرام */}
          <a href={MY_TG_URL} target="_blank" rel="noreferrer" 
             className={`pointer-events-auto flex items-center justify-center bg-[#229ED9] text-white rounded-full font-black shadow-lg transition-all duration-500 ${isMaximized ? 'p-2 w-10 h-10' : 'px-5 py-3.5 gap-2'}`}>
            <Send size={isMaximized ? 20 : 22} />
            {!isMaximized && <span className="text-sm">تليجرام</span>}
          </a>
        </div>

        {/* طبقة حماية - تختفي عند التكبير للسماح بالتحكم الكامل في الفيديو */}
        {!isMaximized && <div className="absolute bottom-0 left-0 w-full h-[140px] bg-transparent z-[99] pointer-events-auto"></div>}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        iframe { pointer-events: auto !important; }
        .no-underline { text-decoration: none; }
      `}} />
    </div>
  );
}
