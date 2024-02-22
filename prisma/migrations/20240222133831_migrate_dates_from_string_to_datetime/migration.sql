/*
  Warnings:

  - You are about to alter the column `endTime` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `startTime` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT,
    "name" TEXT NOT NULL,
    "endTime" DATETIME NOT NULL,
    "startTime" DATETIME NOT NULL,
    "url" TEXT,
    "nationId" INTEGER NOT NULL,
    CONSTRAINT "Event_nationId_fkey" FOREIGN KEY ("nationId") REFERENCES "Nation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("description", "endTime", "id", "name", "nationId", "startTime", "url") SELECT "description", "endTime", "id", "name", "nationId", "startTime", "url" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
