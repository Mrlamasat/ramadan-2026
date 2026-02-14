import React from 'react';
import { Home, RefreshCw, Share2 } from 'lucide-react';

interface HeaderProps {
  onHome: () => void;
  onRefresh: () => void;
  onShare: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHome, onRefresh, onShare }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-[65px] bg-[#0c0c16] flex items-center justify-around z-[100] border-b border-red-600/40 shadow-2xl backdrop-blur-md">
      <button onClick={onHome} className="text-gray-300 flex flex-col items-center active:scale-90 transition-all">
        <Home size={18} className="text-red-500" />
        <span className="text-[9px] mt-1 font-bold">الرئيسية</span>
      </button>
      <button onClick={onRefresh} className="text-gray-300 flex flex-col items-center active:scale-90 transition-all">
        <RefreshCw size={18} className="text-green-500" />
        <span className="text-[9px] mt-1 font-bold">تحديث</span>
      </button>
      <button onClick={onShare} className="text-gray-300 flex flex-col items-center active:scale-90 transition-all">
        <Share2 size={18} className="text-purple-500" />
        <span className="text-[9px] mt-1 font-bold">مشاركة</span>
      </button>
    </div>
  );
};

export default Header; // هذا السطر ضروري لنجاح الاستيراد في App.tsx
