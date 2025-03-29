# Microservices Architecture Pattern
# الگوی معماری میکروسرویس

## English
This directory contains an implementation of the Microservices Architecture pattern using Express.js. In this pattern, the application is broken down into small, independent services that communicate with each other through APIs.

### Structure:
```
microservices/
├── services/
│   ├── user-service/      # User management service
│   ├── auth-service/      # Authentication service
│   ├── product-service/   # Product management service
│   └── order-service/     # Order management service
├── gateway/              # API Gateway
├── discovery/           # Service discovery
└── shared/             # Shared utilities and types
```

### Features:
- Independent deployment
- Service isolation
- API Gateway
- Service discovery
- Distributed logging
- Swagger documentation for each service

## فارسی
این پوشه شامل پیاده‌سازی الگوی معماری میکروسرویس با استفاده از Express.js است. در این الگو، برنامه به سرویس‌های کوچک و مستقل تقسیم می‌شود که از طریق API با یکدیگر ارتباط برقرار می‌کنند.

### ساختار:
```
microservices/
├── services/
│   ├── user-service/      # سرویس مدیریت کاربران
│   ├── auth-service/      # سرویس احراز هویت
│   ├── product-service/   # سرویس مدیریت محصولات
│   └── order-service/     # سرویس مدیریت سفارشات
├── gateway/              # دروازه API
├── discovery/           # کشف سرویس
└── shared/             # ابزارها و انواع مشترک
```

### ویژگی‌ها:
- استقرار مستقل
- جداسازی سرویس‌ها
- دروازه API
- کشف سرویس
- لاگینگ توزیع شده
- مستندات Swagger برای هر سرویس 