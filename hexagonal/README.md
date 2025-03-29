# Hexagonal Architecture Pattern
# الگوی معماری شش‌ضلعی

## English
This directory contains an implementation of the Hexagonal Architecture (Ports and Adapters) pattern using Express.js. In this pattern, the application core is isolated from external concerns through ports and adapters, allowing for better testability and flexibility.

### Structure:
```
hexagonal/
├── src/
│   ├── domain/         # Core business logic and entities
│   ├── application/    # Application services and ports
│   ├── adapters/       # Adapters for external concerns
│   │   ├── primary/    # Driving adapters (HTTP, CLI, etc.)
│   │   └── secondary/  # Driven adapters (Database, External Services)
│   ├── config/        # Configuration files
│   └── app.js         # Main application file
├── tests/             # Test files
└── swagger/           # Swagger documentation
```

### Features:
- Isolated core business logic
- Ports for external communication
- Adapters for external implementations
- Framework independence
- Testable components
- Clear separation of concerns
- Comprehensive logging
- Swagger documentation

## فارسی
این پوشه شامل پیاده‌سازی الگوی معماری شش‌ضلعی (پورت‌ها و آداپتورها) با استفاده از Express.js است. در این الگو، هسته اصلی برنامه از دغدغه‌های خارجی از طریق پورت‌ها و آداپتورها جدا می‌شود، که امکان تست‌پذیری و انعطاف‌پذیری بهتری را فراهم می‌کند.

### ساختار:
```
hexagonal/
├── src/
│   ├── domain/         # منطق اصلی کسب و کار و موجودیت‌ها
│   ├── application/    # سرویس‌های برنامه و پورت‌ها
│   ├── adapters/       # آداپتورها برای دغدغه‌های خارجی
│   │   ├── primary/    # آداپتورهای محرک (HTTP، CLI و غیره)
│   │   └── secondary/  # آداپتورهای محرک (پایگاه داده، سرویس‌های خارجی)
│   ├── config/        # فایل‌های پیکربندی
│   └── app.js         # فایل اصلی برنامه
├── tests/             # فایل‌های تست
└── swagger/           # مستندات Swagger
```

### ویژگی‌ها:
- منطق اصلی کسب و کار ایزوله شده
- پورت‌ها برای ارتباط خارجی
- آداپتورها برای پیاده‌سازی‌های خارجی
- مستقل از چارچوب
- کامپوننت‌های قابل تست
- جداسازی واضح دغدغه‌ها
- لاگینگ جامع
- مستندات Swagger 