// client.js
const { PrismaClient } = require('@prisma/client');

// Membuat instance PrismaClient
const prisma = new PrismaClient();

// Mengekspos prisma agar bisa digunakan di file lain
module.exports = prisma;
