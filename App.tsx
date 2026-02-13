import React, { useState, useRef } from 'react';
import { Home, RefreshCw, Send, Share2, MessageCircle } from 'lucide-react';

const MY_TG_URL = "https://t.me/RamadanSeries26";
const TIKTOK_URL = "https://www.tiktok.com/@1118.8111?_r=1&_t=ZG-93qhRpdxK5Y";
const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbCPDBw4tRs210hx2D3a"; 
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

// تعريف أيقونة تيك توك لتجنب أي خطأ في الجافا سكريبت
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.39-.01 2.34.01 4.68-.01 7.02-.14 5.74-7.41 8.26-10.89 4.39-2.38-2.61-1.23-7.1 2.22-8.02.82-.21 1.69-.21 2.53-.08V11c-1.3-.17-2.66-.13-3.92.3-3.05 1.05-4.43 5.18-2.62 7.9 1.76 2.65 5.8 3.06 8 1 1.41-1.31 1.69-3.41 1.69-5.21V.02Z"/>
  </svg>
);

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'مسلسلات رمضان 2026',
        url: window.location.href,
      }).catch(() => console.log('Share failed'));
    }
  };

  return (
    <div className="relative h-screen w-screen bg-[#050505] overflow-hidden" dir="rtl">
      
      {/* هيدر التطبيق - ثابت في الأعلى */}
      <div className="fixed top-0 left-0 w-full h-[65px] bg-[#0c0c16] flex items-center justify-around z-[100] border-b border-red-600/40 shadow-2xl">
        <button onClick={() => setUrl(`${BASE_URL}&v=${Date.now()}`)} className="text-gray-300 flex flex-col items-center active:scale-95 transition-all outline-none">
          <Home size={20} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>
        
        <button onClick={handleRefresh} className="text-gray-300 flex flex-col items-center active:scale-95 transition-all outline-none">
          <RefreshCw size={20} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>

        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center active:scale-95 transition-all no-underline">
          <Send size={20} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">قناتنا</span>
        </a>

        <button onClick={handleShare} className="text-gray-300 flex flex-col items-center active:scale-95 transition-all outline-none">
          <Share2 size={20} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
      </div>

      {/* منطقة المشغل */}
      <div className="absolute top-[65px] left-0 w-full h-[calc(100vh-65px)] bg-black overflow-hidden">
        <div className="w-full h-full overflow-hidden">
          <iframe
            ref={iframeRef}
            src={url}
            className="w-[102%] h-[150%] border-none"
            style={{ 
              marginTop: '-275px', 
              marginLeft: '-1%', 
              transform: 'scale(1.02)', 
              transformOrigin: 'top center'
            }}
            referrerPolicy="no-referrer"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* الأزرار العائمة المتحركة - مرفوعة ومكبرة */}
        <div className="absolute bottom-28 left-0 w-full flex justify-center items-center gap-4 z-[500] pointer-events-none px-4">
          
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" 
             className="pointer-events-auto flex items-center gap-3 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-black shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-90 transition-all animate-bounce-slow no-underline">
            <MessageCircle size={22} />
            <span className="text-sm">واتساب</span>
          </a>

          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" 
             className="pointer-events-auto flex items-center gap-3 bg-[#000000] border border-white/30 text-white px-6 py-3.5 rounded-full font-black shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-90 transition-all animate-bounce-slow no-underline" 
             style={{ animationDelay: '0.2s' }}>
            <TikTokIcon className="w-5 h-5" />
            <span className="text-sm">تيك توك</span>
          </a>

          <a href={MY_TG_URL} target="_blank" rel="noreferrer" 
             className="pointer-events-auto flex items-center gap-3 bg-[#229ED9] text-white px-6 py-3.5 rounded-full font-black shadow-[0_0_20px_rgba(34,158,217,0.6)] hover:scale-110 active:scale-90 transition-all animate-bounce-slow no-underline" 
             style={{ animationDelay: '0.4s' }}>
            <Send size={22} />
            <span className="text-sm">تليجرام</span>
          </a>
        </div>

        {/* طبقة حماية شفافة لمنع النقرات الخاطئة في الأسفل */}
        <div className="absolute bottom-0 left-0 w-full h-[140px] bg-transparent z-[99] pointer-events-auto"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
        iframe { pointer-events: auto !important; }
      `}} />
    </div>
  );
}
