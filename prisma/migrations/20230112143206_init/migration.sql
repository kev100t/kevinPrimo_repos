/*
  Warnings:

  - You are about to alter the column `id` on the `Organization` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Tribe` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `organizationId` on the `Tribe` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `repositoryId` on the `Metric` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Repository` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `tribeId` on the `Repository` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Organization" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" CHAR(50) NOT NULL,
    "status" INT4 NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Organization" ("id","name","status") SELECT "id","name","status" FROM "Organization";
DROP TABLE "Organization" CASCADE;
ALTER TABLE "_prisma_new_Organization" RENAME TO "Organization";
CREATE TABLE "_prisma_new_Tribe" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "organizationId" INT8 NOT NULL,
    "name" CHAR(50) NOT NULL,
    "status" INT4 NOT NULL,

    CONSTRAINT "Tribe_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Tribe" ("id","name","organizationId","status") SELECT "id","name","organizationId","status" FROM "Tribe";
DROP TABLE "Tribe" CASCADE;
ALTER TABLE "_prisma_new_Tribe" RENAME TO "Tribe";
ALTER TABLE "Tribe" ADD CONSTRAINT "Tribe_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_Metric" (
    "repositoryId" INT8 NOT NULL,
    "coverage" FLOAT8 NOT NULL,
    "bugs" INT4 NOT NULL,
    "vulnerabilities" INT4 NOT NULL,
    "hotspot" INT4 NOT NULL,
    "codeSmells" INT4 NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("repositoryId")
);
INSERT INTO "_prisma_new_Metric" ("bugs","codeSmells","coverage","hotspot","repositoryId","vulnerabilities") SELECT "bugs","codeSmells","coverage","hotspot","repositoryId","vulnerabilities" FROM "Metric";
DROP TABLE "Metric" CASCADE;
ALTER TABLE "_prisma_new_Metric" RENAME TO "Metric";
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_Repository" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "tribeId" INT8 NOT NULL,
    "name" CHAR(50) NOT NULL,
    "state" CHAR(1) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL,
    "status" CHAR(1) NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Repository" ("createTime","id","name","state","status","tribeId") SELECT "createTime","id","name","state","status","tribeId" FROM "Repository";
DROP TABLE "Repository" CASCADE;
ALTER TABLE "_prisma_new_Repository" RENAME TO "Repository";
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_tribeId_fkey" FOREIGN KEY ("tribeId") REFERENCES "Tribe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
