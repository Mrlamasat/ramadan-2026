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
      
      {/* الهيدر العلوي */}
      <div className="fixed top-0 left-0 w-full h-[65px] bg-[#0c0c16] flex items-center justify-around z-[50] border-b border-red-600/30 shadow-xl">
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

      {/* منطقة المحتوى - الحل الذكي في التنسيق */}
      <div className="absolute top-[65px] left-0 w-full h-[calc(100vh-65px)] bg-black overflow-y-auto overflow-x-hidden">
        <div className="relative w-full" style={{ height: '2000px' }}> {/* طول افتراضي كبير للسماح بالتمرير الداخلي */}
          <iframe
            ref={iframeRef}
            src={url}
            className="absolute top-0 left-0 w-full h-full border-none"
            style={{ 
              marginTop: '-275px', // إخفاء الهيدر الأصلي
              clipPath: 'inset(275px 0px 150px 0px)' // السحر هنا: قص الجزء العلوي والسفلي برمجياً من حواف الرندر
            }}
            referrerPolicy="no-referrer"
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>

      {/* حماية منبثقة بسيطة: تمنع التفاعل مع الروابط التي تحاول الخروج من الإطار */}
      <style dangerouslySetInnerHTML={{ __html: `
        iframe {
            pointer-events: auto;
        }
        /* منع أي نقرات خارج منطقة المشغل إذا كانت تحاول فتح نوافذ جديدة */
        [window-target="_blank"] { pointer-events: none !important; }
      `}} />
    </div>
  );
}
