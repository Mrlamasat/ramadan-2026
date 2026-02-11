import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Home, RefreshCw, Send, Share2 } from 'lucide-react';

const TG_URL = "https://t.me/RamadanSeries26";
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // تحديث الصفحة الحالية
  const handleRefresh = useCallback(() => {
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = "about:blank"; // تفريغ الذاكرة
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = currentSrc;
      }, 50);
    }
  }, []);

  // العودة للرئيسية مع كسر الكاش
  const handleHome = useCallback(() => {
    setUrl(`${BASE_URL}&v=${Date.now()}`);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-[#050505] overflow-hidden font-sans" dir="rtl">
      
      {/* هيدر التطبيق الاحترافي */}
      <div className="fixed top-0 left-0 w-full h-[70px] bg-[#0c0c16] flex items-center justify-around z-[999999] border-b border-red-600/50 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
        <button onClick={handleHome} className="text-gray-300 hover:text-white flex flex-col items-center transition-all">
          <Home size={22} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>

        <button onClick={handleRefresh} className="text-gray-300 hover:text-white flex flex-col items-center transition-all">
          <RefreshCw size={22} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>

        <button 
          onClick={() => navigator.share({ url: window.location.href })} 
          className="text-gray-300 hover:text-white flex flex-col items-center transition-all"
        >
          <Share2 size={22} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>

        <a href={TG_URL} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white flex flex-col items-center transition-all">
          <Send size={22} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">تليجرام</span>
        </a>
      </div>

      {/* منطقة العرض الرئيسية */}
      <div className="absolute top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-black">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[155%] border-none"
          style={{ 
            marginTop: '-275px', // لإخفاء هيدر الموقع الأصلي
          }}
          /* السر هنا: 
             إزالة الـ Sandbox تماماً هو الحل الوحيد للمشغلات الذكية.
             إضافة referrerpolicy="no-referrer" تمنع المشغل من معرفة أنه داخل تطبيقك.
          */
          referrerPolicy="no-referrer"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
          allowFullScreen
        />
      </div>

      {/* طبقة حماية لمنع الخروج من التطبيق عند النقر على إعلانات معينة */}
      <style dangerouslySetInnerHTML={{ __html: `
        iframe {
          pointer-events: auto !important;
        }
      `}} />
    </div>
  );
}
