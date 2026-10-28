import app from './app.js';
import { cekKoneksiDatabase } from './db.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await cekKoneksiDatabase();
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error('Gagal menjalankan server karena database error:', e.message);
    process.exit(1);
  }
}

startServer();