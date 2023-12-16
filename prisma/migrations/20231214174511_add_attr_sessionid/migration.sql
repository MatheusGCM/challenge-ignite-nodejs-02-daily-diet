/*
  Warnings:

  - You are about to drop the column `user_id` on the `meals` table. All the data in the column will be lost.
  - The required column `session_id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_session_id` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session_id" TEXT NOT NULL
);
INSERT INTO "new_users" ("created_at", "email", "id", "name", "password_hash") SELECT "created_at", "email", "id", "name", "password_hash" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_session_id_key" ON "users"("session_id");
CREATE TABLE "new_meals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "isOnDiet" BOOLEAN NOT NULL,
    "user_session_id" TEXT NOT NULL,
    CONSTRAINT "meals_user_session_id_fkey" FOREIGN KEY ("user_session_id") REFERENCES "users" ("session_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_meals" ("date", "description", "id", "isOnDiet", "name", "time") SELECT "date", "description", "id", "isOnDiet", "name", "time" FROM "meals";
DROP TABLE "meals";
ALTER TABLE "new_meals" RENAME TO "meals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
