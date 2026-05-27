

export const initialCustomers = [
    { id: 1, name: 'آقای محمدی', company: 'شرکت ساختمانی آرمان', discount: 5, phone: '۰۹۱۲۳۴۵۶۷۸۹', status: 'فعال', statusColor: 'green', username: 'mohammadi', password: '123', details: { nationalId: '۰۰۱۲۳۴۵۶۷۸', storeAddress: 'تهران، خیابان ولیعصر، برج سرو، واحد ۱۰۱', warehouseAddress: 'جاده قدیم کرج، انبار مرکزی آرمان' } },
    { id: 2, name: 'خانم رضایی', company: 'پروژه ساختمانی امید', discount: 10, phone: '۰۹۱۲۹۸۷۶۵۴۳', status: 'فعال', statusColor: 'green', username: 'rezaei', password: '123', details: { nationalId: '۰۰۸۷۶۵۴۳۲۱', storeAddress: 'اصفهان، خیابان چهارباغ، پلاک ۲۰', warehouseAddress: 'شهرک صنعتی جی، انبار امید' } },
    { id: 3, name: 'آقای کریمی', company: 'تاسیسات مرکزی', discount: 0, phone: '۰۹۳۵۱۱۱২২۳۳', status: 'غیرفعال', statusColor: 'red', username: null, password: null, details: { nationalId: '۰۴۵۱۱২২۳۳۴', storeAddress: 'شیراز، بلوار زند، ساختمان کوروش', warehouseAddress: 'شهرک صنعتی شیراز، انبار مرکزی' } },
    { id: 4, name: 'آقای احمدی', company: 'گروه مهندسی پایا', discount: 0, phone: '۰۹۱۵۰۰۰۱۱۱۱', status: 'در انتظار تایید', statusColor: 'amber', username: null, password: null, details: { nationalId: '۰۹۴۵۵۵۶۶۷۷', storeAddress: 'مشهد، بلوار سجاد، مجتمع تجاری وصال', warehouseAddress: 'شهرک صنعتی طوس، فاز ۲' } },
    { id: 5, name: 'خانم حسینی', company: 'لوله کشی نوین', discount: 15, phone: '۰۹۱۰۹۹۹۸۸۷۷', status: 'فعال', statusColor: 'green', username: null, password: null, details: { nationalId: '۰۳۸۹۹۸۸۷۷۶', storeAddress: 'تبریز، خیابان ولیعصر، مرکز خرید اطلس', warehouseAddress: 'شهرک صنعتی تبریز، انبار نوین' } },
];

