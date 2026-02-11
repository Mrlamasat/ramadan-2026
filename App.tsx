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

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden fixed inset-0 font-sans" dir="rtl">
      
      {/* الهيدر العلوي */}
      <div className="fixed top-0 left-0 w-full h-[70px] bg-[#0c0c16] flex items-center justify-around z-[999999] border-b-2 border-red-600 shadow-2xl">
        <button onClick={() => setUrl(`${BASE_URL}&v=${Date.now()}`)} className="text-gray-300 flex flex-col items-center p-2">
          <Home size={22} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold italic">الرئيسية</span>
        </button>

        <button onClick={handleRefresh} className="text-gray-300 flex flex-col items-center p-2">
          <RefreshCw size={22} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold italic">تحديث</span>
        </button>

        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-gray-300 flex flex-col items-center p-2">
          <Send size={22} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold italic">قناتنا</span>
        </a>

        <button onClick={() => navigator.share({ url: window.location.href })} className="text-gray-300 flex flex-col items-center p-2">
          <Share2 size={22} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold italic">مشاركة</span>
        </button>
      </div>

      <div className="absolute top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-black overflow-hidden">
        
        {/* الـ iframe بدون sandbox لضمان عمل المشغل 100% */}
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[155%] border-none"
          style={{ 
            marginTop: '-275px', 
            marginBottom: '-450px' 
          }}
          referrerPolicy="no-referrer"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />

        {/* --- نظام الدروع الذكي لتعطيل الروابط الخارجية --- */}
        
        {/* 1. درع الحواف (يمين ويسار): يمنع النقر على الإعلانات الجانبية وروابط التليجرام العائمة */}
        <div className="absolute top-0 left-0 w-[45px] h-full z-[999] bg-transparent pointer-events-auto"></div>
        <div className="absolute top-0 right-0 w-[45px] h-full z-[999] bg-transparent pointer-events-auto"></div>

        {/* 2. درع سفلي ضخم: يغطي الفوتر بالكامل حيث توجد روابطهم الخارجية وقنواتهم */}
        <div className="absolute bottom-0 left-0 w-full h-[120px] z-[999] bg-transparent pointer-events-auto"></div>

        {/* 3. درع المنطقة العلوية (تحت الهيدر مباشرة): لمنع النقر على أزرار تسجيل الدخول أو الروابط العلوية */}
        <div className="absolute top-0 left-0 w-full h-[40px] z-[999] bg-transparent pointer-events-auto"></div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        body, html { overscroll-behavior: none; background: black; margin: 0; }
        ::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}
