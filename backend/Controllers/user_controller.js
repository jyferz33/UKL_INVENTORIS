import { PrismaClient } from "@prisma/client";
import md5 from "md5";

const prisma = new PrismaClient();

export const getAllUser = async (req, res) => {
    try {
        const response = await prisma.user.findMany();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);  // Untuk debug error
        res.status(500).json({ msg: "Server error while fetching users." });
    }
};

export const getUserById = async (req, res) => {
    try {
        const result = await prisma.user.findUnique({
            where: {
                id_user: Number(req.params.id),
            },
        });

        if (!result) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        console.log(error);  // Untuk debug error
        res.status(400).json({ msg: "Error fetching user by ID." });
    }
};

export const addUser = async (req, res) => {
    try {
        const { nama_user, username, password, role } = req.body;

        // Validasi input untuk memastikan semua data ada
        if (!nama_user || !username || !password || !role) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Periksa jika username sudah terdaftar
        const existingUser = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (existingUser) {
            return res.status(400).json({ msg: "Username is already taken" });
        }

        // Hash password sebelum disimpan
        const hashedPassword = md5(password);

        // Membuat user baru
        const result = await prisma.user.create({
            data: {
                nama_user: nama_user,
                username: username,
                password: hashedPassword,
                role: role,
            },
        });

        res.status(201).json(result);
    } catch (error) {
        console.log(error);  // Untuk debug error
        res.status(500).json({ msg: "Error adding user." });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { nama_user, username, password, role } = req.body;

        // Validasi input
        if (!nama_user || !username || !password || !role) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Periksa apakah user ada
        const existingUser = await prisma.user.findUnique({
            where: {
                id_user: Number(req.params.id),
            },
        });

        if (!existingUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Hash password sebelum disimpan
        const hashedPassword = md5(password);

        // Update user
        const result = await prisma.user.update({
            where: {
                id_user: Number(req.params.id),
            },
            data: {
                nama_user: nama_user,
                username: username,
                password: hashedPassword,
                role: role,
            },
        });

        res.status(200).json(result);
    } catch (error) {
        console.log(error);  // Untuk debug error
        res.status(500).json({ msg: "Error updating user." });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const result = await prisma.user.delete({
            where: {
                id_user: Number(req.params.id),
            },
        });

        res.status(200).json(result);
    } catch (error) {
        console.log(error);  // Untuk debug error
        res.status(400).json({ msg: "Error deleting user." });
    }
};
