﻿# Software Architecture Patterns Implementation
# پیاده‌سازی الگوهای معماری نرم‌افزار

This project demonstrates the implementation of six different software architecture patterns using Node.js and Express. Each architecture implements the same user management functionality but follows different architectural principles and patterns.

این پروژه پیاده‌سازی شش الگوی مختلف معماری نرم‌افزار را با استفاده از Node.js و Express نشان می‌دهد. هر معماری، عملکرد مدیریت کاربر یکسانی را پیاده‌سازی می‌کند اما از اصول و الگوهای معماری متفاوتی پیروی می‌کند.

## Table of Contents | فهرست مطالب
- [Architectures | معماری‌ها](#architectures)
- [Prerequisites | پیش‌نیازها](#prerequisites)
- [Installation | نصب و راه‌اندازی](#installation)
- [Running the Project | اجرای پروژه](#running-the-project)
- [Testing | تست‌ها](#testing)
- [API Documentation | مستندات API](#api-documentation)
- [Project Structure | ساختار پروژه](#project-structure)
- [Architecture Details | جزئیات معماری](#architecture-details)
- [Contributing | مشارکت](#contributing)

## Architectures | معماری‌ها

The project implements six different software architecture patterns:
این پروژه شش الگوی مختلف معماری نرم‌افزار را پیاده‌سازی می‌کند:

1. **Monolithic Architecture | معماری یکپارچه**
   - Traditional single-tiered application | برنامه تک لایه سنتی
   - All components in one codebase | تمام اجزا در یک کد پایه
   - Simple deployment and maintenance | استقرار و نگهداری ساده
   - Port: 3000 | پورت: 3000

2. **Microservices Architecture | معماری میکروسرویس**
   - Distributed system with separate services | سیستم توزیع شده با سرویس‌های مجزا
   - API Gateway for request routing | دروازه API برای مسیریابی درخواست‌ها
   - Independent service deployment | استقرار مستقل سرویس‌ها
   - Ports: 3001 (Gateway), 3002 (User Service) | پورت‌ها: 3001 (دروازه)، 3002 (سرویس کاربر)

3. **Layered Architecture | معماری لایه‌ای**
   - Clear separation of concerns | جداسازی واضح مسئولیت‌ها
   - Presentation, Business, and Data layers | لایه‌های نمایش، تجاری و داده
   - Strict layer dependencies | وابستگی‌های سخت‌گیرانه لایه‌ها
   - Port: 3003 | پورت: 3003

4. **Onion Architecture | معماری پیازی**
   - Domain-centric design | طراحی دامنه‌محور
   - Dependency inversion principle | اصل وارونگی وابستگی
   - Core domain isolation | جداسازی دامنه اصلی
   - Port: 3004 | پورت: 3004

5. **Clean Architecture | معماری تمیز**
   - Clear boundaries and dependency rule | مرزهای مشخص و قانون وابستگی
   - Independent of frameworks | مستقل از فریم‌ورک‌ها
   - Testable and maintainable | قابل تست و نگهداری
   - Port: 3005 | پورت: 3005

6. **Event-Driven Architecture | معماری رویداد‌محور**
   - Event-based communication | ارتباطات مبتنی بر رویداد
   - Loose coupling | جفت‌شدگی سست
   - Asynchronous processing | پردازش ناهمگام
   - Port: 3006 | پورت: 3006

## Prerequisites | پیش‌نیازها

- Node.js (v14 or higher | نسخه 14 یا بالاتر)
- npm (v6 or higher | نسخه 6 یا بالاتر)
- Git

## Installation | نصب و راه‌اندازی

1. Clone the repository | کلون کردن مخزن:
```bash
git clone <repository-url>
cd software-architectures
```

2. Install dependencies for each architecture | نصب وابستگی‌ها برای هر معماری:
```bash
# Monolithic | یکپارچه
cd monolithic
npm install

# Microservices | میکروسرویس
cd ../microservices
npm install

# Layered | لایه‌ای
cd ../layered
npm install

# Onion | پیازی
cd ../onion
npm install

# Clean | تمیز
cd ../clean
npm install

# Event-Driven | رویداد‌محور
cd ../event-driven
npm install
```

## Running the Project | اجرای پروژه

Each architecture can be run independently | هر معماری می‌تواند به طور مستقل اجرا شود:

```bash
# Monolithic | یکپارچه
cd monolithic
npm run dev

# Microservices | میکروسرویس
cd microservices
npm run dev

# Layered | لایه‌ای
cd layered
npm run dev

# Onion | پیازی
cd onion
npm run dev

# Clean | تمیز
cd clean
npm run dev

# Event-Driven | رویداد‌محور
cd event-driven
npm run dev
```

## Testing | تست‌ها

The project includes comprehensive tests for each architecture | پروژه شامل تست‌های جامع برای هر معماری است:

```bash
# Run tests for all architectures | اجرای تست‌ها برای تمام معماری‌ها
node test-all.js
```

Tests cover | تست‌ها شامل:
- Server availability | در دسترس بودن سرور
- User creation | ایجاد کاربر
- User retrieval (single and all) | بازیابی کاربر (تکی و همه)
- User update | به‌روزرسانی کاربر
- User deletion | حذف کاربر
- Verification of deletion | تأیید حذف

## API Documentation | مستندات API

Each architecture exposes the following REST endpoints | هر معماری نقاط پایانی REST زیر را ارائه می‌دهد:

### User Management API | API مدیریت کاربر

- `GET /api/users` - Get all users | دریافت همه کاربران
- `GET /api/users/:id` - Get user by ID | دریافت کاربر با شناسه
- `POST /api/users` - Create new user | ایجاد کاربر جدید
- `PUT /api/users/:id` - Update user | به‌روزرسانی کاربر
- `DELETE /api/users/:id` - Delete user | حذف کاربر

### Request/Response Format | قالب درخواست/پاسخ

```json
// Create/Update User Request | درخواست ایجاد/به‌روزرسانی کاربر
{
  "name": "John Doe",
  "email": "john@example.com"
}

// User Response | پاسخ کاربر
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-03-29T10:00:00.000Z",
  "updatedAt": "2024-03-29T10:00:00.000Z"
}
```

## Project Structure | ساختار پروژه

Each architecture follows its own directory structure | هر معماری از ساختار دایرکتوری خود پیروی می‌کند:

```
software-architectures/
├── monolithic/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   └── package.json
├── microservices/
│   ├── src/
│   │   ├── gateway/
│   │   └── services/
│   │       └── user-service/
│   └── package.json
├── layered/
│   ├── src/
│   │   ├── presentation/
│   │   ├── business/
│   │   └── data/
│   └── package.json
├── onion/
│   ├── src/
│   │   ├── domain/
│   │   ├── application/
│   │   └── infrastructure/
│   └── package.json
├── clean/
│   ├── src/
│   │   ├── entities/
│   │   ├── use-cases/
│   │   ├── interfaces/
│   │   └── frameworks/
│   └── package.json
├── event-driven/
│   ├── src/
│   │   ├── domain/
│   │   ├── events/
│   │   ├── handlers/
│   │   └── infrastructure/
│   └── package.json
└── test-all.js
```

## Architecture Details | جزئیات معماری

### Monolithic Architecture | معماری یکپارچه
- Single codebase | کد پایه واحد
- Direct database access | دسترسی مستقیم به پایگاه داده
- Simple deployment | استقرار ساده
- Limited scalability | مقیاس‌پذیری محدود

### Microservices Architecture | معماری میکروسرویس
- API Gateway for routing | دروازه API برای مسیریابی
- Independent service deployment | استقرار مستقل سرویس‌ها
- Service-to-service communication | ارتباط سرویس به سرویس
- Distributed data management | مدیریت داده توزیع شده

### Layered Architecture | معماری لایه‌ای
- Presentation Layer (Controllers) | لایه نمایش (کنترلرها)
- Business Layer (Services) | لایه تجاری (سرویس‌ها)
- Data Layer (Repositories) | لایه داده (مخازن)
- Strict layer dependencies | وابستگی‌های سخت‌گیرانه لایه‌ها

### Onion Architecture | معماری پیازی
- Domain Layer (Core) | لایه دامنه (هسته)
- Application Layer (Use Cases) | لایه برنامه (موارد استفاده)
- Infrastructure Layer (External) | لایه زیرساخت (خارجی)
- Dependency Inversion | وارونگی وابستگی

### Clean Architecture | معماری تمیز
- Entities (Core) | موجودیت‌ها (هسته)
- Use Cases (Application) | موارد استفاده (برنامه)
- Interface Adapters | تطبیق‌دهنده‌های رابط
- Frameworks & Drivers | فریم‌ورک‌ها و درایورها
- Dependency Rule | قانون وابستگی

### Event-Driven Architecture | معماری رویداد‌محور
- Event Manager | مدیر رویداد
- Event Handlers | مدیریت‌کننده‌های رویداد
- Event Publishing | انتشار رویداد
- Asynchronous Processing | پردازش ناهمگام

## Contributing 

1. Fork the repository 
2. Create your feature branch |  (`git checkout -b feature/amazing-feature`)
3. Commit your changes | ثبت تغییرات (`git commit -m 'Add some amazing feature'`)
4. Push to the branch |  (`git push origin feature/amazing-feature`)
5. Open a Pull Request | 

## License | مجوز

This project is licensed under the MIT License - see the LICENSE file for details.
