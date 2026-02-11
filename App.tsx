import React, { useState, useRef, useCallback, forwardRef, useEffect } from 'react';
import { Home, RefreshCw, Send, Share2 } from 'lucide-react';

const TG_URL = "https://t.me/RamadanSeries26";
const HOME_URL = "https://z.larooza.life/category.php?cat=ramadan-2026";

// --- Header Component ---
interface HeaderProps {
  onHome: () => void;
  onRefresh: () => void;
  onShare: () => void;
  telegramUrl: string;
}

const Header: React.FC<HeaderProps> = ({ onHome, onRefresh, onShare, telegramUrl }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-[75px] header-glass flex items-center justify-around px-4 z-[999999]">
      
      {/* زر الرئيسية */}
      <button 
        onClick={onHome}
        className="prominent-btn flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 text-white w-[75px] h-[55px] rounded-2xl"
      >
        <Home size={22} className="text-[#e94560]" />
        <span className="text-[11px] font-bold mt-1">الرئيسية</span>
      </button>

      {/* زر تحديث */}
      <button 
        onClick={onRefresh}
        className="prominent-btn flex flex-col items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-400 w-[75px] h-[55px] rounded-2xl border-red-500/30"
      >
        <RefreshCw size={22} />
        <span className="text-[11px] font-bold mt-1">تحديث</span>
      </button>

      {/* زر مشاركة */}
      <button 
        onClick={(e) => { e.preventDefault(); onShare(); }}
        className="prominent-btn flex flex-col items-center justify-center bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 w-[75px] h-[55px] rounded-2xl border-purple-500/30"
      >
        <Share2 size={22} />
        <span className="text-[11px] font-bold mt-1">مشاركة</span>
      </button>

      {/* زر تليجرام */}
      <a 
        href={telegramUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="prominent-btn animate-pulse-blue flex flex-col items-center justify-center bg-[#0088cc]/20 hover:bg-[#0088cc]/30 text-[#0088cc] w-[75px] h-[55px] rounded-2xl border-[#0088cc]/30"
      >
        <Send size={22} />
        <span className="text-[11px] font-bold mt-1">تليجرام</span>
      </a>
    </div>
  );
};

// --- Browser Frame Component ---
interface BrowserFrameProps {
  url: string;
}

const BrowserFrame = forwardRef<HTMLIFrameElement, BrowserFrameProps>(({ url }, ref) => {
  // 1. القيمة الافتراضية عند أول تشغيل (جرب -300 لتعرف الفرق)
  const [marginTop, setMarginTop] = useState(-300); 
  const loadCount = useRef(0);

  const handleLoad = () => {
    // 2. القيمة التي يتم تطبيقها بعد تحميل الصفحة (وهي الأهم)
    if (loadCount.current === 0 || url.includes('category.php')) {
      setMarginTop(-300); // اجعلها متطابقة مع القيمة العلوية
    } else {
      setMarginTop(-80); // هذه لصفحة المشاهدة المباشرة، تقليلها يرفع المحتوى لأسفل
    }
    loadCount.current += 1;
  };

  return (
    <div className="absolute top-[75px] left-0 w-full h-[calc(100vh-75px)] overflow-hidden bg-black">
      <iframe
        ref={ref}
        src={url}
        onLoad={handleLoad}
        className="w-full border-none transition-opacity duration-700"
        style={{
          marginTop: `${marginTop}px`,
          // نزيد الارتفاع لتعويض النقص
          height: `calc(100% + ${Math.abs(marginTop)}px + 400px)`, 
        }}
        sandbox="allow-forms allow-scripts allow-same-origin allow-presentation"
        allowFullScreen
      />
    </div>
  );
});
  return (
    <div className="absolute top-[75px] left-0 w-full h-[calc(100vh-75px)] overflow-hidden bg-black">
      <iframe
        ref={ref}
        src={url}
        onLoad={handleLoad}
        className="w-full border-none transition-opacity duration-700"
        style={{
          marginTop: `${marginTop}px`,
          height: `calc(100% + ${Math.abs(marginTop)}px + 300px)`,
        }}
        sandbox="allow-forms allow-scripts allow-same-origin allow-presentation"
        allowFullScreen
      />
    </div>
  );
});

// --- Main App ---
export default function App() {
  const [url, setUrl] = useState(HOME_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleHome = useCallback(() => {
    setUrl(`${HOME_URL}&cache_bust=${Date.now()}`);
  }, []);

  const handleRefresh = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  }, []);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: 'تطبيق مسلسلات رمضان 2026',
      text: 'شاهد مسلسلات رمضان حصرياً وبأعلى جودة عبر هذا التطبيق!',
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('تم نسخ رابط التطبيق بنجاح! شاركه الآن مع أصدقائك.');
      }
    } catch (err) {
      console.log('Sharing failed or cancelled');
    }
  }, []);

  return (
    <div className="relative h-screen w-screen bg-[#05050a] overflow-hidden">
      <Header 
        onHome={handleHome} 
        onRefresh={handleRefresh}
        onShare={handleShare}
        telegramUrl={TG_URL}
      />
      
      <BrowserFrame 
        ref={iframeRef}
        url={url} 
      />
    </div>
  );
}
