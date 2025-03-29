# Monolithic Architecture Pattern
# الگوی معماری یکپارچه

## English
This directory contains an implementation of the Monolithic Architecture pattern using Express.js. In this pattern, all components of the application are combined into a single program from a single platform.

### Structure:
```
monolithic/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── models/        # Data models
│   ├── routes/        # Route definitions
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   └── app.js         # Main application file
├── tests/             # Test files
└── swagger/           # Swagger documentation
```

### Features:
- Single codebase
- Shared memory space
- Unified deployment
- Centralized logging
- Swagger documentation

## فارسی
این پوشه شامل پیاده‌سازی الگوی معماری یکپارچه با استفاده از Express.js است. در این الگو، تمام اجزای برنامه در یک برنامه واحد از یک پلتفرم ترکیب می‌شوند.

### ساختار:
```
monolithic/
├── src/
│   ├── config/         # فایل‌های پیکربندی
│   ├── controllers/    # پردازنده‌های درخواست
│   ├── models/        # مدل‌های داده
│   ├── routes/        # تعاریف مسیرها
│   ├── services/      # منطق کسب و کار
│   ├── utils/         # توابع کمکی
│   └── app.js         # فایل اصلی برنامه
├── tests/             # فایل‌های تست
└── swagger/           # مستندات Swagger
```

### ویژگی‌ها:
- کدپایه واحد
- فضای حافظه مشترک
- استقرار یکپارچه
- لاگینگ متمرکز
- مستندات Swagger 