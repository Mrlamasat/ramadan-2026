import React, { useState, useRef, useCallback } from 'react';
import { Home, RefreshCw, Send, Share2, PlayCircle } from 'lucide-react';

const TG_URL = "https://t.me/RamadanSeries26";
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  const goToHome = () => {
    setUrl(`${BASE_URL}&update=${Date.now()}`);
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden font-sans" dir="rtl">
      
      {/* الهيدر العلوي */}
      <div className="fixed top-0 left-0 w-full h-[75px] bg-[#0c0c16] flex items-center justify-around z-[9999] border-b-2 border-red-600 shadow-2xl">
        <button onClick={goToHome} className="text-white flex flex-col items-center active:scale-90 transition-transform">
          <Home size={22} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>
        <button onClick={handleRefresh} className="text-white flex flex-col items-center active:scale-90 transition-transform">
          <RefreshCw size={22} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>
        
        {/* زر حل المشكلات - يفتح الرابط في صفحة كاملة لتجاوز الحماية */}
        <button 
          onClick={() => window.open(url, '_blank')}
          className="bg-red-600 p-2 rounded-xl text-white flex flex-col items-center animate-pulse"
        >
          <PlayCircle size={20} />
          <span className="text-[9px] mt-1 font-bold">سيرفر احتياطي</span>
        </button>

        <button onClick={() => navigator.share({url: window.location.href})} className="text-white flex flex-col items-center active:scale-90 transition-transform">
          <Share2 size={22} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
        <a href={TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center active:scale-90 transition-transform">
          <Send size={22} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">تليجرام</span>
        </a>
      </div>

      {/* منطقة عرض المحتوى مع سياسة تجريد المصدر */}
      <div className="absolute top-[75px] left-0 w-full h-[calc(100vh-75px)] bg-black overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[155%] border-none"
          title="Content Frame"
          style={{ marginTop: '-275px' }}
          // هذه الخاصية هي الأهم لتجاوز حظر الـ Embed
          referrerPolicy="no-referrer"
          // السماح بكل شيء ما عدا الـ Sandbox الذي يكتشفه المشغل
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
        />
      </div>

    </div>
  );
}
