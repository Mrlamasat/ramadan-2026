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
  const [isMaximized, setIsMaximized] = useState(false);
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const appContainerRef = useRef<HTMLDivElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  const toggleFullscreen = async () => {
    if (!isMaximized) {
      // دخول Fullscreen إن كان متاح
      if (appContainerRef.current?.requestFullscreen) {
        try { await appContainerRef.current.requestFullscreen(); } catch {}
      }

      // طلب تدوير الشاشة Landscape
      if (screen.orientation && screen.orientation.lock) {
        try { await screen.orientation.lock('landscape'); } catch {}
      }

      // رفع iframe لإخفاء الهيدر الأصلي
      setUrl(BASE_URL + "&minimal=1"); // إذا كان الموقع يدعم نسخة minimal
      setIsMaximized(true);
    } else {
      // الخروج من fullscreen
      if (document.exitFullscreen) {
        try { await document.exitFullscreen(); } catch {}
      }

      if (screen.orientation && screen.orientation.unlock) {
        try { screen.orientation.unlock(); } catch {}
      }

      setUrl(BASE_URL); // ارجع النسخة العادية
      setIsMaximized(false);
    }
  };

  return (
    <div ref={appContainerRef} className="relative w-screen h-screen bg-black" dir="rtl">

      {/* الهيدر الخاص بالتطبيق يبقى ظاهر دائمًا */}
      <header className="fixed top-0 left-0 w-full h-[65px] bg-[#0c0c16] flex items-center justify-between px-8 z-[100] border-b border-red-600/40">
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

      {/* iframe مع رفع لإخفاء الهيدر الأصلي */}
      <main className={`w-full h-full mt-[65px] overflow-hidden transition-all duration-500`}>
        <iframe
          ref={iframeRef}
          src={url}
          className="border-none w-full transition-all duration-500"
          style={{
            height: isMaximized ? '120%' : '150%',
            marginTop: isMaximized ? '-65px' : '-80px',
          }}
          referrerPolicy="no-referrer"
          allow="autoplay; fullscreen"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </main>

      {/* الأزرار العائمة */}
      <div className={`fixed left-0 w-full flex justify-center gap-4 z-[500] transition-all duration-500 bottom-4`}>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
           className="flex items-center justify-center bg-[#25D366] text-white shadow-lg w-14 h-14 rounded-full transition-transform duration-300 hover:scale-110 active:scale-90">
          <MessageCircle size={28} />
        </a>
        <a href={MY_TG_URL} target="_blank" rel="noreferrer"
           className="flex items-center justify-center bg-[#229ED9] text-white shadow-lg w-14 h-14 rounded-full transition-transform duration-300 hover:scale-110 active:scale-90">
          <Send size={28} />
        </a>
        <a href={TIKTOK_URL} target="_blank" rel="noreferrer"
           className="flex items-center justify-center bg-black border border-white/20 text-white shadow-lg w-14 h-14 rounded-full transition-transform duration-300 hover:scale-110 active:scale-90">
          <TikTokIcon className="w-7 h-7" />
        </a>
        <button onClick={toggleFullscreen}
           className="flex items-center justify-center bg-yellow-500 text-black shadow-2xl w-14 h-14 rounded-full transition-transform duration-300 hover:scale-110 active:scale-90">
          {isMaximized ? <Minimize size={28} /> : <Maximize size={28} />}
        </button>
      </div>
    </div>
  );
}
