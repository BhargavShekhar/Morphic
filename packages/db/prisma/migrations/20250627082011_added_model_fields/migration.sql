/*
  Warnings:

  - You are about to drop the column `promt` on the `PackPrompts` table. All the data in the column will be lost.
  - Added the required column `prompt` to the `PackPrompts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ModelTraningStatusEnum" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "falAiReqId" TEXT,
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "traningStatus" "ModelTraningStatusEnum" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "triggerWord" TEXT;

-- AlterTable
ALTER TABLE "OutputImage" ADD COLUMN     "falAiReqId" TEXT,
ALTER COLUMN "imageUrl" SET DEFAULT '';

-- AlterTable
ALTER TABLE "PackPrompts" DROP COLUMN "promt",
ADD COLUMN     "prompt" TEXT NOT NULL;
