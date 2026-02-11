import React, { useState, useRef, useCallback } from 'react';
import { Home, RefreshCw, Send, Share2 } from 'lucide-react';

const MY_TG_URL = "https://t.me/RamadanSeries26";
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  }, []);

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden fixed inset-0 font-sans" dir="rtl">
      
      {/* الهيدر العلوي الخاص بك */}
      <div className="fixed top-0 left-0 w-full h-[70px] bg-[#0c0c16] flex items-center justify-around z-[999999] border-b-2 border-red-600 shadow-2xl">
        <button onClick={() => setUrl(`${BASE_URL}&v=${Date.now()}`)} className="text-gray-300 flex flex-col items-center">
          <Home size={22} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>

        <button onClick={handleRefresh} className="text-gray-300 flex flex-col items-center">
          <RefreshCw size={22} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>

        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center">
          <Send size={22} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">قناتنا</span>
        </a>

        <button onClick={() => navigator.share({ url: window.location.href })} className="text-gray-300 flex flex-col items-center">
          <Share2 size={22} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
      </div>

      {/* منطقة عرض المحتوى */}
      <div className="absolute top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-black overflow-hidden">
        
        {/* الـ iframe: قمنا بضبط الارتفاع بدقة لقص الأزرار السفلية */}
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full border-none"
          style={{ 
            marginTop: '-275px', // قص الهيدر الأصلي
            height: 'calc(100% + 200px)', // الارتفاع يسمح برؤية المشغل فقط
            marginBottom: '-500px' // قص الأزرار السفلية (تليجرام ويوتيوب الموقع)
          }}
          referrerPolicy="no-referrer"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />

        {/* --- الدرع الواقي السفلي (السدادة) --- */}
        {/* هذه الطبقة تغطي منطقة أزرار تليجرام ويوتيوب الموقع الأصلي تماماً */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[150px] bg-black z-[9999] flex items-center justify-center border-t border-red-600/20"
          style={{ pointerEvents: 'auto' }}
        >
          <p className="text-gray-500 text-[10px] italic">مشاهدة ممتعة عبر تطبيقنا الرسمي</p>
        </div>

        {/* دروع جانبية إضافية */}
        <div className="absolute top-0 right-0 w-[40px] h-full z-[9998] bg-transparent pointer-events-auto"></div>
        <div className="absolute top-0 left-0 w-[40px] h-full z-[9998] bg-transparent pointer-events-auto"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        body, html { overscroll-behavior: none; background: black; margin: 0; }
        ::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}
