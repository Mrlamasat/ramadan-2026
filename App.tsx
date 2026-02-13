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

  const handleRefresh = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  // وظيفة لقلب الشاشة برمجياً (تعمل في المتصفحات التي تدعم Screen Orientation API)
  useEffect(() => {
    if (isMaximized) {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {
          console.log("القلب التلقائي غير مدعوم إلا بعد تفاعل المستخدم في بعض المتصفحات");
        });
      }
    } else {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    }
  }, [isMaximized]);

  return (
    <div className={`relative h-screen w-screen bg-black overflow-hidden transition-all duration-700 ${isMaximized ? 'fixed inset-0 z-[9999]' : ''}`} dir="rtl">
      
      {/* 1. هيدر متناسق مع عرض الشاشة */}
      <header className={`fixed top-0 left-0 w-full h-[65px] bg-[#0c0c16] flex items-center justify-between px-6 z-[100] border-b border-red-600/40 transition-transform duration-500 ${isMaximized ? '-translate-y-full' : 'translate-y-0'}`}>
        <button onClick={() => setUrl(`${BASE_URL}&v=${Date.now()}`)} className="text-gray-300 flex flex-col items-center active:scale-90">
          <Home size={20} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>
        <button onClick={handleRefresh} className="text-gray-300 flex flex-col items-center active:scale-90">
          <RefreshCw size={20} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>
        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center active:scale-90 no-underline">
          <Send size={20} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">قناتنا</span>
        </a>
        <button onClick={() => navigator.share?.({url: window.location.href})} className="text-gray-300 flex flex-col items-center active:scale-90">
          <Share2 size={20} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
      </header>

      {/* منطقة العرض التي تنقلب عند التكبير */}
      <main className={`relative w-full transition-all duration-700 ${isMaximized ? 'h-screen' : 'h-[calc(100vh-65px)] mt-[65px]'}`}>
        <div className={`w-full h-full overflow-hidden transition-transform duration-700 ${isMaximized ? 'rotate-0 md:rotate-0' : ''}`}>
          <iframe
            ref={iframeRef}
            src={url}
            className="w-[102%] h-[150%] border-none shadow-inner"
            style={{ 
              marginTop: isMaximized ? '-180px' : '-275px', 
              marginLeft: '-1%', 
              transform: isMaximized ? 'scale(1.1)' : 'scale(1.02)', 
              transformOrigin: 'top center'
            }}
            referrerPolicy="no-referrer"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* 2. أزرار التواصل موزعة بعرض الشاشة وتصغر في مكانها */}
        <div className={`absolute left-0 w-full flex justify-between items-center px-8 z-[500] pointer-events-none transition-all duration-700 ${isMaximized ? 'bottom-16' : 'bottom-28'}`}>
          
          <div className="flex gap-3">
            {/* زر واتساب */}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" 
               className={`pointer-events-auto flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-lg transition-all duration-500 ${isMaximized ? 'w-10 h-10 p-2' : 'px-4 py-3 gap-2'}`}>
              <MessageCircle size={isMaximized ? 20 : 22} />
              {!isMaximized && <span className="text-xs font-black">واتساب</span>}
            </a>

            {/* زر تليجرام */}
            <a href={MY_TG_URL} target="_blank" rel="noreferrer" 
               className={`pointer-events-auto flex items-center justify-center bg-[#229ED9] text-white rounded-full shadow-lg transition-all duration-500 ${isMaximized ? 'w-10 h-10 p-2' : 'px-4 py-3 gap-2'}`}>
              <Send size={isMaximized ? 20 : 22} />
              {!isMaximized && <span className="text-xs font-black">تليجرام</span>}
            </a>
          </div>

          <div className="flex gap-3">
            {/* زر تيك توك */}
            <a href={TIKTOK_URL} target="_blank" rel="noreferrer" 
               className={`pointer-events-auto flex items-center justify-center bg-black border border-white/20 text-white rounded-full shadow-lg transition-all duration-500 ${isMaximized ? 'w-10 h-10 p-2' : 'px-4 py-3 gap-2'}`}>
              <TikTokIcon className="w-5 h-5" />
              {!isMaximized && <span className="text-xs font-black">تيك توك</span>}
            </a>

            {/* زر التكبير/التصغير والقلب */}
            <button onClick={() => setIsMaximized(!isMaximized)} 
               className={`pointer-events-auto flex items-center justify-center bg-yellow-500 text-black rounded-full shadow-2xl animate-pulse transition-all duration-500 ${isMaximized ? 'w-10 h-10 p-2' : 'px-4 py-3 gap-2'}`}>
              {isMaximized ? <Minimize size={22} /> : <Maximize size={22} />}
              {!isMaximized && <span className="text-xs font-black">تكبير</span>}
            </button>
          </div>
        </div>

        {/* طبقة الحماية الشفافة */}
        {!isMaximized && <div className="absolute bottom-0 left-0 w-full h-[120px] bg-transparent z-[99] pointer-events-auto"></div>}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        /* تدوير الشاشة في وضع التكبير للهواتف */
        @media (max-width: 768px) {
          .maximized-mode {
            transform: rotate(90deg);
            transform-origin: center;
            width: 100vh;
            height: 100vw;
          }
        }
        iframe { pointer-events: auto !important; }
        a { text-decoration: none !important; }
      `}} />
    </div>
  );
}
