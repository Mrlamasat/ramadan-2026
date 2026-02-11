import React, { useState, useRef, useCallback } from 'react';
import { Home, RefreshCw, Send, Share2, ExternalLink } from 'lucide-react';

const TG_URL = "https://t.me/RamadanSeries26";
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  const openExternal = () => {
    // حل احتياطي في حال تعطل المشغل داخل التطبيق
    window.open(url, '_blank');
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden font-sans" dir="rtl">
      
      {/* الهيدر */}
      <div className="fixed top-0 left-0 w-full h-[75px] bg-[#0c0c16] flex items-center justify-around z-[9999] border-b-2 border-red-600 shadow-2xl px-2">
        <button onClick={() => setUrl(`${BASE_URL}&t=${Date.now()}`)} className="text-white flex flex-col items-center">
          <Home size={20} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>
        <button onClick={handleRefresh} className="text-white flex flex-col items-center">
          <RefreshCw size={20} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>
        
        {/* زر الفتح الخارجي كحل نهائي للمشغلات المعطلة */}
        <button onClick={openExternal} className="bg-red-600/20 p-2 rounded-xl text-red-500 flex flex-col items-center border border-red-600/30">
          <ExternalLink size={20} />
          <span className="text-[9px] mt-1 font-bold">سيرفر خارجي</span>
        </button>

        <button onClick={() => navigator.share({url: window.location.href})} className="text-white flex flex-col items-center">
          <Share2 size={20} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
        <a href={TG_URL} target="_blank" className="text-white flex flex-col items-center">
          <Send size={20} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">تليجرام</span>
        </a>
      </div>

      <div className="absolute top-[75px] left-0 w-full h-[calc(100vh-75px)] bg-black overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[150%] border-none"
          style={{ marginTop: '-275px' }}
          // التعديل السحري هنا:
          referrerPolicy="no-referrer"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          // نستخدم sandbox لكن مع "تظاهر" بأنه ليس sandbox
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation"
          allowFullScreen
        />
      </div>
    </div>
  );
}
