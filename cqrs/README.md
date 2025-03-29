# CQRS Architecture Pattern

## English
This implementation demonstrates the Command Query Responsibility Segregation (CQRS) pattern using Express.js. CQRS separates read and write operations into different models, allowing for better scalability and performance.

### Directory Structure
```
cqrs/
├── src/
│   ├── commands/           # Write operations
│   │   ├── createUser.js
│   │   ├── updateUser.js
│   │   └── deleteUser.js
│   ├── queries/           # Read operations
│   │   ├── getUser.js
│   │   └── getAllUsers.js
│   ├── models/           # Data models
│   │   └── user.js
│   ├── repositories/     # Data access layer
│   │   └── userRepository.js
│   └── server.js        # Main application file
├── package.json
└── README.md
```

### Features
- Separate command and query models
- In-memory data storage
- RESTful API endpoints
- Error handling
- Input validation
- Logging

## فارسی
این پیاده‌سازی الگوی جداسازی مسئولیت‌های دستور و پرس‌وجو (CQRS) را با استفاده از Express.js نشان می‌دهد. CQRS عملیات خواندن و نوشتن را در مدل‌های مختلف جدا می‌کند که امکان مقیاس‌پذیری و عملکرد بهتر را فراهم می‌کند.

### ساختار دایرکتوری
```
cqrs/
├── src/
│   ├── commands/           # عملیات نوشتن
│   │   ├── createUser.js
│   │   ├── updateUser.js
│   │   └── deleteUser.js
│   ├── queries/           # عملیات خواندن
│   │   ├── getUser.js
│   │   └── getAllUsers.js
│   ├── models/           # مدل‌های داده
│   │   └── user.js
│   ├── repositories/     # لایه دسترسی به داده
│   │   └── userRepository.js
│   └── server.js        # فایل اصلی برنامه
├── package.json
└── README.md
```

### ویژگی‌ها
- مدل‌های جداگانه برای دستور و پرس‌وجو
- ذخیره‌سازی داده در حافظه
- نقاط پایانی API RESTful
- مدیریت خطا
- اعتبارسنجی ورودی
- ثبت‌رویداد 