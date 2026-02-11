import React, { useState, useRef, useCallback } from 'react';
import { Home, RefreshCw, Send, Share2 } from 'lucide-react';

const TG_URL = "https://t.me/RamadanSeries26";
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
    <div className="relative h-screen w-screen bg-[#050505] overflow-hidden" dir="rtl" style={{ position: 'fixed', top: 0, left: 0 }}>
      
      {/* هيدر متوافق مع الجوال */}
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

        <a href={TG_URL} target="_blank" rel="noreferrer" className="text-gray-300 flex flex-col items-center p-2 active:opacity-50">
          <Send size={22} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold italic">تليجرام</span>
        </a>
      </div>

      {/* منطقة العرض الرئيسية مع حلول الجوال */}
      <div className="absolute top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-black overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[155%] border-none"
          style={{ 
            marginTop: '-275px',
            height: 'calc(100% + 275px + 100px)' // زيادة الارتفاع لضمان عدم وجود مساحة بيضاء عند التمرير
          }}
          referrerPolicy="no-referrer"
          // أضفنا الصلاحيات الكاملة التي يطلبها الجوال للتشغيل التلقائي
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share; accelerometer; clipboard-write; gyroscope"
          // @ts-ignore - خصائص إضافية لمتصفحات الجوال
          playsInline={true}
          webkit-playsinline="true"
          allowFullScreen
        />
      </div>

      {/* منع التمرير الزائد (Overscroll) في الجوال */}
      <style dangerouslySetInnerHTML={{ __html: `
        body, html { 
          overscroll-behavior: none; 
          margin: 0; 
          padding: 0; 
          width: 100%; 
          height: 100%; 
        }
      `}} />
    </div>
  );
}
