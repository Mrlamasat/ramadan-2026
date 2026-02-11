import React, { useState, useRef, useCallback } from 'react';
import { Home, RefreshCw, Send, Share2 } from 'lucide-react';

const MY_TG_URL = "https://t.me/RamadanSeries26";
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = useCallback(() => {
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = "about:blank";
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = currentSrc;
      }, 50);
    }
  }, []);

  const handleHome = useCallback(() => {
    setUrl(`${BASE_URL}&v=${Date.now()}`);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-[#050505] overflow-hidden fixed inset-0 font-sans" dir="rtl">
      
      {/* هيدر التطبيق - الوحيد الذي يحتوي على رابط تليجرام شغال */}
      <div className="fixed top-0 left-0 w-full h-[70px] bg-[#0c0c16] flex items-center justify-around z-[999999] border-b border-red-600/50 shadow-lg">
        <button onClick={handleHome} className="text-gray-300 flex flex-col items-center p-2 active:opacity-50">
          <Home size={22} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold italic">الرئيسية</span>
        </button>

        <button onClick={handleRefresh} className="text-gray-300 flex flex-col items-center p-2 active:opacity-50">
          <RefreshCw size={22} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold italic">تحديث</span>
        </button>

        <button 
          onClick={() => navigator.share({ url: window.location.href })} 
          className="text-gray-300 flex flex-col items-center p-2 active:opacity-50"
        >
          <Share2 size={22} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold italic">مشاركة</span>
        </button>

        {/* زر التليجرام الخاص بك - ميزناه بحركة نبض خفيفة */}
        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center p-2 active:opacity-50 animate-pulse">
          <Send size={22} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold italic text-blue-400">قناتنا</span>
        </a>
      </div>

      <div className="absolute top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-black overflow-hidden">
        {/* الـ iframe مع إزاحة كبيرة في الأسفل لإخفاء تذييل الموقع (Footer) */}
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[140%] border-none"
          style={{ 
            marginTop: '-275px', // إخفاء الهيدر الأصلي
            marginBottom: '-500px' // إخفاء الفوتر الأصلي حيث توجد روابطهم
          }}
          referrerPolicy="no-referrer"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
          allowFullScreen
        />
        
        {/* دروع حماية شفافة تغطي زوايا الموقع الأصلي حيث تظهر أزرار التليجرام العائمة عادةً */}
        {/* درع سفلي أيمن */}
        <div className="absolute bottom-4 right-4 w-16 h-16 z-[9999] bg-transparent pointer-events-none sm:pointer-events-auto"></div>
        
        {/* درع سفلي أيسر */}
        <div className="absolute bottom-4 left-4 w-16 h-16 z-[9999] bg-transparent pointer-events-none sm:pointer-events-auto"></div>
        
        {/* حاجز أمان سفلي إضافي لمنع النقر على شريط الموقع الأصلي الأسفل */}
        <div className="absolute bottom-0 left-0 w-full h-[60px] z-[9998] bg-transparent pointer-events-auto"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        body, html { overscroll-behavior: none; margin: 0; padding: 0; }
        /* إخفاء أي أشرطة تمرير قد تظهر بشكل مفاجئ */
        ::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}
