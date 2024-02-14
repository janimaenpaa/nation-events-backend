-- CreateTable
CREATE TABLE "Nation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "abbreviation" TEXT NOT NULL,
    "customCalendarUrl" TEXT,
    "googleCalendarId" TEXT,
    "icalUrl" TEXT,
    "kideUrl" TEXT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT,
    "name" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "url" TEXT,
    "nationId" INTEGER NOT NULL,
    CONSTRAINT "Event_nationId_fkey" FOREIGN KEY ("nationId") REFERENCES "Nation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
