# Project Architecture

## Stack

- **Runtime:** Node.js (ESM — `"type": "module"`)
- **Framework:** Express.js v5
- **Database:** PostgreSQL + Knex.js (query builder + migrations)
- **Validation:** Zod
- **Auth:** JWT (jsonwebtoken)

---

## Directory Structure

```
src/
├── config/
│   ├── db.js          # Knex bağlantısı
│   └── env.js         # Tüm environment değişkenleri tek yerden
├── middlewares/
│   ├── auth.middleware.js      # JWT doğrulama
│   ├── validate.middleware.js  # Zod şema doğrulama
│   └── error.middleware.js     # Global hata yakalama
├── modules/
│   └── <module>/
│       ├── <module>.repository.js  # Sadece DB sorguları (Knex)
│       ├── <module>.service.js     # İş mantığı, hata fırlatma
│       ├── <module>.controller.js  # HTTP katmanı, next(err) kullanımı
│       ├── <module>.router.js      # Route tanımları + middleware ataması
│       └── <module>.schema.js      # Zod şemaları (create / update)
├── utils/
│   ├── errors.js      # Custom HTTP exception sınıfları
│   └── response.js    # sendSuccess / sendError yardımcıları
├── app.js             # Express kurulumu, route kayıtları
└── server.js          # DB bağlantısı + sunucu başlatma

db/
└── migrations/        # Knex migration dosyaları
```

---

## Request Akışı

```
HTTP Request
    → Router (authenticate?, validate?)
        → Controller (try/catch → next(err))
            → Service (iş mantığı, custom error fırlatma)
                → Repository (DB sorgusu)
            ← Service
        ← Controller
    ← Router
← HTTP Response

Hata durumunda:
    Service → throw new NotFoundError(...)
    Controller → next(err)
    errorHandler middleware → JSON response
```

---

## Custom HTTP Exceptions

`src/utils/errors.js` içinde tanımlı — hepsini `AppError`'dan extend eder:

| Sınıf | HTTP Status |
|---|---|
| `BadRequestError` | 400 |
| `UnauthorizedError` | 401 |
| `ForbiddenError` | 403 |
| `NotFoundError` | 404 |
| `ConflictError` | 409 |
| `InternalServerError` | 500 |

**Kullanım:**
```js
import { NotFoundError, ConflictError } from '../../utils/errors.js';

throw new NotFoundError('User not found');
throw new ConflictError('Email already in use');
```

`errorHandler` middleware `AppError` instance'larını yakalar ve doğru HTTP status ile döner. Diğer tüm hatalar otomatik olarak 500 döner.

---

## Yeni Modül Oluşturma

### 1. Migration

```bash
npm run migrate:make -- create_<table>
```

Oluşturulan dosyayı doldur:

```js
export const up = (knex) =>
  knex.schema.createTable('<table>', (t) => {
    t.increments('id').primary();
    // kolonlar...
    t.timestamps(true, true);
  });

export const down = (knex) => knex.schema.dropTable('<table>');
```

```bash
npm run migrate
```

### 2. Modül Dosyaları

`src/modules/<module>/` altında 5 dosya oluştur:

**`<module>.repository.js`** — Sadece Knex sorguları, iş mantığı yok:
```js
import { db } from '../../config/db.js';

const TABLE = '<table>';

export const fooRepository = {
  findAll: () => db(TABLE).select('*'),
  findById: (id) => db(TABLE).where({ id }).first(),
  create: (data) => db(TABLE).insert(data).returning('*').then((r) => r[0]),
  update: (id, data) => db(TABLE).where({ id }).update(data).returning('*').then((r) => r[0]),
  remove: (id) => db(TABLE).where({ id }).del(),
};
```

**`<module>.service.js`** — İş mantığı, custom error fırlatma:
```js
import { fooRepository } from './foo.repository.js';
import { NotFoundError } from '../../utils/errors.js';

export const fooService = {
  getById: async (id) => {
    const item = await fooRepository.findById(id);
    if (!item) throw new NotFoundError('Foo not found');
    return item;
  },
};
```

**`<module>.controller.js`** — HTTP katmanı, her zaman `next(err)`:
```js
import { fooService } from './foo.service.js';
import { sendSuccess } from '../../utils/response.js';

export const fooController = {
  getById: async (req, res, next) => {
    try {
      const item = await fooService.getById(Number(req.params.id));
      sendSuccess(res, item);
    } catch (err) {
      next(err);
    }
  },
};
```

**`<module>.schema.js`** — Zod şemaları:
```js
import { z } from 'zod';

export const createFooSchema = z.object({
  name: z.string().min(1),
});
```

**`<module>.router.js`** — Route tanımları:
```js
import { Router } from 'express';
import { fooController } from './foo.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createFooSchema } from './foo.schema.js';

const router = Router();

router.use(authenticate);
router.get('/:id', fooController.getById);
router.post('/', validate(createFooSchema), fooController.create);

export default router;
```

### 3. app.js'e Kaydet

```js
import fooRouter from './modules/foo/foo.router.js';
// ...
app.use('/api/foos', fooRouter);
```

---

## Faydalı Komutlar

```bash
npm run dev               # Sunucuyu --watch modunda başlat
npm run migrate           # Bekleyen migration'ları çalıştır
npm run migrate:rollback  # Son migration'ı geri al
npm run migrate:make -- create_<table>  # Yeni migration dosyası oluştur
```
