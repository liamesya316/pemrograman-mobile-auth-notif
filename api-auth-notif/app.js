import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import notifRouter from './routes/notifications.js';
import { cekKoneksiDatabase } from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

// Hubungkan router autentikasi dan notifikasi
app.use('/auth', authRouter);
app.use('/notifications', notifRouter);

app.get('/', async (req, res) => {
  try {
    await cekKoneksiDatabase();
    res.json({ pesan: 'API Auth & Notif aktif dan terhubung ke database' });
  } catch (e) {
    res.status(500).json({ pesan: 'koneksi database gagal', error: e.message });
  }
});

export default app;