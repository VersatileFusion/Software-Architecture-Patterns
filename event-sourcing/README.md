# Event Sourcing Architecture Pattern

## English
This implementation demonstrates the Event Sourcing pattern using Express.js and an in-memory event store. Event Sourcing stores all changes to application state as a sequence of events, allowing for complete audit trails and the ability to rebuild application state.

### Directory Structure
```
event-sourcing/
├── src/
│   ├── events/           # Event definitions
│   │   ├── userCreated.js
│   │   ├── userUpdated.js
│   │   └── userDeleted.js
│   ├── eventStore/      # Event store implementation
│   │   └── inMemoryEventStore.js
│   ├── models/         # Data models
│   │   └── user.js
│   ├── projections/    # Read models
│   │   └── userProjection.js
│   └── server.js      # Main application file
├── package.json
└── README.md
```

### Features
- Event store for storing all state changes
- Event replay capability
- Read models (projections)
- Event versioning
- Audit trail
- RESTful API endpoints
- Swagger documentation

## فارسی
این پیاده‌سازی الگوی Event Sourcing را با استفاده از Express.js و یک مخزن رویداد در حافظه نشان می‌دهد. Event Sourcing تمام تغییرات وضعیت برنامه را به عنوان یک دنباله از رویدادها ذخیره می‌کند که امکان ردیابی کامل و توانایی بازسازی وضعیت برنامه را فراهم می‌کند.

### ساختار دایرکتوری
```
event-sourcing/
├── src/
│   ├── events/           # تعاریف رویدادها
│   │   ├── userCreated.js
│   │   ├── userUpdated.js
│   │   └── userDeleted.js
│   ├── eventStore/      # پیاده‌سازی مخزن رویداد
│   │   └── inMemoryEventStore.js
│   ├── models/         # مدل‌های داده
│   │   └── user.js
│   ├── projections/    # مدل‌های خواندن
│   │   └── userProjection.js
│   └── server.js      # فایل اصلی برنامه
├── package.json
└── README.md
```

### ویژگی‌ها
- مخزن رویداد برای ذخیره تمام تغییرات وضعیت
- قابلیت پخش مجدد رویدادها
- مدل‌های خواندن (projections)
- نسخه‌بندی رویدادها
- ردیابی کامل
- نقاط پایانی API RESTful
- مستندات Swagger 