export const initialOrderRequests = [
    {
        id: 'REQ-8361',
        customerName: 'آقای محمدی',
        company: 'شرکت ساختمانی آرمان',
        address: 'تهران، خیابان ولیعصر، برج سرو، واحد ۱۰۱',
        date: '۱۴۰۳/۰۵/۰۱',
        dispatchDate: null,
        total: '۴۹۸,۷۵۰,۰۰۰ ریال',
        totalAmount: 498750000,
        discountApplied: 5,
        status: 'در انتظار تایید',
        suggestedDate: '۱۴۰۳/۰۵/۰۵',
        suggestedTime: { from: '10:00', to: '12:00' },
        dateModified: false,
        products: [
            { code: 'KB-101-20', name: 'لوله تک لایه PPR سایز ۲۰', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/02/taklayeh.jpg', packages: 10, cartons: 2, totalUnits: 600, unitPrice: 450000, lineTotal: 270000000 },
            { code: 'KB-A201', name: 'زانویی ۹۰ درجه', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%B2%D8%A7%D9%86%D9%88-90-%D8%AF%D8%B1%D8%AC%D9%87-1-1.jpg', packages: 5, cartons: 0, totalUnits: 250, unitPrice: 120000, lineTotal: 30000000 },
            { code: 'KB-V401', name: 'شیر فلکه', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%B4%DB%8C%D8%B1-%D9%81%D9%84%DA%A9%D9%87-1-1.jpg', packages: 20, cartons: 1, totalUnits: 150, unitPrice: 1500000, lineTotal: 225000000 },
        ]
    },
    {
        id: 'REQ-7814',
        customerName: 'خانم رضایی',
        company: 'پروژه ساختمانی امید',
        address: 'اصفهان، خیابان چهارباغ، پلاک ۲۰',
        date: '۱۴۰۳/۰۴/۲۸',
        dispatchDate: '۱۴۰۳/۰۴/۲۹',
        total: '۱۳۰,۲۷۵,۰۰۰ ریال',
        totalAmount: 130275000,
        discountApplied: 10,
        status: 'تایید شده',
        suggestedDate: '۱۴۰۳/۰۴/۳۰',
        suggestedTime: { from: '14:00', to: '17:00' },
        dateModified: false,
        products: [
            { code: 'KB-101-25', name: 'لوله تک لایه PPR سایز ۲۵', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/02/taklayeh.jpg', packages: 15, cartons: 0, totalUnits: 225, unitPrice: 550000, lineTotal: 123750000 },
            { code: 'KB-A203', name: 'سه راهی', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%B3%D9%87-%D8%B1%D8%A7%D9%87%DB%8C-1-1.jpg', packages: 10, cartons: 1, totalUnits: 140, unitPrice: 150000, lineTotal: 21000000 },
        ]
    },
];


export const initialTickets = [
    {
        id: 'T-78901',
        customerId: 3,
        customerName: 'آقای کریمی',
        subject: 'مشکل در محاسبه متراژ لوله پنج لایه',
        department: 'فنی',
        date: '۱۴۰۳/۰۴/۱۵',
        status: 'بسته شده',
        messages: [
            { sender: 'customer', text: 'سلام، برای محاسبه متراژ لوله پنج لایه در یک پروژه با متراژ بالا نیاز به راهنمایی دارم.', timestamp: '۱۴۰۳/۰۴/۱۵ - ۱۰:۳۰' },
            { sender: 'admin', text: 'سلام آقای کریمی، لطفا نقشه پروژه را ارسال کنید تا بررسی شود.', timestamp: '۱۴۰۳/۰۴/۱۵ - ۱۱:۰۰' },
            { sender: 'customer', text: 'نقشه ارسال شد. ممنون.', timestamp: '۱۴۰۳/۰۴/۱۵ - ۱۱:۱۵' },
            { sender: 'admin', text: 'بررسی شد. محاسبات لازم انجام و برایتان ایمیل گردید. تیکت بسته می‌شود.', timestamp: '۱۴۰۳/۰۴/۱۵ - ۱۴:۰۰' },
        ]
    },
    {
        id: 'T-78905',
        customerId: 1,
        customerName: 'آقای محمدی',
        subject: 'سوال در مورد زمان تحویل سفارش KB-95780',
        department: 'فروش',
        date: '۱۴۰۳/۰۴/۲۲',
        status: 'پاسخ داده شده',
        messages: [
            { sender: 'customer', text: 'سلام، میخواستم زمان دقیق تحویل سفارش KB-95780 رو بدونم. ممنون.', timestamp: '۱۴۰۳/۰۴/۲۲ - ۰۹:۰۰' },
            { sender: 'admin', text: 'سلام. سفارش شما امروز ارسال شده و فردا به دست شما خواهد رسید.', timestamp: '۱۴۰۳/۰۴/۲۲ - ۰۹:۱۵' },
        ]
    },
    {
        id: 'T-78910',
        customerId: 2,
        customerName: 'خانم رضایی',
        subject: 'درخواست پیش فاکتور برای پروژه جدید',
        department: 'مالی',
        date: '۱۴۰۳/۰۴/۲۸',
        status: 'در انتظار پاسخ',
        messages: [
            { sender: 'customer', text: 'سلام، لطفا یک پیش فاکتور برای لیست محصولات پیوست شده صادر بفرمایید.', timestamp: '۱۴۰۳/۰۴/۲۸ - ۱۶:۰۰' },
        ]
    },
];

export const initialAnnouncements = [
  {
    id: 1,
    title: 'تخفیف ویژه تابستانه',
    content: 'از ۱۰ تا ۲۵ درصد تخفیف روی تمام محصولات لوله سه لایه فایبرگلاس بهره‌مند شوید. این فرصت را از دست ندهید!',
    type: 'public',
    customerId: null,
    timestamp: '۱۴۰۳/۰۵/۰۱ - ۱۰:۰۰',
    isRead: false,
    isArchived: false
  },
   {
    id: 3,
    title: 'تغییرات در ساعات کاری',
    content: 'به اطلاع می‌رساند ساعات کاری شرکت از تاریخ ۱۴۰۳/۰۵/۱۰ به ۸ صبح تا ۱۷ عصر تغییر خواهد یافت.',
    type: 'public',
    customerId: null,
    timestamp: '۱۴۰۳/۰۴/۲۸ - ۱۱:۰۰',
    isRead: false,
    isArchived: false
  },
];

export const initialSpecialOffers = [
  {
    id: 1,
    productName: 'لوله سه لایه فایبرگلاس',
    discount: '۱۵٪ تخفیف',
    imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAAHElEQVR42mNkoAAwjmoe1TyqeVTzqOZRzcNZMwIAHiMCH20P4PgAAAAASUVORK5CYII=',
    type: 'public',
    customerId: null,
    timestamp: '۱۴۰۳/۰۵/۰۵ - ۰۹:۰۰',
  },
  {
    id: 2,
    productName: 'شیر فلکه',
    discount: 'خرید ۱۰ عدد، ۱ عدد رایگان',
    imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAAHElEQVR42mNkoAAwjmoe1TyqeVTzqOZRzcNZMwIAHiMCH20P4PgAAAAASUVORK5CYII=',
    type: 'specific',
    customerId: 1,
    timestamp: '۱۴۰۳/۰۵/۰۴ - ۱۴:۲۰',
  },
];


export const allProducts = [
    { name: 'لوله تک لایه PPR سایز ۲۰', category: 'تک لایه', code: 'KB-101-20', price: '۴۵۰,۰۰۰', stock: 'موجود', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/02/taklayeh.jpg', packageQuantity: 20, cartonQuantity: 200, type: 'public', customerIds: [] },
    { name: 'لوله تک لایه PPR سایز ۲۵', category: 'تک لایه', code: 'KB-101-25', price: '۵۵۰,۰۰۰', stock: 'موجود', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/02/taklayeh.jpg', packageQuantity: 15, cartonQuantity: 150, type: 'public', customerIds: [] },
    { name: 'لوله سه لایه فایبرگلاس ۲۵', category: 'سه لایه', code: 'KB-301-25', price: '۷۲۰,۰۰۰', stock: 'موجود', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/02/3layeh.jpg', packageQuantity: 10, cartonQuantity: 100, type: 'public', customerIds: [] },
    { name: 'لوله سه لایه فایبرگلاس ۳۲', category: 'سه لایه', code: 'KB-301-32', price: '۹۵۰,۰۰۰', stock: 'ناموجود', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/02/3layeh.jpg', packageQuantity: 8, cartonQuantity: 80, type: 'public', customerIds: [] },
    { name: 'زانویی ۹۰ درجه', category: 'اتصالات', code: 'KB-A201', price: '۱۲۰,۰۰۰', stock: 'موجود', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%B2%D8%A7%D9%86%D9%88-90-%D8%AF%D8%B1%D8%AC%D9%87-1-1.jpg', packageQuantity: 50, cartonQuantity: 500, type: 'public', customerIds: [] },
    { name: 'بوشن', category: 'اتصالات', code: 'KB-A205', price: '۸۰,۰۰۰', stock: 'موجود', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%A8%D9%88%D8%B4%D9%86-1.jpg', packageQuantity: 100, cartonQuantity: 1000, type: 'public', customerIds: [] },
    { name: 'سه راهی', category: 'اتصالات', code: 'KB-A203', price: '۱۵۰,۰۰۰', stock: 'موجود', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%B3%D9%87-%D8%B1%D8%A7%D9%87%DB%8C-1-1.jpg', packageQuantity: 40, cartonQuantity: 400, type: 'public', customerIds: [] },
    { name: 'شیر فلکه', category: 'شیرآلات', code: 'KB-V401', price: '۱,۵۰۰,۰۰۰', stock: 'تعداد محدود', imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%B4%DB%8C%D8%B1-%D9%81%D9%84%DA%A9%D9%87-1-1.jpg', packageQuantity: 5, cartonQuantity: 50, type: 'public', customerIds: [] },
    { name: 'شیر توپی دسته‌فلزی', category: 'شیرآلات', code: 'KB-V405', price: '۱,۸۰۰,۰۰۰', stock: 'موجود', imageUrl: '', packageQuantity: 4, cartonQuantity: 40, type: 'public', customerIds: [] },
    { name: 'لوله پنج لایه PEX', category: 'پنج لایه', code: 'KB-501', price: '۱,۱۰۰,۰۰۰', stock: 'ناموجود', imageUrl: '', packageQuantity: 10, cartonQuantity: 100, type: 'public', customerIds: [] },
];

export const initialSurveys = [
    {
        id: 'S-001',
        title: 'نظرسنجی کیفیت محصولات سال ۱۴۰۳',
        description: 'با شرکت در این نظرسنجی و ثبت دیدگاه‌های ارزشمندتان، به ما در ارتقای کیفیت محصولات کمک کنید و ۲ درصد تخفیف ویژه برای سفارش بعدی خود دریافت نمایید.',
        status: 'active',
        questions: [
            { id: 1, type: 'rating', text: 'میزان رضایت شما از کیفیت بسته‌بندی محصولات چقدر است؟' },
            { id: 2, type: 'rating', text: 'کیفیت فنی لوله‌های تک‌لایه را چگونه ارزیابی می‌کنید؟' },
            { id: 3, type: 'rating', text: 'سرعت تحویل سفارشات شما مطلوب است؟' }
        ],
        createdAt: '۱۴۰۳/۰۵/۱۰'
    }
];

export const initialSurveyResponses = [
    {
        id: 'R-001',
        surveyId: 'S-001',
        customerId: 1,
        customerName: 'آقای محمدی',
        answers: {
            1: 5,
            2: 4,
            3: 'ارسال سریع‌تر بارها در اولویت باشد.'
        },
        timestamp: '۱۴۰۳/۰۵/۱۲ - ۱۴:۳۰'
    }
];
