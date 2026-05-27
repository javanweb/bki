
import React, { useState, useEffect } from 'react';
import PlayIcon from './icons/PlayIcon';
import CopyIcon from './icons/CopyIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';
import TwitterIcon from './icons/TwitterIcon';
import TelegramIcon from './icons/TelegramIcon';
import CheckIcon from './icons/CheckIcon';
import Header from './Header';

// New Icon for the CTA button
const ChatBubbleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

interface ProductDetailProps {
  product: {
    name: string;
    description: string;
    mainImageUrl: string;
    thumbnails: { type: 'image' | 'video'; url: string }[];
    colors: string[];
    productCode: string;
  };
  onBack: () => void;
  onNavigateToLogin: () => void;
  onNavigateHome: () => void;
  onNavigateToPartnership: () => void;
  onNavigateToAbout: () => void;
  onNavigateToGoals: () => void;
  onNavigateToArticles?: () => void;
  onProductSelect?: (product: any) => void;
  onNavigateToContact?: () => void;
  onNavigateToFAQ?: () => void;
  onNavigateToFeedback?: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onNavigateToLogin, onNavigateHome, onNavigateToPartnership, onNavigateToAbout, onNavigateToGoals, onNavigateToArticles, onProductSelect, onNavigateToContact, onNavigateToFAQ, onNavigateToFeedback }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeImage, setActiveImage] = useState(product.thumbnails[0]?.url || product.mainImageUrl);
  const [activeThumbnail, setActiveThumbnail] = useState(product.thumbnails[0]?.url || product.mainImageUrl);
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [copyStatus, setCopyStatus] = useState('کپی کردن کد');

  const handleCopy = () => {
    navigator.clipboard.writeText(product.productCode);
    setCopyStatus('کد کپی شد!');
    setTimeout(() => setCopyStatus('کپی کردن کد'), 2000);
  };

  const shareButtons = [
    { Icon: WhatsAppIcon, name: 'WhatsApp' },
    { Icon: TelegramIcon, name: 'Telegram' },
    { Icon: TwitterIcon, name: 'Twitter' },
  ];
  
  const specifications = [
      "تولید شده از مواد اولیه پلی پروپیلن گرید بالا",
      "مقاومت بالا در برابر فشار و دمای بالا",
      "دارای استانداردهای ملی و بین‌المللی",
      "مناسب برای سیستم‌های آب سرد و گرم بهداشتی",
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans">
      <div className="relative w-full pb-24">
         <Header 
            onNavigateToLogin={onNavigateToLogin} 
            onNavigateHome={onNavigateHome} 
            onNavigateToPartnership={onNavigateToPartnership}
            onNavigateToAbout={onNavigateToAbout}
            onNavigateToGoals={onNavigateToGoals}
            onNavigateToArticles={onNavigateToArticles}
            onProductSelect={onProductSelect}
            onNavigateToContact={onNavigateToContact}
            onNavigateToFAQ={onNavigateToFAQ}
            onNavigateToFeedback={onNavigateToFeedback}
            variant="light" 
        />
      </div>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand mb-6 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 12H3m4-4l-4 4 4 4" />
            </svg>
            بازگشت به محصولات
        </button>
        <div className="bg-white p-6 sm:p-8 lg:p-12 rounded-2xl shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
            
            {/* Image Gallery */}
            <div className="lg:col-span-2">
              <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border">
                <img src={activeImage || undefined} alt={product.name} className="w-full h-full object-contain p-4" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.thumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() => { setActiveImage(thumb.url); setActiveThumbnail(thumb.url); }}
                    className={`relative aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 transition-all duration-200 ${activeThumbnail === thumb.url ? 'border-brand scale-105 shadow-md' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <img src={thumb.url || undefined} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain p-1" />
                    {thumb.type === 'video' && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group">
                        <div className="bg-white/80 rounded-full p-2 transition-transform group-hover:scale-110">
                           <PlayIcon />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-3 flex flex-col pt-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-poppins">{product.name}</h1>
              <p className="mt-5 text-gray-600 leading-relaxed text-justify text-base">
                {product.description}
              </p>

              <div className="mt-8 pt-6 border-t">
                  <h3 className="text-base font-bold text-gray-800 mb-4">ویژگی‌های کلیدی</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                      {specifications.map((spec, i) => (
                        <li key={i} className="flex items-start">
                            <CheckIcon />
                            <span className="mr-3">{spec}</span>
                        </li>
                      ))}
                  </ul>
              </div>

              <div className="mt-6 pt-6 border-t grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-bold text-gray-800">رنگ / پوشش</h3>
                  <div className="mt-3 flex items-center gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setActiveColor(color)}
                        style={{ backgroundColor: color }}
                        className={`h-9 w-9 rounded-full border-2 transition-all duration-200 ${activeColor === color ? 'border-brand ring-2 ring-brand ring-offset-2 scale-110' : 'border-gray-300 hover:scale-105'}`}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">کد محصول</h3>
                  <div className="mt-3 flex items-stretch">
                    <span className="font-mono text-lg font-semibold bg-gray-100 text-gray-800 px-5 flex items-center rounded-r-lg border border-gray-300">{product.productCode}</span>
                    <button onClick={handleCopy} className="px-4 py-2.5 rounded-l-lg bg-gray-200 hover:bg-gray-300 transition text-gray-700 text-sm font-semibold flex items-center gap-2 border-y border-l border-gray-300">
                      <CopyIcon />
                      <span>{copyStatus}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-800">اشتراک گذاری</h3>
                    <div className="mt-3 flex items-center gap-2">
                      {shareButtons.map(({ Icon, name }) => (
                         <a key={name} href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-brand/10 hover:text-brand transition-colors" aria-label={`Share on ${name}`}>
                            <Icon />
                         </a>
                      ))}
                    </div>
                  </div>
                  <button className="w-full sm:w-auto bg-brand text-white font-bold px-8 py-4 rounded-lg hover:bg-brand-dark transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand flex items-center justify-center gap-3">
                    <ChatBubbleIcon />
                    <span>درخواست استعلام و مشاوره</span>
                  </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
