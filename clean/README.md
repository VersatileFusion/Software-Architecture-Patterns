# Clean Architecture Pattern
# الگوی معماری تمیز

## English
This directory contains an implementation of the Clean Architecture pattern using Express.js. In this pattern, the application is organized into concentric layers, with the domain layer at the center, independent of external concerns.

### Structure:
```
clean/
├── src/
│   ├── domain/         # Enterprise business rules and entities
│   ├── application/    # Application business rules and use cases
│   ├── interfaces/     # Interface adapters (controllers, presenters)
│   ├── infrastructure/ # Frameworks, drivers, and external tools
│   ├── config/        # Configuration files
│   └── app.js         # Main application file
├── tests/             # Test files
└── swagger/           # Swagger documentation
```

### Features:
- Independent of frameworks
- Independent of UI
- Independent of database
- Independent of external agencies
- Testable business rules
- Clear separation of concerns
- Comprehensive logging
- Swagger documentation

## فارسی
این پوشه شامل پیاده‌سازی الگوی معماری تمیز با استفاده از Express.js است. در این الگو، برنامه به لایه‌های هم‌مرکز سازماندهی می‌شود، با لایه دامنه در مرکز، مستقل از دغدغه‌های خارجی.

### ساختار:
```
clean/
├── src/
│   ├── domain/         # قوانین و موجودیت‌های کسب و کار
│   ├── application/    # قوانین و موارد استفاده کسب و کار
│   ├── interfaces/     # آداپتورهای رابط (کنترلرها، ارائه‌دهندگان)
│   ├── infrastructure/ # چارچوب‌ها، درایورها و ابزارهای خارجی
│   ├── config/        # فایل‌های پیکربندی
│   └── app.js         # فایل اصلی برنامه
├── tests/             # فایل‌های تست
└── swagger/           # مستندات Swagger
```

### ویژگی‌ها:
- مستقل از چارچوب‌ها
- مستقل از رابط کاربری
- مستقل از پایگاه داده
- مستقل از عوامل خارجی
- قوانین کسب و کار قابل تست
- جداسازی واضح دغدغه‌ها
- لاگینگ جامع
- مستندات Swagger 