/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_hash_key" ON "products"("hash");
