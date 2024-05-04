/*
  Warnings:

  - You are about to drop the `products_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products_user" DROP CONSTRAINT "products_user_productId_fkey";

-- DropForeignKey
ALTER TABLE "products_user" DROP CONSTRAINT "products_user_userId_fkey";

-- DropTable
DROP TABLE "products_user";

-- CreateTable
CREATE TABLE "user_product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "user_product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_product" ADD CONSTRAINT "user_product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_product" ADD CONSTRAINT "user_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
