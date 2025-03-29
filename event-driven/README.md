# Event-Driven Architecture Pattern
# الگوی معماری مبتنی بر رویداد

## English
This directory contains an implementation of the Event-Driven Architecture pattern using Express.js and RabbitMQ. In this pattern, the application components communicate through events, allowing for loose coupling and asynchronous processing.

### Structure:
```
event-driven/
├── src/
│   ├── events/         # Event definitions and handlers
│   ├── publishers/     # Event publishers
│   ├── subscribers/    # Event subscribers
│   ├── services/       # Business logic
│   ├── config/        # Configuration files
│   └── app.js         # Main application file
├── tests/             # Test files
└── swagger/           # Swagger documentation
```

### Features:
- Event publishing and subscribing
- Asynchronous processing
- Message queuing with RabbitMQ
- Event logging
- Swagger documentation
- Error handling and retry mechanisms

## فارسی
این پوشه شامل پیاده‌سازی الگوی معماری مبتنی بر رویداد با استفاده از Express.js و RabbitMQ است. در این الگو، اجزای برنامه از طریق رویدادها با یکدیگر ارتباط برقرار می‌کنند که باعث جداسازی و پردازش ناهمزمان می‌شود.

### ساختار:
```
event-driven/
├── src/
│   ├── events/         # تعاریف و پردازنده‌های رویداد
│   ├── publishers/     # ناشران رویداد
│   ├── subscribers/    # مشترکان رویداد
│   ├── services/       # منطق کسب و کار
│   ├── config/        # فایل‌های پیکربندی
│   └── app.js         # فایل اصلی برنامه
├── tests/             # فایل‌های تست
└── swagger/           # مستندات Swagger
```

### ویژگی‌ها:
- انتشار و اشتراک رویدادها
- پردازش ناهمزمان
- صف پیام با RabbitMQ
- ثبت رویدادها
- مستندات Swagger
- مدیریت خطا و مکانیزم‌های تکرار 