import React, { useState, useRef, useCallback, forwardRef } from 'react';
import { Home, RefreshCw, Send, Share2 } from 'lucide-react';

const TG_URL = "https://t.me/RamadanSeries26";
const HOME_URL = "https://v.larooza.life/category.php?cat=ramadan-2026";

export default function App() {
  const [url, setUrl] = useState(HOME_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: 'مسلسلات رمضان', url: window.location.href });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ الرابط');
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* الشريط العلوي */}
      <div className="fixed top-0 left-0 w-full h-[70px] bg-[#0a0a14] flex items-center justify-around z-[9999] border-b border-red-500/30">
        <button onClick={() => setUrl(`${HOME_URL}&t=${Date.now()}`)} className="text-white flex flex-col items-center"><Home size={20}/><span className="text-[10px]">الرئيسية</span></button>
        <button onClick={handleRefresh} className="text-red-400 flex flex-col items-center"><RefreshCw size={20}/><span className="text-[10px]">تحديث</span></button>
        <button onClick={handleShare} className="text-purple-400 flex flex-col items-center"><Share2 size={20}/><span className="text-[10px]">مشاركة</span></button>
        <a href={TG_URL} target="_blank" className="text-blue-400 flex flex-col items-center"><Send size={20}/><span className="text-[10px]">تليجرام</span></a>
      </div>

      {/* حاوية الموقع */}
      <div className="absolute top-[70px] left-0 w-full h-[calc(100vh-70px)] overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-[150%] border-none"
          style={{ marginTop: '-250px' }} // هذا السطر هو المسؤول عن المحاذاة
          sandbox="allow-forms allow-scripts allow-same-origin allow-presentation"
          allowFullScreen
        />
      </div>
    </div>
  );
}
