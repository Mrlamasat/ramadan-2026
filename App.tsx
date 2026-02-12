import React, { useState, useRef, useCallback } from 'react';
import { Home, RefreshCw, Send, Share2 } from 'lucide-react';

const MY_TG_URL = "https://t.me/RamadanSeries26";
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  return (
    <div className="relative h-screen w-screen bg-[#050505] overflow-hidden" dir="rtl">
      
      {/* هيدر التطبيق الاحترافي */}
      <div className="fixed top-0 left-0 w-full h-[65px] bg-[#0c0c16] flex items-center justify-around z-[100] border-b border-red-600/40 shadow-2xl">
        <button onClick={() => setUrl(`${BASE_URL}&v=${Date.now()}`)} className="text-gray-300 flex flex-col items-center active:scale-95 transition-all">
          <Home size={20} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>
        
        <button onClick={handleRefresh} className="text-gray-300 flex flex-col items-center active:scale-95 transition-all">
          <RefreshCw size={20} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>

        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center active:scale-95 transition-all">
          <Send size={20} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">قناتنا</span>
        </a>

        <button onClick={() => navigator.share({url: window.location.href})} className="text-gray-300 flex flex-col items-center active:scale-95 transition-all">
          <Share2 size={20} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
      </div>

      {/* منطقة العرض الذكية */}
      <div className="absolute top-[65px] left-0 w-full h-[calc(100vh-65px)] bg-black overflow-hidden">
        <div className="w-full h-full overflow-hidden">
          <iframe
            ref={iframeRef}
            src={url}
            /* استخدمنا تقنية الـ Scale لإخفاء الـ buttons-container 
               عن طريق جعل الصفحة أكبر قليلاً من الإطار وقص الأطراف
            */
            className="w-[102%] h-[150%] border-none"
            style={{ 
              marginTop: '-275px', // إخفاء الهيدر الأصلي
              marginLeft: '-1%', // موازنة العرض بعد التكبير
              transform: 'scale(1.02)', // تكبير بسيط جداً يطرد الأزرار الجانبية والسفلية
              transformOrigin: 'top center'
            }}
            referrerPolicy="no-referrer"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* طبقة حماية لمسية شفافة تماماً فوق منطقة الـ buttons-container المتوقعة */}
        <div className="absolute bottom-0 left-0 w-full h-[120px] bg-transparent z-[99] pointer-events-auto"></div>
      </div>

      {/* كود CSS لمنع أي محاولة لفتح نافذة تليجرام أو يوتيوب خارج التطبيق */}
      <style dangerouslySetInnerHTML={{ __html: `
        iframe { pointer-events: auto !important; }
        /* حماية إضافية ضد الروابط الخارجية */
        a[href*="t.me/larozavip"], a[href*="youtube.com"] {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
      `}} />
    </div>
  );
}
