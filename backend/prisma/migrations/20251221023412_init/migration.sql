/*
  Warnings:

  - The values [ENERGY_MAX_UPGRADE] on the enum `ItemType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `difficulty_level` on the `stories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(2)`.
  - You are about to drop the column `retrievability` on the `user_flashcards` table. All the data in the column will be lost.
  - The `state` column on the `user_flashcards` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `is_equipped` on the `user_inventory` table. All the data in the column will be lost.
  - You are about to drop the column `current_avatar_frame_id` on the `user_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `current_mascot_skin_id` on the `user_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `max_energy` on the `user_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `general_meaning` on the `vocabularies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,item_id]` on the table `user_inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[word,pos]` on the table `vocabularies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `difficulty` to the `review_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `elapsed_days` to the `review_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduled_days` to the `review_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stability` to the `review_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `review_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `review_logs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StoryStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'PRIVATE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'FILL_IN_THE_BLANK', 'MATCHING', 'SORTING');

-- CreateEnum
CREATE TYPE "CardState" AS ENUM ('NEW', 'LEARNING', 'REVIEW', 'RELEARNING');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('GOLD');

-- AlterEnum
BEGIN;
CREATE TYPE "ItemType_new" AS ENUM ('AVATAR_FRAME', 'MASCOT_SKIN', 'CARD_THEME', 'COLLECTION_FRAME', 'ENERGY_REFILL', 'STREAK_FREEZE', 'DOUBLE_XP_1H');
ALTER TABLE "items" ALTER COLUMN "type" TYPE "ItemType_new" USING ("type"::text::"ItemType_new");
ALTER TYPE "ItemType" RENAME TO "ItemType_old";
ALTER TYPE "ItemType_new" RENAME TO "ItemType";
DROP TYPE "public"."ItemType_old";
COMMIT;

-- DropIndex
DROP INDEX "vocabularies_word_key";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'GOLD',
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "original_price" INTEGER,
ADD COLUMN     "sale_end_at" TIMESTAMPTZ,
ADD COLUMN     "sale_start_at" TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "review_logs" ADD COLUMN     "difficulty" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "elapsed_days" INTEGER NOT NULL,
ADD COLUMN     "scheduled_days" INTEGER NOT NULL,
ADD COLUMN     "stability" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "state" "CardState" NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stories" ADD COLUMN     "reading_time" INTEGER,
ADD COLUMN     "status" "StoryStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "word_count" INTEGER,
ALTER COLUMN "difficulty_level" SET DATA TYPE VARCHAR(2);

-- AlterTable
ALTER TABLE "user_flashcards" DROP COLUMN "retrievability",
ADD COLUMN     "note" TEXT,
ALTER COLUMN "meaning_in_context" DROP NOT NULL,
DROP COLUMN "state",
ADD COLUMN     "state" "CardState" NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "user_inventory" DROP COLUMN "is_equipped",
ADD COLUMN     "expires_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user_profiles" DROP COLUMN "current_avatar_frame_id",
DROP COLUMN "current_mascot_skin_id",
DROP COLUMN "max_energy",
ADD COLUMN     "lastEnergyUpdate" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "vocabularies" DROP COLUMN "general_meaning",
ADD COLUMN     "definition" TEXT,
ADD COLUMN     "example_sentence" TEXT;

-- CreateTable
CREATE TABLE "user_appearances" (
    "user_id" TEXT NOT NULL,
    "avatar_frame_id" TEXT,
    "mascot_skin_id" TEXT,
    "flashcard_theme_id" TEXT,
    "collection_frame_id" TEXT,

    CONSTRAINT "user_appearances_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "questions" (
    "question_id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL DEFAULT 'MULTIPLE_CHOICE',
    "content" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "explanation" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "user_story_histories" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "quiz_score" INTEGER,
    "last_read_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMPTZ,

    CONSTRAINT "user_story_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_story_histories_user_id_story_id_key" ON "user_story_histories"("user_id", "story_id");

-- CreateIndex
CREATE INDEX "items_type_idx" ON "items"("type");

-- CreateIndex
CREATE INDEX "review_logs_user_id_reviewed_at_idx" ON "review_logs"("user_id", "reviewed_at");

-- CreateIndex
CREATE INDEX "stories_genre_idx" ON "stories"("genre");

-- CreateIndex
CREATE INDEX "stories_difficulty_level_idx" ON "stories"("difficulty_level");

-- CreateIndex
CREATE UNIQUE INDEX "user_inventory_user_id_item_id_key" ON "user_inventory"("user_id", "item_id");

-- CreateIndex
CREATE UNIQUE INDEX "vocabularies_word_pos_key" ON "vocabularies"("word", "pos");

-- AddForeignKey
ALTER TABLE "user_appearances" ADD CONSTRAINT "user_appearances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_appearances" ADD CONSTRAINT "user_appearances_avatar_frame_id_fkey" FOREIGN KEY ("avatar_frame_id") REFERENCES "items"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_appearances" ADD CONSTRAINT "user_appearances_mascot_skin_id_fkey" FOREIGN KEY ("mascot_skin_id") REFERENCES "items"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_appearances" ADD CONSTRAINT "user_appearances_flashcard_theme_id_fkey" FOREIGN KEY ("flashcard_theme_id") REFERENCES "items"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_appearances" ADD CONSTRAINT "user_appearances_collection_frame_id_fkey" FOREIGN KEY ("collection_frame_id") REFERENCES "items"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("story_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_story_histories" ADD CONSTRAINT "user_story_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_story_histories" ADD CONSTRAINT "user_story_histories_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("story_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_logs" ADD CONSTRAINT "review_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
