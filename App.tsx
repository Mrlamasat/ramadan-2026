import React, { useState, useRef, useCallback } from 'react';
import { Home, RefreshCw, Send, Share2, Play, AlertCircle } from 'lucide-react';

const TG_URL = "https://t.me/RamadanSeries26";
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  const forceOpen = () => {
    // فتح الرابط الحالي الذي يتصفحه المستخدم في نافذة جديدة لتجاوز حظر الـ Iframe
    window.open(url, '_blank');
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden font-sans" dir="rtl">
      
      {/* الهيدر المحسن */}
      <div className="fixed top-0 left-0 w-full h-[75px] bg-[#0c0c16] flex items-center justify-around z-[9999] border-b-2 border-red-600 shadow-2xl px-2">
        <button onClick={() => setUrl(`${BASE_URL}&t=${Date.now()}`)} className="text-white flex flex-col items-center">
          <Home size={20} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>
        
        <button onClick={handleRefresh} className="text-white flex flex-col items-center">
          <RefreshCw size={20} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>

        {/* زر "حل مشكلة التشغيل" - يظهر بشكل بارز */}
        <button 
          onClick={forceOpen} 
          className="bg-gradient-to-r from-red-600 to-red-800 px-3 py-1.5 rounded-full text-white flex items-center gap-2 shadow-lg animate-bounce"
        >
          <Play size={16} fill="white" />
          <span className="text-[11px] font-extrabold">حل مشكلة المشغل</span>
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

      {/* تنبيه بسيط يظهر للمستخدم */}
      <div className="absolute top-[80px] w-full flex justify-center z-[999]">
        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[9px] px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
          <AlertCircle size={10} />
          إذا ظهر خطأ في الفيديو، اضغط على "حل مشكلة المشغل"
        </div>
      </div>

      <div className="absolute top-[75px] left-0 w-full h-[calc(100vh-75px)] bg-black overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[155%] border-none"
          style={{ marginTop: '-275px' }}
          // الخيار الأفضل حالياً: بدون Sandbox نهائياً مع السماح بالـ Top Navigation
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
