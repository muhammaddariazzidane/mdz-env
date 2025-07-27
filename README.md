### 💡 Tentang mdz-env
<b>mdz-env</b> adalah sebuah utilitas JavaScript/TypeScript yang ringan dan type-safe untuk mem-parsing (mengurai) environment variables di aplikasi Node.js.

Seringkali, environment variables (seperti process.env.PORT atau process.env.DEBUG) selalu berupa string. <b>mdz-env</b> hadir untuk mempermudah Anda mengambil nilai-nilai ini dan mengkonversikannya ke tipe data yang benar (string, number, boolean) dengan aman, serta mendukung nilai default dan validasi required.

---

### ✨ Fitur Utama
<b>Type-Safe</b>: Otomatis mengkonversi string menjadi number atau boolean, dengan type inference yang tepat berkat TypeScript.

<b>Default Values</b>: Sediakan nilai default yang akan digunakan jika environment variable tidak ditemukan atau kosong.

<b>Required Check</b>: Dapatkan error langsung jika environment variable yang kritis tidak disetel.

<b>Ringan</b>: Tanpa dependencies eksternal, menjaga ukuran package tetap kecil.

<b>Intuitive API</b>: Desain API yang mudah dibaca dan digunakan.

---

### 🚀 Instalasi
Instal mdz-env ke proyek Anda menggunakan manajer package favorit Anda:


##### Menggunakan pnpm
```bash
pnpm add mdz-env
```

##### Menggunakan npm
```bash
npm install mdz-env
```

##### Menggunakan yarn
```bash
yarn add mdz-env
```
---

### 📖 Penggunaan (Usage)
Impor <b>mdzEnv</b> dan gunakan fungsi-fungsi string, number, atau boolean untuk mengambil environment variable Anda.

```typescript
// app.ts atau config.ts
import { mdzEnv } from 'mdz-env';

// Mengambil string dengan nilai default
const NODE_ENV = mdzEnv.string('NODE_ENV', { defaultValue: 'development' });
console.log(`Aplikasi berjalan di mode: ${NODE_ENV}`); // Contoh: 'development' atau 'production'

// Mengambil angka dengan nilai default
const PORT = mdzEnv.number('PORT', { defaultValue: 3000 });
console.log(`Server mendengarkan di port: ${PORT}`); // Contoh: 3000 atau 8080

// Mengambil boolean (nilai 'true', '1', 'on' akan menjadi true, lainnya false)
const DEBUG_MODE = mdzEnv.boolean('DEBUG_MODE');
console.log(`Mode Debug: ${DEBUG_MODE ? 'Aktif' : 'Nonaktif'}`); // Contoh: true atau false
```

#### Opsi
<i>required</i>

Anda dapat menandai sebuah environment variable sebagai wajib (required: true). Jika variabel tersebut tidak ada atau kosong, mdz-env akan melempar error, yang membantu Anda menangani konfigurasi yang hilang sejak awal

```typescript
import { mdzEnv } from 'mdz-env';

try {
  // Jika DB_HOST tidak disetel, ini akan melempar error
  const DB_HOST = mdzEnv.string('DB_HOST', { required: true });
  console.log('Database Host:', DB_HOST);

  const API_KEY = mdzEnv.string('API_KEY', { required: true });
  console.log('API Key:', API_KEY);

} catch (error: any) {
  console.error(`🚨 Kesalahan Konfigurasi: ${error.message}`);
  // Contoh output: "🚨 Kesalahan Konfigurasi: Environment variable "DB_HOST" is required but not set."
  process.exit(1); // Hentikan aplikasi jika konfigurasi kritis hilang
}
```

#### 📦 API Referensi
Objek mdzEnv menyediakan tiga fungsi utama:

```typescript
mdzEnv.string(key: string, options?: EnvOptions<string>): string
```
Mengambil environment variable sebagai string.

- <b>key</b>: Nama environment variable (misal: 'APP_NAME').

- <b>options</b>: Objek opsional dengan:
    - <b>defaultValue?: string</b>: Nilai yang akan dikembalikan - jika variabel tidak disetel atau kosong.
    - <b>required?: boolean</b>: Jika true, akan melempar error jika variabel tidak disetel atau kosong.

- <b>Return</b>: Nilai string dari variabel.

```typescript
mdzEnv.number(key: string, options?: EnvOptions<number>): number
```
Mengambil environment variable sebagai number.

- <b>key</b>: Nama environment variable (misal: 'PORT').

- <b>options</b>: Objek opsional dengan:

  - <b>defaultValue?: number</b>: Nilai yang akan dikembalikan jika variabel tidak disetel.

  - <b>required?: boolean</b>: Jika true, akan melempar error jika variabel tidak disetel.

- <b>Return</b>: Nilai angka dari variabel.

- <b>Catatan</b>: Akan melempar error jika variabel disetel tetapi bukan angka yang valid.

```typescript
mdzEnv.boolean(key: string, options?: EnvOptions<boolean>): boolean
```

Mengambil environment variable sebagai boolean.
- <b>key</b>: Nama environment variable (misal: 'DEBUG_MODE').
- <b>Nilai yang dianggap true (case-insensitive)</b>: 'true', '1', 'on'.

- <b>Semua nilai lain dianggap false</b> (termasuk string kosong atau variabel yang tidak disetel).

- <b>options</b>: Objek opsional dengan:

  - <b>defaultValue?: boolean</b>: Nilai yang akan dikembalikan jika variabel tidak disetel atau kosong.

  - <b>required?</b>: boolean: Jika true, akan melempar error jika variabel tidak disetel atau kosong.

- <b>Return</b>: Nilai boolean dari variabel.
---

### 🤝 Kontribusi
Sangat disambut baik untuk berkontribusi pada proyek ini! Jika Anda menemukan bug atau memiliki ide untuk fitur baru, silakan buka issue atau buat pull request.

---

### 👨‍💻 Penulis
[Muhammad Dariaz Zidane](https://dariazzidane.vercel.app)

