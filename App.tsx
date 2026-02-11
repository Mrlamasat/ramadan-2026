import React, { useState, useRef, useCallback } from 'react';
import { Home, RefreshCw, Send, Share2 } from 'lucide-react';

const TG_URL = "https://t.me/RamadanSeries26";
// الرابط الجديد الذي زودتني به
const BASE_URL = "https://laroza.bond/category.php?cat=ramadan-2026";

export default function App() {
  const [url, setUrl] = useState(BASE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) {
      // تحديث الصفحة الحالية مهما كان الرابط الذي وصل إليه المستخدم
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleHome = () => {
    // العودة للرابط الأساسي مع كسر الكاش
    setUrl(`${BASE_URL}&v=${Date.now()}`);
  };

  const handleShare = async () => {
    try {
      const shareUrl = window.location.href;
      if (navigator.share) {
        await navigator.share({ title: 'مسلسلات رمضان 2026', url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('تم نسخ رابط التطبيق!');
      }
    } catch (err) {
      console.log("Share failed");
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden font-sans" dir="rtl">
      {/* شريط الأدوات العلوي */}
      <div className="fixed top-0 left-0 w-full h-[70px] bg-[#0c0c16] flex items-center justify-around z-[9999] border-b-2 border-red-600 shadow-2xl">
        <button onClick={handleHome} className="text-white flex flex-col items-center hover:opacity-80 transition-all">
          <Home size={22} className="text-red-500" />
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>
        <button onClick={handleRefresh} className="text-white flex flex-col items-center hover:opacity-80 transition-all">
          <RefreshCw size={22} className="text-green-500" />
          <span className="text-[10px] mt-1 font-bold">تحديث</span>
        </button>
        <button onClick={handleShare} className="text-white flex flex-col items-center hover:opacity-80 transition-all">
          <Share2 size={22} className="text-purple-500" />
          <span className="text-[10px] mt-1 font-bold">مشاركة</span>
        </button>
        <a href={TG_URL} target="_blank" rel="noreferrer" className="text-white flex flex-col items-center hover:opacity-80 transition-all">
          <Send size={22} className="text-blue-400" />
          <span className="text-[10px] mt-1 font-bold">تليجرام</span>
        </a>
      </div>

      {/* منطقة عرض المحتوى (Iframe) */}
      <div className="absolute top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-black overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[155%] border-none"
          style={{ 
            // الإزاحة المثالية لإخفاء هيدر لاروزا الجديد
            marginTop: '-275px', 
          }}
          // يسمح للموقع بالتحويل التلقائي والعمل بشكل كامل
          sandbox="allow-forms allow-scripts allow-same-origin allow-presentation allow-top-navigation-by-user-activation"
          allowFullScreen
        />
      </div>
    </div>
  );
}
