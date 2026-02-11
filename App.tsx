import React, { useState, useRef, useCallback } from 'react';
import { Home, RefreshCw, Send, Share2 } from 'lucide-react';

const TG_URL = "https://t.me/RamadanSeries26";
// تم التحديث للرابط الجديد لاروزا بوند
const HOME_URL = "https://v.larooza.bond/category.php?cat=ramadan-2026";

export default function App() {
  const [url, setUrl] = useState(HOME_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  const handleHome = () => {
    // إضافة timestamp لضمان كسر الكاش عند العودة للرئيسية
    setUrl(`${HOME_URL}&update=${Date.now()}`);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'مسلسلات رمضان 2026', url: window.location.href });
      } else {
        throw new Error();
      }
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ الرابط بنجاح!');
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden font-sans" dir="rtl">
      {/* الهيدر - تم تحسين التصميم ليتناسب مع الجوال */}
      <div className="fixed top-0 left-0 w-full h-[70px] bg-[#0c0c16] flex items-center justify-around z-[9999] border-b-2 border-red-600 shadow-2xl">
        <button onClick={handleHome} className="text-white flex flex-col items-center">
          <Home size={22} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>
        <button onClick={handleRefresh} className="text-white flex flex-col items-center">
          <RefreshCw size={22} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>
        <button onClick={handleShare} className="text-white flex flex-col items-center">
          <Share2 size={22} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
        <a href={TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center">
          <Send size={22} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">تليجرام</span>
        </a>
      </div>

      {/* منطقة عرض المحتوى */}
      <div className="absolute top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-black overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[145%] border-none"
          style={{ 
            // تم ضبط المحاذاة لأسفل لتناسب تصميم الموقع الجديد
            marginTop: '-260px', 
          }}
          sandbox="allow-forms allow-scripts allow-same-origin allow-presentation"
          allowFullScreen
        />
      </div>
    </div>
  );
}
