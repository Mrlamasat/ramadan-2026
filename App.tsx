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
    <div className="relative h-screen w-screen bg-black overflow-hidden" dir="rtl">
      
      {/* هيدر التطبيق */}
      <div className="fixed top-0 left-0 w-full h-[65px] bg-[#0c0c16] flex items-center justify-around z-[100] border-b border-red-600/30">
        <button onClick={() => setUrl(`${BASE_URL}&v=${Date.now()}`)} className="text-gray-300 flex flex-col items-center">
          <Home size={20} className="text-red-500" />
          <span className="text-[10px] mt-1">الرئيسية</span>
        </button>
        <button onClick={handleRefresh} className="text-gray-300 flex flex-col items-center">
          <RefreshCw size={20} className="text-green-500" />
          <span className="text-[10px] mt-1">تحديث</span>
        </button>
        <a href={MY_TG_URL} target="_blank" rel="noreferrer" className="text-gray-300 flex flex-col items-center">
          <Send size={20} className="text-blue-400" />
          <span className="text-[10px] mt-1">قناتنا</span>
        </a>
        <button onClick={() => navigator.share({url: window.location.href})} className="text-gray-300 flex flex-col items-center">
          <Share2 size={20} className="text-purple-500" />
          <span className="text-[10px] mt-1">مشاركة</span>
        </button>
      </div>

      <div className="absolute top-[65px] left-0 w-full h-[calc(100vh-65px)] bg-black overflow-hidden">
        
        {/* الـ iframe بدون sandbox ليعمل المشغل بسلاسة */}
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[150%] border-none"
          style={{ marginTop: '-275px' }}
          referrerPolicy="no-referrer"
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        />

        {/* --- طبقة التعطيل الذكية (Invisible Click Blocker) --- */}
        {/* هذه الطبقة تغطي كامل مساحة الموقع ما عدا منطقة المشغل */}
        <div className="absolute inset-0 z-[99] pointer-events-none">
          
          {/* تعطيل المنطقة السفلية (مكان أزرار تليجرام ويوتيوب الموقع) */}
          {/* جعلنا pointer-events-auto لتمتص الضغطات وتعطل الروابط تماماً */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-auto bg-transparent"
            title="هذه المنطقة معطلة لمنع الروابط الخارجية"
          ></div>

          {/* تعطيل الجوانب */}
          <div className="absolute top-0 left-0 w-[40px] h-full pointer-events-auto bg-transparent"></div>
          <div className="absolute top-0 right-0 w-[40px] h-full pointer-events-auto bg-transparent"></div>
          
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        body, html { margin: 0; padding: 0; overscroll-behavior: none; }
        /* إخفاء السكرول بار لمنع المستخدم من الوصول للأزرار بالأسفل */
        ::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}
