







import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './dashboard/pages/DashboardOverview';
import ProductCatalog from './dashboard/pages/ProductCatalog';
import ShoppingCart from './dashboard/pages/NewOrder'; // Renamed to ShoppingCart
import MyOrders from './dashboard/pages/MyOrders';
import Reports from './dashboard/pages/MyProjects'; // Renamed to Reports
import Profile from './dashboard/pages/Profile';
import Support from './dashboard/pages/Support';
import ProductDetail from './dashboard/pages/ProductDetail';
import Surveys from './dashboard/pages/Surveys';

export type DashboardPage = 
    | 'dashboard' 
    | 'catalog' 
    | 'cart' 
    | 'my-orders' 
    | 'reports' 
    | 'profile' 
    | 'surveys'
    | 'support';

const Dashboard = ({ 
    onNavigateHome, 
    customer, 
    tickets, 
    setTickets, 
    announcements, 
    setAnnouncements,
    cartItems,
    setCartItems,
    onAddToCart,
    onOrderSubmit,
    onOrderUpdate,
    orderRequests,
    specialOffers,
    salesClosures,
    productDiscounts,
    products,
    marketingSettings,
    surveys,
    surveyResponses,
    setSurveys,
    setSurveyResponses,
    setLoggedInCustomer
}: { 
    onNavigateHome: () => void; 
    customer: any; 
    tickets: any[]; 
    setTickets: React.Dispatch<React.SetStateAction<any[]>>; 
    announcements: any[]; 
    setAnnouncements: React.Dispatch<React.SetStateAction<any[]>>;
    cartItems: any[];
    setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
    onAddToCart: (items: any[]) => void;
    onOrderSubmit: (submittedCart: any[], totalAmount: number, suggestedDate: string, suggestedTime: { from: string, to: string }, shippingAddress: string) => void;
    onOrderUpdate: (orderId: any, updates: any) => void;
    orderRequests: any[];
    specialOffers: any[];
    salesClosures?: any[];
    productDiscounts: any[];
    products: any[];
    marketingSettings: any;
    surveys: any[];
    surveyResponses: any[];
    setSurveys: React.Dispatch<React.SetStateAction<any[]>>;
    setSurveyResponses: React.Dispatch<React.SetStateAction<any[]>>;
    setLoggedInCustomer: React.Dispatch<React.SetStateAction<any | null>>;
}) => {
    const [activePage, setActivePage] = useState<DashboardPage>('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [selectedSurvey, setSelectedSurvey] = useState<any | null>(null);

    const customerOrders = useMemo(() => {
        if (!orderRequests || !customer) return [];
        return orderRequests.filter(req => req.customerName === customer.name);
    }, [orderRequests, customer]);

    const renderActivePage = () => {
        if (selectedProduct) {
            return <ProductDetail 
                product={selectedProduct} 
                onBack={() => {
                    setSelectedProduct(null);
                    setActivePage('catalog');
                }}
                onAddToCart={onAddToCart}
                products={products}
                customer={customer}
                specialOffers={specialOffers}
                productDiscounts={productDiscounts}
            />;
        }

        switch (activePage) {
            case 'dashboard':
                return <DashboardOverview specialOffers={specialOffers} productDiscounts={productDiscounts} customer={customer} customerOrders={customerOrders} marketingSettings={marketingSettings} onNavigate={setActivePage} />;
            case 'catalog':
                return <ProductCatalog 
                            onProductSelect={setSelectedProduct} 
                            customer={customer}
                            productDiscounts={productDiscounts}
                            products={products}
                            specialOffers={specialOffers}
                        />;
            case 'cart':
                return <ShoppingCart 
                            customer={customer}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                            onOrderSubmit={onOrderSubmit}
                            productDiscounts={productDiscounts}
                            salesClosures={salesClosures}
                            specialOffers={specialOffers}
                        />;
            case 'my-orders':
                return <MyOrders orders={customerOrders} onOrderUpdate={onOrderUpdate} />;
            case 'reports':
                return <Reports orders={customerOrders} />;
            case 'profile':
                return <Profile customer={customer} />;
            case 'surveys':
                return <Surveys 
                    surveys={surveys} 
                    surveyResponses={surveyResponses} 
                    setSurveyResponses={setSurveyResponses} 
                    customer={customer} 
                    setCustomer={setLoggedInCustomer}
                    selectedSurvey={selectedSurvey}
                    setSelectedSurvey={setSelectedSurvey}
                    onSectionChange={setActivePage} 
                />;

            case 'support':
                return <Support tickets={tickets.filter(t => t.customerId === customer.id)} setTickets={setTickets} customer={customer} />;
            default:
                return <DashboardOverview specialOffers={specialOffers} productDiscounts={productDiscounts} customer={customer} customerOrders={customerOrders} marketingSettings={marketingSettings} onNavigate={setActivePage} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50/50 text-slate-900 font-poppins selection:bg-blue-100 selection:text-blue-900" dir="rtl">
            {(!selectedSurvey) && (
                <DashboardSidebar 
                    activePage={activePage} 
                    onNavigate={(page) => {
                        setSelectedProduct(null);
                        setActivePage(page);
                    }}
                    isOpen={isSidebarOpen}
                    setIsOpen={setSidebarOpen}
                    customer={customer}
                />
            )}
            <div className="flex-1 flex flex-col min-w-0">
                {(!selectedSurvey) && (
                    <DashboardHeader 
                        onToggleMobileSidebar={() => setSidebarOpen(!isSidebarOpen)}
                        customer={customer}
                        announcements={announcements}
                        setAnnouncements={setAnnouncements}
                        cartItems={cartItems}
                        onNavigateHome={onNavigateHome}
                    />
                )}
                <main className={`p-4 md:p-8 flex-1 overflow-y-auto custom-scrollbar ${selectedSurvey ? 'flex items-center justify-center p-0' : ''}`}>
                    <motion.div
                        key={selectedProduct ? `product-${selectedProduct.id}` : activePage}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={selectedSurvey ? 'w-full h-full' : ''}
                    >
                        {renderActivePage()}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;