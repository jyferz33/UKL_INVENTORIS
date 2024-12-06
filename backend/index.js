import express from 'express';
import cors from 'cors';
import auth_route from './Routes/auth_route.js';
import barang_route from './Routes/barang_route.js';
import peminjaman_route from './Routes/peminjaman_route (1).js';
import user_route from './Routes/user_route.js';

const app = express();

app.use(express.json());
app.use(cors());

// Middleware untuk logging
app.use((req, res, next) => {
    console.log(`Request URL: ${req.originalUrl}, Method: ${req.method}`);
    next();
});

// Register routes
app.use('/api/auth', auth_route);
app.use('/api/barang', barang_route);
app.use('/api/peminjaman', peminjaman_route);
app.use('/api/users', user_route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
