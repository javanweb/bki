import React, { useState } from 'react';
import AdminDashboardSidebar from './AdminDashboardSidebar';
import AdminDashboardHeader from './AdminDashboardHeader';
import CustomerManagement from './admin/pages/CustomerManagement';
import CustomerDetail from './admin/pages/CustomerDetail';
import AddCustomerPage from './admin/pages/AddCustomerPage';
import OrderRequests from './admin/pages/OrderRequests';
import SupportTickets from './admin/pages/SupportTickets';
import TicketDetail from './admin/pages/TicketDetail';
import Announcements from './admin/pages/Announcements';
import Settings from './admin/pages/Settings';
import SpecialOffers from './admin/pages/SpecialOffers';
import ProductDiscounts from './admin/pages/ProductDiscounts';
import ProductManagement from './admin/pages/ProductManagement';
import RegisteredProductList from './admin/pages/RegisteredProductList';
import MarketingLoyalty from './admin/pages/MarketingLoyalty';
import PartnershipRequestsView from './admin/pages/PartnershipRequestsView';
import SurveyManagement from './admin/pages/SurveyManagement';
import SalesManagement from './admin/pages/SalesManagement';

export type AdminDashboardPage = 
    | 'customer-management' 
    | 'add-customer' 
    | 'order-requests' 
    | 'support-tickets' 
    | 'announcements' 
    | 'settings' 
    | 'special-offers' 
    | 'product-discounts' 
    | 'product-management' 
    | 'registered-products'
    | 'marketing-loyalty'
    | 'partnership-requests'
    | 'sales-management'
    | 'surveys';

