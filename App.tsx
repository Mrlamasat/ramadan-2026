import React, { useState, useRef, useCallback } from 'react';
import { Home, RefreshCw, Send, Share2 } from 'lucide-react';

const TG_URL = "https://t.me/RamadanSeries26";
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // وظيفة تحديث الصفحة
  const handleRefresh = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  }, []);

  // وظيفة العودة للرئيسية
  const handleHome = useCallback(() => {
    setUrl(`${BASE_URL}&update=${Date.now()}`);
  }, []);

  // وظيفة المشاركة
  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'تطبيق مسلسلات رمضان 2026',
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('تم نسخ رابط التطبيق بنجاح!');
      }
    } catch (err) {
      console.log('Share failed');
    }
  }, []);

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden font-sans" dir="rtl">
      
      {/* --- الهيدر العلوي --- */}
      <div className="fixed top-0 left-0 w-full h-[70px] bg-[#0c0c16] flex items-center justify-around z-[9999] border-b-2 border-red-600 shadow-2xl">
        
        {/* زر الرئيسية */}
        <button 
          onClick={handleHome} 
          className="text-white flex flex-col items-center active:scale-90 transition-transform"
        >
          <Home size={22} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>

        {/* زر تحديث */}
        <button 
          onClick={handleRefresh} 
          className="text-white flex flex-col items-center active:scale-90 transition-transform"
        >
          <RefreshCw size={22} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>

        {/* زر مشاركة */}
        <button 
          onClick={handleShare} 
          className="text-white flex flex-col items-center active:scale-90 transition-transform"
        >
          <Share2 size={22} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>

        {/* زر تليجرام */}
        <a 
          href={TG_URL} 
          target="_blank" 
          rel="noreferrer" 
          className="text-white flex flex-col items-center active:scale-90 transition-transform"
        >
          <Send size={22} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">تليجرام</span>
        </a>
      </div>

      {/* --- منطقة عرض الموقع --- */}
      <div className="absolute top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-black overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[155%] border-none"
          style={{ 
            marginTop: '-275px', // محاذاة الصفحة لأسفل لإخفاء القوائم الأصلية
          }}
          // تم إزالة sandbox لضمان عمل جميع مشغلات الفيديو دون قيود
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
        />
      </div>

    </div>
  );
}
