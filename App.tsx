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
    <div className="relative h-screen w-screen bg-black overflow-hidden fixed inset-0" dir="rtl">
      
      {/* هيدر التطبيق - منطقة آمنة وموثوقة */}
      <div className="fixed top-0 left-0 w-full h-[70px] bg-[#0c0c16] flex items-center justify-around z-[999999] border-b-2 border-red-600 shadow-2xl">
        <button onClick={() => setUrl(`${BASE_URL}&v=${Date.now()}`)} className="text-gray-300 flex flex-col items-center p-2 active:scale-90 transition-transform">
          <Home size={22} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>

        <button onClick={handleRefresh} className="text-gray-300 flex flex-col items-center p-2">
          <RefreshCw size={22} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>

        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-gray-300 flex flex-col items-center p-2">
          <Send size={22} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">قناتنا</span>
        </a>

        <button onClick={() => navigator.share({ url: window.location.href })} className="text-gray-300 flex flex-col items-center p-2">
          <Share2 size={22} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
      </div>

      {/* منطقة المحتوى مع نظام الدروع الواقية */}
      <div className="absolute top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-black overflow-hidden">
        
        {/* الـ Iframe: محصور بين هوامش لقص الروابط الخارجية في الأطراف */}
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[145%] border-none"
          style={{ 
            marginTop: '-275px', // قص الهيدر الأصلي
            marginBottom: '-400px', // قص الفوتر والروابط السفلية
            width: '102%', // تكبير طفيف لقص الروابط الجانبية
            marginLeft: '-1%' 
          }}
          referrerPolicy="no-referrer"
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        />

        {/* --- دروع الحماية (أهم جزء لإخفاء الروابط برمجياً) --- */}
        
        {/* 1. درع علوي (خلف الهيدر) لمنع الوصول لأي روابط قريبة من الأعلى */}
        <div className="absolute top-0 left-0 w-full h-4 z-[999] bg-transparent pointer-events-auto"></div>

        {/* 2. دروع جانبية لمنع الضغط على إعلانات "السكاي سكريبر" أو أزرار التواصل الجانبية */}
        <div className="absolute top-0 left-0 w-4 h-full z-[999] bg-transparent pointer-events-auto"></div>
        <div className="absolute top-0 right-0 w-4 h-full z-[999] bg-transparent pointer-events-auto"></div>

        {/* 3. درع سفلي ضخم يغطي منطقة "حقوق الملكية" وروابط تليجرام/فيسبوك الخاصة بالموقع */}
        <div className="absolute bottom-0 left-0 w-full h-[80px] z-[999] bg-transparent pointer-events-auto"></div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        body, html { overscroll-behavior: none; background: black; }
        /* إخفاء السكرول بار لضمان عدم خروج المستخدم عن المسار */
        ::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}
