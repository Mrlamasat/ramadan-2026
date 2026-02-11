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