const AdminDashboard = ({ 
    onNavigateHome, 
    customers, 
    setCustomers,
    onUpdateCustomer,
    tickets, 
    setTickets, 
    announcements, 
    setAnnouncements,
    orderRequests,
    setOrderRequests,
    partnershipRequests,
    onApproveRequest,
    specialOffers,
    setSpecialOffers,
    salesClosures,
    setSalesClosures,
    productDiscounts,
    setProductDiscounts,
    products,
    setProducts,
    marketingSettings,
    setMarketingSettings,
    surveys,
    setSurveys,
    surveyResponses,
    setSurveyResponses
}) => {
    const [activePage, setActivePage] = useState<AdminDashboardPage>('customer-management');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    const selectedTicket = tickets.find(t => t.id === selectedTicketId);

    const pendingRequestsCount = orderRequests.filter(req => req.status === 'در انتظار تایید').length;
    const modifiedDateCount = orderRequests.filter(req => req.dateModified).length;
    const totalNotifications = pendingRequestsCount + modifiedDateCount;

    const handleAddCustomer = (newCustomer) => {
        setCustomers(prev => [...prev, { id: `CUS-${Math.floor(Math.random() * 9000) + 1000}`, ...newCustomer }]);
        setActivePage('customer-management');
    };

    const handleAdminReply = (ticketId, replyText) => {
        setTickets(prevTickets =>
            prevTickets.map(ticket =>
                ticket.id === ticketId ? {
                    ...ticket,
                    status: 'پاسخ داده شده',
                    date: new Date().toLocaleDateString('fa-IR'),
                    messages: [...ticket.messages, { sender: 'admin', text: replyText, timestamp: new Date().toLocaleString('fa-IR') }]
                } : ticket
            )
        );
    };

    const handleSendAnnouncement = ({ title, content, type, customerIds }) => {
        const timestamp = new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
        let currentId = announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) : 0;

        if (type === 'public') {
            const newAnnouncement = {
                id: currentId + 1,
                title,
                content,
                type: 'public',
                customerId: null,
                timestamp,
                isRead: false
            };
            setAnnouncements(prev => [newAnnouncement, ...prev]);
        } else if (type === 'specific' && customerIds && customerIds.length > 0) {
            const newAnnouncements = customerIds.map((cId) => {
                currentId++;
                return {
                    id: currentId,
                    title,
                    content,
                    type: 'specific',
                    customerId: cId,
                    timestamp,
                    isRead: false
                };
            });
            setAnnouncements(prev => [...newAnnouncements, ...prev]);
        }
    };
    
    const handleDeleteAnnouncement = (announcementId) => {
        setAnnouncements(prev => prev.filter(ann => ann.id !== announcementId));
    };

    const handleArchiveAnnouncement = (announcementId) => {
        setAnnouncements(prev => prev.map(ann => 
            ann.id === announcementId ? { ...ann, isArchived: !ann.isArchived } : ann
        ));
    };

    const handleSendSpecialOffer = ({ productName, discount, imageUrl, type, customerIds }) => {
        const timestamp = new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
        let currentId = specialOffers.length > 0 ? Math.max(...specialOffers.map(o => o.id)) : 0;

        if (type === 'public') {
            const newOffer = {
                id: currentId + 1,
                productName,
                discount,
                imageUrl,
                type: 'public',
                customerId: null,
                timestamp,
            };
            setSpecialOffers(prev => [newOffer, ...prev]);
        } else if (type === 'specific' && customerIds && customerIds.length > 0) {
            const newOffers = customerIds.map((cId) => {
                currentId++;
                return {
                    id: currentId,
                    productName,
                    discount,
                    imageUrl,
                    type: 'specific',
                    customerId: cId,
                    timestamp,
                };
            });
            setSpecialOffers(prev => [...newOffers, ...prev]);
        }
    };

    const handleDeleteSpecialOffer = (offerId) => {
        setSpecialOffers(prev => prev.filter(o => o.id !== offerId));
    };
    
    const handleAddProductDiscount = (newDiscount) => {
        const nextId = productDiscounts.length > 0 ? Math.max(...productDiscounts.map(d => d.id)) + 1 : 1;
        setProductDiscounts(prev => [...prev, { id: nextId, ...newDiscount }]);
    };
    
    const handleDeleteProductDiscount = (discountId) => {
        setProductDiscounts(prev => prev.filter(d => d.id !== discountId));
    };


    const renderActivePage = () => {
        if (selectedTicket) {
            return <TicketDetail 
                ticket={selectedTicket} 
                onBack={() => setSelectedTicketId(null)}
                onReply={handleAdminReply}
            />;
        }

        if (selectedCustomer) {
            return <CustomerDetail 
                customer={selectedCustomer} 
                onBack={() => setSelectedCustomer(null)}
                onUpdate={onUpdateCustomer}
            />;
        }

        switch (activePage) {
            case 'customer-management':
                return <CustomerManagement 
                            customers={customers}
                            onManageCustomer={setSelectedCustomer} 
                            onAddCustomerClick={() => setActivePage('add-customer')}
                        />;
            case 'add-customer':
                return <AddCustomerPage
                            onBack={() => setActivePage('customer-management')}
                            onAdd={handleAddCustomer}
                        />;
            case 'order-requests':
                return <OrderRequests requests={orderRequests} setRequests={setOrderRequests} onApprove={onApproveRequest} products={products} />;
            case 'support-tickets':
                return <SupportTickets tickets={tickets} onSelectTicket={(ticket) => setSelectedTicketId(ticket.id)} />;
            case 'announcements':
                return <Announcements 
                            announcements={announcements}
                            onSend={handleSendAnnouncement} 
                            onDelete={handleDeleteAnnouncement}
                            onArchive={handleArchiveAnnouncement}
                            customers={customers}
                        />;
            case 'special-offers':
                return <SpecialOffers 
                            offers={specialOffers}
                            onSend={handleSendSpecialOffer}
                            onDelete={handleDeleteSpecialOffer}
                            customers={customers}
                            products={products}
                        />;
            case 'product-discounts':
                return <ProductDiscounts 
                            discounts={productDiscounts}
                            onAdd={handleAddProductDiscount}
                            onDelete={handleDeleteProductDiscount}
                            customers={customers}
                            products={products}
                        />;
            case 'product-management':
                return <ProductManagement 
                            products={products}
                            setProducts={setProducts}
                            customers={customers}
                        />;
            case 'registered-products':
                return <RegisteredProductList
                            products={products}
                            setProducts={setProducts}
                            customers={customers}
                        />;
            case 'marketing-loyalty':
                return <MarketingLoyalty
                            settings={marketingSettings}
                            onSaveSettings={setMarketingSettings}
                            customers={customers}
                            orderRequests={orderRequests}
                        />;
            case 'partnership-requests':
                return <PartnershipRequestsView requests={partnershipRequests} />;
            case 'sales-management':
                return <SalesManagement 
                            closures={salesClosures}
                            onSend={(closure) => {
                                const newClosure = { id: Date.now(), timestamp: new Date().toLocaleString('fa-IR'), ...closure };
                                setSalesClosures(prev => [newClosure, ...prev]);
                            }}
                            onDelete={(id) => {
                                setSalesClosures(prev => prev.filter(c => c.id !== id));
                            }}
                            customers={customers}
                        />;
            case 'surveys':
                return <SurveyManagement surveys={surveys} responses={surveyResponses} setSurveys={setSurveys} />;
            case 'settings':
                return <Settings />;
            default:
                return <CustomerManagement 
                            customers={customers}
                            onManageCustomer={setSelectedCustomer} 
                            onAddCustomerClick={() => setActivePage('add-customer')} 
                        />;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f5f8fa] text-gray-700 font-poppins" dir="rtl">
            <AdminDashboardSidebar 
                activePage={activePage} 
                onNavigate={(page) => {
                    setSelectedCustomer(null);
                    setSelectedTicketId(null);
                    setActivePage(page);
                }}
                isOpen={isSidebarOpen}
                setIsOpen={setSidebarOpen}
                notificationCount={totalNotifications}
            />
            <div className="flex-1 flex flex-col">
                <AdminDashboardHeader 
                    onToggleMobileSidebar={() => setSidebarOpen(!isSidebarOpen)} 
                    onNavigateHome={onNavigateHome}
                    notificationCount={totalNotifications}
                />
                <main className="p-4 md:p-6 lg:p-8 flex-1 overflow-y-auto">
                    {renderActivePage()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;