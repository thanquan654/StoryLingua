-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('AVATAR_FRAME', 'MASCOT_SKIN', 'CARD_THEME', 'ENERGY_MAX_UPGRADE', 'ENERGY_REFILL');

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "display_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100),
    "password_hash" VARCHAR(255),
    "google_id" TEXT,
    "avatar_url" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "hashed_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "user_id" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "current_xp" INTEGER NOT NULL DEFAULT 0,
    "gold" INTEGER NOT NULL DEFAULT 0,
    "streak_count" INTEGER NOT NULL DEFAULT 0,
    "last_study_date" TIMESTAMPTZ,
    "energy" INTEGER NOT NULL DEFAULT 5,
    "max_energy" INTEGER NOT NULL DEFAULT 5,
    "current_avatar_frame_id" TEXT,
    "current_mascot_skin_id" TEXT,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "stories" (
    "story_id" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content_json" JSONB NOT NULL,
    "raw_content" TEXT,
    "genre" VARCHAR(50),
    "difficulty_level" VARCHAR(20),
    "is_ai_generated" BOOLEAN NOT NULL DEFAULT false,
    "user_prompt" TEXT,
    "creator_id" TEXT,
    "cover_image" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stories_pkey" PRIMARY KEY ("story_id")
);

-- CreateTable
CREATE TABLE "vocabularies" (
    "vocab_id" TEXT NOT NULL,
    "word" VARCHAR(100) NOT NULL,
    "general_meaning" TEXT,
    "ipa" VARCHAR(100),
    "audio_url" VARCHAR(255),
    "pos" VARCHAR(20),

    CONSTRAINT "vocabularies_pkey" PRIMARY KEY ("vocab_id")
);

-- CreateTable
CREATE TABLE "user_flashcards" (
    "card_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vocab_id" TEXT NOT NULL,
    "source_story_id" TEXT,
    "meaning_in_context" TEXT NOT NULL,
    "context_sentence" TEXT,
    "state" INTEGER NOT NULL DEFAULT 0,
    "stability" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "difficulty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "elapsed_days" INTEGER NOT NULL DEFAULT 0,
    "scheduled_days" INTEGER NOT NULL DEFAULT 0,
    "retrievability" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "last_review" TIMESTAMPTZ,
    "due_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_mastered" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_flashcards_pkey" PRIMARY KEY ("card_id")
);

-- CreateTable
CREATE TABLE "review_logs" (
    "log_id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review_duration" INTEGER,
    "reviewed_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_logs_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "items" (
    "item_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "type" "ItemType" NOT NULL,
    "price" INTEGER NOT NULL,
    "image_url" VARCHAR(255),
    "properties" JSONB,
    "is_ai_generated_reward" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "items_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "user_inventory" (
    "inventory_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "is_equipped" BOOLEAN NOT NULL DEFAULT false,
    "acquired_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_inventory_pkey" PRIMARY KEY ("inventory_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_hashed_token_key" ON "refresh_tokens"("hashed_token");

-- CreateIndex
CREATE INDEX "stories_title_idx" ON "stories"("title");

-- CreateIndex
CREATE UNIQUE INDEX "vocabularies_word_key" ON "vocabularies"("word");

-- CreateIndex
CREATE INDEX "vocabularies_word_idx" ON "vocabularies"("word");

-- CreateIndex
CREATE INDEX "user_flashcards_user_id_due_date_idx" ON "user_flashcards"("user_id", "due_date");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_flashcards" ADD CONSTRAINT "user_flashcards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_flashcards" ADD CONSTRAINT "user_flashcards_vocab_id_fkey" FOREIGN KEY ("vocab_id") REFERENCES "vocabularies"("vocab_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_flashcards" ADD CONSTRAINT "user_flashcards_source_story_id_fkey" FOREIGN KEY ("source_story_id") REFERENCES "stories"("story_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_logs" ADD CONSTRAINT "review_logs_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "user_flashcards"("card_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_inventory" ADD CONSTRAINT "user_inventory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_inventory" ADD CONSTRAINT "user_inventory_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;
