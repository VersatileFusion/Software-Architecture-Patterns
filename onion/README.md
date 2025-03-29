# Onion Architecture Pattern

## English
This implementation demonstrates the Onion Architecture pattern using Express.js. The Onion Architecture emphasizes the separation of concerns through concentric layers, with the domain model at the center and infrastructure concerns at the outer layers.

### Directory Structure
```
onion/
├── src/
│   ├── domain/           # Core domain layer
│   │   ├── entities/     # Domain entities
│   │   ├── interfaces/   # Domain interfaces
│   │   └── services/     # Domain services
│   ├── application/      # Application layer
│   │   ├── services/     # Application services
│   │   └── interfaces/   # Application interfaces
│   ├── infrastructure/   # Infrastructure layer
│   │   ├── persistence/  # Data persistence
│   │   └── logging/      # Logging services
│   ├── interfaces/       # Interface layer
│   │   ├── http/        # HTTP controllers
│   │   └── dto/         # Data transfer objects
│   └── server.js        # Main application file
├── package.json
└── README.md
```

### Features
- Layered architecture with clear dependencies
- Domain-centric design
- Dependency inversion
- Interface-based design
- Separation of concerns
- Dependency injection
- RESTful API endpoints
- Swagger documentation

## فارسی
این پیاده‌سازی الگوی معماری پیازی را با استفاده از Express.js نشان می‌دهد. معماری پیازی بر جداسازی دغدغه‌ها از طریق لایه‌های متحدالمرکز تأکید دارد، با مدل دامنه در مرکز و دغدغه‌های زیرساختی در لایه‌های بیرونی.

### ساختار دایرکتوری
```
onion/
├── src/
│   ├── domain/           # لایه اصلی دامنه
│   │   ├── entities/     # موجودیت‌های دامنه
│   │   ├── interfaces/   # رابط‌های دامنه
│   │   └── services/     # سرویس‌های دامنه
│   ├── application/      # لایه برنامه
│   │   ├── services/     # سرویس‌های برنامه
│   │   └── interfaces/   # رابط‌های برنامه
│   ├── infrastructure/   # لایه زیرساخت
│   │   ├── persistence/  # ذخیره‌سازی داده
│   │   └── logging/      # سرویس‌های ثبت رویداد
│   ├── interfaces/       # لایه رابط
│   │   ├── http/        # کنترلرهای HTTP
│   │   └── dto/         # اشیاء انتقال داده
│   └── server.js        # فایل اصلی برنامه
├── package.json
└── README.md
```

### ویژگی‌ها
- معماری لایه‌ای با وابستگی‌های مشخص
- طراحی دامنه-محور
- وارونگی وابستگی
- طراحی مبتنی بر رابط
- جداسازی دغدغه‌ها
- تزریق وابستگی
- نقاط پایانی API RESTful
- مستندات Swagger 