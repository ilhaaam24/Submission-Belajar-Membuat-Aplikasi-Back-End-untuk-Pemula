1. Clone Project
Clone repository dari GitHub atau lokasi lain ke komputer kamu:

bash
Salin kode
git clone <URL-repository>
Gantilah <URL-repository> dengan URL yang sesuai dari repository proyekmu.

2. Masuk ke Directory Project
Setelah clone selesai, masuk ke direktori proyek:

bash
Salin kode
cd <nama-folder-project>
Gantilah <nama-folder-project> dengan nama folder yang baru saja di-clone.

3. Install Dependencies
Instal semua dependencies yang diperlukan oleh project dengan menjalankan perintah berikut:

bash
Salin kode
npm install
4. Konfigurasi ESLint (Opsional)
Jika kamu ingin memastikan kode sesuai dengan aturan yang telah ditetapkan, jalankan ESLint:

bash
Salin kode
npx eslint .
5. Jalankan Aplikasi
Untuk menjalankan aplikasi, gunakan perintah berikut:

bash
Salin kode
npm start
Atau jika menggunakan Hapi.js dengan script tertentu:

bash
Salin kode
node src/index.js
Pastikan file index.js adalah entry point yang benar.

6. Testing API
Jika aplikasi sudah berjalan, kamu bisa menguji API menggunakan koleksi Postman yang disebutkan:

Buka Postman.
Import koleksi BookshelfAPITestCollectionAndEnvironment/BookshelfAPITestCollectionAndEnvironment.
Jalankan semua request dalam koleksi tersebut untuk memastikan semuanya berjalan dengan baik.
