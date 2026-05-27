
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import IndustrialSolutions from './components/IndustrialSolutions';
import Products from './components/Products';
import Strengths from './components/Strengths';
import Industries from './components/Industries';
import ContactActions from './components/ContactActions';
import Footer from './components/Footer';
import Partnership from './components/Partnership';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import PartnershipRequest from './components/PartnershipRequest';
import AboutUs from './components/AboutUs';
import OurGoals from './components/OurGoals';
import ContactUs from './components/ContactUs';
import FAQ from './components/FAQ';
import Feedback from './components/Feedback';
import { initialCustomers, initialTickets, initialAnnouncements, initialOrderRequests, initialSpecialOffers, allProducts, initialSurveys, initialSurveyResponses } from './data/initialData';
import ProductDetail from './components/ProductDetail';
import PolymerFittings from './components/PolymerFittings';
import StoreLocator from './components/StoreLocator';

import Articles from './components/Articles';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'login' | 'dashboard' | 'admin_dashboard' | 'product_detail' | 'polymer_fittings' | 'partnership_request' | 'about' | 'goals' | 'articles' | 'contact' | 'faq' | 'feedback' | 'store_locator'>('home');
  const [previousView, setPreviousView] = useState<'home' | 'polymer_fittings'>('home');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [customers, setCustomers] = useState(initialCustomers);
  const [tickets, setTickets] = useState(initialTickets);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [orderRequests, setOrderRequests] = useState(initialOrderRequests);
  const [specialOffers, setSpecialOffers] = useState(initialSpecialOffers);
  const [salesClosures, setSalesClosures] = useState<any[]>([]);
  const [partnershipRequests, setPartnershipRequests] = useState<any[]>([]);
  const [productDiscounts, setProductDiscounts] = useState<any[]>([]);
  const [products, setProducts] = useState(allProducts);
  const [surveys, setSurveys] = useState(initialSurveys);
  const [surveyResponses, setSurveyResponses] = useState(initialSurveyResponses);
  const [loggedInCustomer, setLoggedInCustomer] = useState<any | null>(null);
  const [scrollToProducts, setScrollToProducts] = useState(false);
  const [storeLocatorSelection, setStoreLocatorSelection] = useState<{country?: string, city?: string} | null>(null);
  const [marketingSettings, setMarketingSettings] = useState({
      pointsPerMillion: 10,
      referralPoints: 100,
      basePoints: 50,
      referralDiscountPercent: 10,
      bronzeThreshold: 0,
      silverThreshold: 1000,
      goldThreshold: 3000,
      platinumThreshold: 10000,
      volumeDiscountLevel1Amount: 500000000, // 500 million
      volumeDiscountLevel1Percent: 2,
      volumeDiscountLevel2Amount: 1000000000, // 1 billion
      volumeDiscountLevel2Percent: 5,
      volumeDiscountLevel3Amount: 3000000000, // 3 billion
      volumeDiscountLevel3Percent: 10,
  });


  const navigate = (targetView: 'home' | 'login' | 'dashboard' | 'admin_dashboard' | 'partnership_request' | 'about' | 'goals' | 'articles' | 'contact' | 'faq' | 'feedback') => {
    setView(targetView);
  };

  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          const target = e.target as HTMLInputElement;
          if (target && target.tagName === 'INPUT') {
              const numericNames = [
                  'nationalId', 'accountNumber', 'experience', 'discount', 
                  'basePoints', 'pointsPerMillion', 'referralPoints', 
                  'referralDiscountPercent', 'bronzeThreshold', 'silverThreshold', 
                  'goldThreshold', 'platinumThreshold', 'annualPurchase',
                  'mobile', 'landline'
              ];
              const isNumericName = numericNames.includes(target.name) || 
                                    target.name.includes('Amount') || 
                                    target.name.includes('Percent');
              
              if (target.type === 'number' || target.type === 'tel' || isNumericName) {
                  // Allow special keys: Backspace, Tab, Enter, Escape, Delete, Arrows
                  const allowedKeys = ['Backspace', 'Tab', 'Enter', 'Escape', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
                  if (allowedKeys.includes(e.key) || (e.ctrlKey || e.metaKey)) {
                      return;
                  }
                  
                  const isDigit = /^[0-9۰-۹٠-٩]$/.test(e.key);
                  if (!isDigit) {
                      e.preventDefault();
                  }
              }
          }
      };

      const handlePaste = (e: ClipboardEvent) => {
          const target = e.target as HTMLInputElement;
          if (target && target.tagName === 'INPUT') {
              const numericNames = [
                  'nationalId', 'accountNumber', 'experience', 'discount', 
                  'basePoints', 'pointsPerMillion', 'referralPoints', 
                  'referralDiscountPercent', 'bronzeThreshold', 'silverThreshold', 
                  'goldThreshold', 'platinumThreshold', 'annualPurchase',
                  'mobile', 'landline'
              ];
              const isNumericName = numericNames.includes(target.name) || 
                                    target.name.includes('Amount') || 
                                    target.name.includes('Percent');
              
              if (target.type === 'number' || target.type === 'tel' || isNumericName) {
                  const pasteData = e.clipboardData?.getData('text') || '';
                  if (/[^0-9۰-۹٠-٩]/.test(pasteData)) {
                       e.preventDefault();
                       // Try to extract only numbers for better UX
                       const cleanData = pasteData.replace(/[^0-9۰-۹٠-٩]/g, '');
                       if (cleanData) {
                           document.execCommand('insertText', false, cleanData);
                       }
                  }
              }
          }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('paste', handlePaste);
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('paste', handlePaste);
      };
  }, []);

  useEffect(() => {
      if (view === 'home' && scrollToProducts) {
          setTimeout(() => {
              const section = document.getElementById('products-section');
              if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
              }
          }, 100);
          setScrollToProducts(false);
      }
  }, [view, scrollToProducts]);
  
  const handleAddToCart = (itemsToAdd: { product: any, quantity: number, packages: number, cartons: number }[]) => {
    setCartItems(prevItems => {
        const updatedItems = [...prevItems];
        itemsToAdd.forEach(({ product, quantity, packages, cartons }) => {
            if (quantity > 0) {
                const existingItemIndex = updatedItems.findIndex(item => item.code === product.code);
                if (existingItemIndex > -1) {
                    updatedItems[existingItemIndex].quantity += quantity;
                    updatedItems[existingItemIndex].packages = (updatedItems[existingItemIndex].packages || 0) + packages;
                    updatedItems[existingItemIndex].cartons = (updatedItems[existingItemIndex].cartons || 0) + cartons;
                } else {
                    updatedItems.push({ ...product, quantity, packages, cartons, id: product.code });
                }
            }
        });
        return updatedItems;
    });
  };

  const handleOrderSubmit = (submittedCart: any[], totalAmount: number, suggestedDate: string, suggestedTime: { from: string, to: string }, shippingAddress: string) => {
    if (!loggedInCustomer) return;

    const bkiOrders = orderRequests.filter(req => req.id.startsWith('BKI-'));
    let nextIdNumber = 1001;
    if (bkiOrders.length > 0) {
        const maxId = Math.max(...bkiOrders.map(req => parseInt(req.id.split('-')[1], 10)));
        nextIdNumber = maxId + 1;
    }

    const newRequest = {
        id: `BKI-${nextIdNumber}`,
        customerName: loggedInCustomer.name,
        company: loggedInCustomer.company,
        address: shippingAddress,
        date: new Date().toLocaleDateString('fa-IR'),
        dispatchDate: null,
        total: `${totalAmount.toLocaleString('fa-IR')} ریال`,
        totalAmount: totalAmount,
        discountApplied: loggedInCustomer.discount || 0,
        status: 'در انتظار تایید',
        suggestedDate: suggestedDate,
        suggestedTime: suggestedTime,
        dateModified: false,
        products: submittedCart.map(item => ({
            code: item.code,
            name: item.name,
            imageUrl: item.imageUrl,
            packages: item.packages,
            cartons: item.cartons,
            totalUnits: item.quantity,
            unitPrice: item.displayPrice,
            lineTotal: item.displayPrice * item.quantity,
            specialOffer: item.specialOffer
        })),
    };

    setOrderRequests(prev => [newRequest, ...prev]);
    setCartItems([]);
  };

  const handleOrderUpdate = (orderId: any, updates: any) => {
    setOrderRequests(prevRequests =>
        prevRequests.map(req =>
            req.id === orderId
                ? { ...req, ...updates, dateModified: true }
                : req
        )
    );
  };
  
  const handleApproveRequest = (requestId: any) => {
    setOrderRequests(prevRequests => 
        prevRequests.map(req => 
            req.id === requestId ? { ...req, status: 'تایید شده', dispatchDate: new Date().toLocaleDateString('fa-IR'), dateModified: false } : req
        )
    );
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomers(prevCustomers =>
      prevCustomers.map(c => (c.id === updatedCustomer.id ? updatedCustomer : c))
    );
  };

  const handleLogin = (username, password) => {
    const customer = customers.find(c => c.username === username && c.password === password);
    if (customer) {
        setLoggedInCustomer(customer);
        setView('dashboard');
        return true;
    }
    return false;
  };

  const handleProductSelect = (product: any) => {
    if (product.title === 'اتصالات پلیمری') {
        setView('polymer_fittings');
        return;
    }

    setPreviousView('home');
    let detailedProduct;

    switch (product.title) {
        case 'لوله تک لایه پلیمری':
            detailedProduct = {
                name: 'لوله تک لایه پلیمری PPR',
                description: 'لوله‌های پلی‌پروپیلن (PPR) تک لایه، راهکاری مطمئن و بهداشتی برای سیستم‌های آبرسانی سرد و گرم و سیستم‌های گرمایشی هستند. این لوله‌ها به دلیل مقاومت بالا در برابر خوردگی، رسوب‌گیری و مواد شیمیایی، جایگزینی عالی برای لوله‌های فلزی محسوب می‌شوند. سطح داخلی صاف و صیقلی آن‌ها افت فشار را به حداقل می‌رساند و از رشد باکتری جلوگیری می‌کند. نصب آسان و سریع با استفاده از اتصالات جوشی فیوژن، آب‌بندی کامل را تضمین می‌کند.',
                mainImageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/02/taklayeh.jpg',
                thumbnails: [
                    { type: 'image', url: 'https://kavirbaspar.com/wp-content/uploads/2022/02/taklayeh.jpg' },
                    { type: 'image', url: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800' },
                    { type: 'image', url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800' },
                ],
                colors: ['#FFFFFF', '#34A853'],
                productCode: 'PPR-100',
            };
            break;
        case 'لوله سه لایه فایبرگلاس':
            detailedProduct = {
                name: 'لوله سه لایه فایبرگلاس PPR-FR-PPR',
                description: 'لوله‌های سه لایه کامپوزیت فایبرگلاس، نسل جدیدی از لوله‌های پلیمری هستند که با تقویت‌کننده الیاف شیشه در لایه میانی تولید می‌شوند. این ساختار باعث کاهش ضریب انبساط طولی لوله شده و مقاومت آن را در برابر فشار و دمای بالا افزایش می‌دهد. عدم نیاز به تراشیدن لایه هنگام جوشکاری، سرعت و سهولت نصب را به مراتب بالاتر می‌برد. ایده‌آل برای سیستم‌های گرمایشی و سرمایشی و رایزرها.',
                mainImageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/02/3layeh.jpg',
                thumbnails: [
                    { type: 'image', url: 'https://kavirbaspar.com/wp-content/uploads/2022/02/3layeh.jpg' },
                    { type: 'image', url: 'https://images.unsplash.com/photo-1532593198780-3c2048675812?q=80&w=800' },
                    { type: 'image', url: 'https://images.unsplash.com/photo-1605118732641-3495e23b771d?q=80&w=800' },
                ],
                colors: ['#34A853', '#FFFFFF'],
                productCode: 'FG-300',
            };
            break;
        case 'لوله تک لایه حلقه ای':
            detailedProduct = {
                name: 'لوله تک لایه پلیمری حلقه‌ای (رولی)',
                description: 'لوله‌های تک لایه پلیمری به صورت رولی (حلقه‌ای) برای سهولت در حمل و نقل و کاهش ضایعات و اتصالات در مسیرهای طولانی عرضه می‌شوند. این لوله‌ها تمام ویژگی‌های لوله‌های شاخه‌ای PPR را دارا بوده و برای سیستم‌های گرمایش از کف و آبرسانی در متراژهای بالا بسیار مناسب هستند. انعطاف‌پذیری مناسب و نصب سریع از ویژگی‌های بارز این محصول است که هزینه‌های اجرا را کاهش می‌دهد.',
                mainImageUrl: 'https://images.unsplash.com/photo-1632766391910-3a363771b315?q=80&w=800&auto=format&fit=crop',
                thumbnails: [
                    { type: 'image', url: 'https://images.unsplash.com/photo-1632766391910-3a363771b315?q=80&w=800' },
                    { type: 'image', url: 'https://images.unsplash.com/photo-1517646287309-9f76dd6f4ba9?q=80&w=800' },
                    { type: 'image', url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a78e?q=80&w=800' },
                ],
                colors: ['#FFFFFF'],
                productCode: 'PPR-COIL-100',
            };
            break;
        case 'لوله سه لایه فایبرگلاس حلقه ای':
            detailedProduct = {
                name: 'لوله سه لایه فایبرگلاس حلقه‌ای',
                description: 'ترکیب فناوری فایبرگلاس با مزیت لوله‌های رولی. این محصول مقاومت مکانیکی و حرارتی لوله‌های سه لایه را با سهولت نصب لوله‌های رولی ترکیب می‌کند. کاهش اتصالات در طول مسیر، ریسک نشتی را کاهش داده و سرعت اجرای پروژه را بالا می‌برد. مناسب برای رایزرها و سیستم‌های توزیع آب گرم با طول زیاد که نیاز به مقاومت حرارتی بالاتر و انبساط طولی کمتر دارند.',
                mainImageUrl: 'https://images.unsplash.com/photo-1599494193939-556b2789445c?q=80&w=800&auto=format&fit=crop',
                thumbnails: [
                    { type: 'image', url: 'https://images.unsplash.com/photo-1599494193939-556b2789445c?q=80&w=800' },
                    { type: 'image', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800' },
                    { type: 'image', url: 'https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=800' },
                ],
                colors: ['#34A853'],
                productCode: 'FG-COIL-300',
            };
            break;
        default:
            detailedProduct = {
                name: product.title,
                description: 'توضیحات محصول انتخاب شده...',
                mainImageUrl: product.imageUrl || 'https://via.placeholder.com/400',
                thumbnails: [
                    { type: 'image', url: product.imageUrl || 'https://via.placeholder.com/400' },
                    { type: 'image', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800' },
                    { type: 'image', url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800' },
                ],
                colors: ['#FFFFFF', '#34A853'],
                productCode: 'UNKNOWN',
            };
    }

    setSelectedProduct(detailedProduct);
    setView('product_detail');
  };

  if (view === 'login') {
    return <Login onLogin={handleLogin} onNavigateHome={() => setView('home')} />;
  }

  if (view === 'dashboard' && loggedInCustomer) {
    return <Dashboard 
      onNavigateHome={() => {
        setLoggedInCustomer(null);
        navigate('home');
      }}
      customer={loggedInCustomer}
      tickets={tickets}
      setTickets={setTickets}
      announcements={announcements}
      setAnnouncements={setAnnouncements}
      cartItems={cartItems}
      setCartItems={setCartItems}
      onAddToCart={handleAddToCart}
      onOrderSubmit={handleOrderSubmit}
      onOrderUpdate={handleOrderUpdate}
      orderRequests={orderRequests}
      specialOffers={specialOffers}
      salesClosures={salesClosures}
      productDiscounts={productDiscounts}
      products={products}
      marketingSettings={marketingSettings}
      surveys={surveys}
      surveyResponses={surveyResponses}
      setSurveys={setSurveys}
      setSurveyResponses={setSurveyResponses}
      setLoggedInCustomer={setLoggedInCustomer}
    />;
  }

  if (view === 'admin_dashboard') {
    return <AdminDashboard 
      onNavigateHome={() => navigate('home')}
      customers={customers}
      setCustomers={setCustomers}
      onUpdateCustomer={handleUpdateCustomer}
      tickets={tickets}
      setTickets={setTickets}
      announcements={announcements}
      setAnnouncements={setAnnouncements}
      orderRequests={orderRequests}
      setOrderRequests={setOrderRequests}
      onApproveRequest={handleApproveRequest}
      partnershipRequests={partnershipRequests}
      specialOffers={specialOffers}
      setSpecialOffers={setSpecialOffers}
      salesClosures={salesClosures}
      setSalesClosures={setSalesClosures}
      productDiscounts={productDiscounts}
      setProductDiscounts={setProductDiscounts}
      products={products}
      setProducts={setProducts}
      marketingSettings={marketingSettings}
      setMarketingSettings={setMarketingSettings}
      surveys={surveys}
      setSurveys={setSurveys}
      surveyResponses={surveyResponses}
      setSurveyResponses={setSurveyResponses}
    />;
  }

  if (view === 'product_detail' && selectedProduct) {
    return <ProductDetail 
        product={selectedProduct} 
        onBack={() => { 
            if (previousView === 'polymer_fittings') {
                setView('polymer_fittings');
            } else {
                setView('home');
                setScrollToProducts(true);
            }
            setSelectedProduct(null); 
        }}
        onNavigateToLogin={() => {
            setLoggedInCustomer(null);
            navigate('login');
        }}
        onNavigateHome={() => setView('home')}
        onNavigateToPartnership={() => setView('partnership_request')}
        onNavigateToAbout={() => setView('about')}
        onNavigateToGoals={() => setView('goals')}
        onNavigateToArticles={() => setView('articles')}
        onNavigateToContact={() => setView('contact')}
        onNavigateToFAQ={() => setView('faq')}
        onNavigateToFeedback={() => setView('feedback')}
        onProductSelect={handleProductSelect}
    />;
  }

  if (view === 'goals') {
    return <OurGoals 
      onNavigateHome={() => setView('home')} 
      onNavigateToLogin={() => setView('login')} 
      onNavigateToPartnership={() => setView('partnership_request')}
      onNavigateToAbout={() => setView('about')}
      onNavigateToGoals={() => setView('goals')}
      onNavigateToArticles={() => setView('articles')}
      onNavigateToContact={() => setView('contact')}
      onNavigateToFAQ={() => setView('faq')}
      onNavigateToFeedback={() => setView('feedback')}
      onProductSelect={handleProductSelect}
    />;
  }

  if (view === 'polymer_fittings') {
      return <PolymerFittings 
        onBack={() => setView('home')} 
        onNavigateHome={() => setView('home')}
        onNavigateToLogin={() => {
          setLoggedInCustomer(null);
          navigate('login');
        }}
        onNavigateToAdminDashboard={() => navigate('admin_dashboard')} 
        onProductSelect={(product) => {
            setPreviousView('polymer_fittings');
            setSelectedProduct(product);
            setView('product_detail');
        }}
        onNavigateToPartnership={() => setView('partnership_request')}
        onNavigateToAbout={() => setView('about')}
        onNavigateToGoals={() => setView('goals')}
        onNavigateToArticles={() => setView('articles')}
        onNavigateToContact={() => setView('contact')}
        onNavigateToFAQ={() => setView('faq')}
        onNavigateToFeedback={() => setView('feedback')}
      />;
  }

  if (view === 'partnership_request') {
    return <PartnershipRequest 
      onBack={() => setView('home')} 
      onNavigateHome={() => setView('home')} 
      onNavigateToLogin={() => { setLoggedInCustomer(null); setView('login'); }} 
      onNavigateToAbout={() => setView('about')}
      onNavigateToPartnership={() => setView('partnership_request')}
      onNavigateToGoals={() => setView('goals')}
      onNavigateToArticles={() => setView('articles')}
      onNavigateToContact={() => setView('contact')}
      onNavigateToFAQ={() => setView('faq')}
      onNavigateToFeedback={() => setView('feedback')}
      onProductSelect={handleProductSelect}
      onSubmitRequest={(data) => setPartnershipRequests(prev => [data, ...prev])}
    />;
  }

  if (view === 'about') {
    return <AboutUs 
      onNavigateHome={() => setView('home')} 
      onNavigateToLogin={() => setView('login')} 
      onNavigateToPartnership={() => setView('partnership_request')}
      onNavigateToAbout={() => setView('about')}
      onNavigateToGoals={() => setView('goals')}
      onNavigateToArticles={() => setView('articles')}
      onNavigateToContact={() => setView('contact')}
      onNavigateToFAQ={() => setView('faq')}
      onNavigateToFeedback={() => setView('feedback')}
      onProductSelect={handleProductSelect}
    />;
  }

  if (view === 'articles') {
    return <Articles
      onNavigateHome={() => setView('home')}
      onNavigateToLogin={() => setView('login')}
      onNavigateToPartnership={() => setView('partnership_request')}
      onNavigateToAbout={() => setView('about')}
      onNavigateToGoals={() => setView('goals')}
      onNavigateToArticles={() => setView('articles')}
      onNavigateToContact={() => setView('contact')}
      onNavigateToFAQ={() => setView('faq')}
      onNavigateToFeedback={() => setView('feedback')}
      onNavigateToAdminDashboard={() => navigate('admin_dashboard')}
      onProductSelect={handleProductSelect}
    />;
  }

  if (view === 'contact') {
    return <ContactUs 
      onNavigateHome={() => setView('home')}
      onNavigateToLogin={() => setView('login')}
      onNavigateToPartnership={() => setView('partnership_request')}
      onNavigateToAbout={() => setView('about')}
      onNavigateToGoals={() => setView('goals')}
      onNavigateToArticles={() => setView('articles')}
      onNavigateToContact={() => setView('contact')}
      onNavigateToFAQ={() => setView('faq')}
      onNavigateToFeedback={() => setView('feedback')}
      onNavigateToAdminDashboard={() => navigate('admin_dashboard')}
      onProductSelect={handleProductSelect}
    />;
  }

  if (view === 'feedback') {
    return <Feedback 
      onNavigateHome={() => setView('home')}
      onNavigateToLogin={() => setView('login')}
      onNavigateToPartnership={() => setView('partnership_request')}
      onNavigateToAbout={() => setView('about')}
      onNavigateToGoals={() => setView('goals')}
      onNavigateToArticles={() => setView('articles')}
      onNavigateToContact={() => setView('contact')}
      onNavigateToFAQ={() => setView('faq')}
      onNavigateToFeedback={() => setView('feedback')}
      onProductSelect={handleProductSelect}
      onNavigateToAdminDashboard={() => navigate('admin_dashboard')}
    />;
  }

  if (view === 'faq') {
    return <FAQ 
      onNavigateHome={() => setView('home')}
      onNavigateToLogin={() => setView('login')}
      onNavigateToPartnership={() => setView('partnership_request')}
      onNavigateToAbout={() => setView('about')}
      onNavigateToGoals={() => setView('goals')}
      onNavigateToArticles={() => setView('articles')}
      onNavigateToContact={() => setView('contact')}
      onNavigateToFAQ={() => setView('faq')}
      onNavigateToFeedback={() => setView('feedback')}
      onProductSelect={handleProductSelect}
    />;
  }

  if (view === 'store_locator') {
      return <StoreLocator 
        initialSelection={storeLocatorSelection}
        onNavigateHome={() => setView('home')}
        onNavigateToLogin={() => setView('login')}
        onNavigateToPartnership={() => setView('partnership_request')}
        onNavigateToAbout={() => setView('about')}
        onNavigateToGoals={() => setView('goals')}
        onNavigateToArticles={() => setView('articles')}
        onNavigateToContact={() => setView('contact')}
        onNavigateToFAQ={() => setView('faq')}
        onNavigateToFeedback={() => setView('feedback')}
        onProductSelect={handleProductSelect}
        onNavigateToAdminDashboard={() => navigate('admin_dashboard')}
      />;
  }

  return (
    <div className="bg-gray-50 font-sans">
      <div className="relative w-full h-screen text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2400&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col">
          <Header 
            onNavigateToLogin={() => {
                setLoggedInCustomer(null);
                navigate('login');
            }}
            onNavigateHome={() => setView('home')}
            onNavigateToPartnership={() => setView('partnership_request')}
            onNavigateToAbout={() => setView('about')}
            onNavigateToGoals={() => setView('goals')}
            onNavigateToArticles={() => setView('articles')}
            onNavigateToContact={() => setView('contact')}
            onNavigateToFAQ={() => setView('faq')}
            onNavigateToFeedback={() => setView('feedback')}
            onProductSelect={handleProductSelect}
          />
          <main className="flex-grow">
            <Hero />
          </main>
        </div>
      </div>
      <IndustrialSolutions />
      <Products onProductSelect={handleProductSelect} />
      <Strengths />
      <Partnership />
      <Industries />
      <ContactActions 
          onNavigateToPartnership={() => setView('partnership_request')}
          onNavigateToStoreLocator={(country, city) => {
              setStoreLocatorSelection({country, city});
              setView('store_locator');
          }}
      />
      <Footer onNavigateToAdminDashboard={() => navigate('admin_dashboard')} />
    </div>
  );
};

export default App;
