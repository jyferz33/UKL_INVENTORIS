/*
  Warnings:

  - You are about to alter the column `status` on the `peminjaman` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to drop the column `peminjaman` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- DropIndex
DROP INDEX `Peminjaman_id_user_fkey` ON `peminjaman`;

-- AlterTable
ALTER TABLE `peminjaman` MODIFY `status` ENUM('DIPINJAM', 'DIKEMBALIKAN') NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `peminjaman`,
    MODIFY `role` ENUM('ADMIN', 'MEMBER') NOT NULL DEFAULT 'MEMBER';

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
