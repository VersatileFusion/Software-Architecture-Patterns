# Layered Architecture Pattern
# الگوی معماری لایه‌ای

## English
This directory contains an implementation of the Layered Architecture pattern using Express.js. In this pattern, the application is organized into layers, each with a specific responsibility, promoting separation of concerns and maintainability.

### Structure:
```
layered/
├── src/
│   ├── presentation/    # Controllers and request/response handling
│   ├── application/     # Use cases and business logic
│   ├── domain/         # Business entities and interfaces
│   ├── infrastructure/ # External services, databases, etc.
│   ├── config/        # Configuration files
│   └── app.js         # Main application file
├── tests/             # Test files
└── swagger/           # Swagger documentation
```

### Features:
- Clear separation of concerns
- Dependency injection
- Interface-based design
- Layered communication
- Comprehensive logging
- Swagger documentation

## فارسی
این پوشه شامل پیاده‌سازی الگوی معماری لایه‌ای با استفاده از Express.js است. در این الگو، برنامه به لایه‌های مختلف تقسیم می‌شود که هر کدام مسئولیت خاصی دارند و باعث جداسازی دغدغه‌ها و قابلیت نگهداری می‌شوند.

### ساختار:
```
layered/
├── src/
│   ├── presentation/    # کنترلرها و مدیریت درخواست/پاسخ
│   ├── application/     # موارد استفاده و منطق کسب و کار
│   ├── domain/         # موجودیت‌های کسب و کار و رابط‌ها
│   ├── infrastructure/ # سرویس‌های خارجی، پایگاه داده و غیره
│   ├── config/        # فایل‌های پیکربندی
│   └── app.js         # فایل اصلی برنامه
├── tests/             # فایل‌های تست
└── swagger/           # مستندات Swagger
```

### ویژگی‌ها:
- جداسازی واضح دغدغه‌ها
- تزریق وابستگی
- طراحی مبتنی بر رابط
- ارتباط لایه‌ای
- لاگینگ جامع
- مستندات Swagger 