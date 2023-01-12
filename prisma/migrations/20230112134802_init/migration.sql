-- CreateTable
CREATE TABLE "Repository" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "tribeId" INT4 NOT NULL,
    "name" CHAR(50) NOT NULL,
    "state" CHAR(1) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL,
    "status" CHAR(1) NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metric" (
    "repositoryId" INT4 NOT NULL,
    "coverage" FLOAT8 NOT NULL,
    "bugs" INT4 NOT NULL,
    "vulnerabilities" INT4 NOT NULL,
    "hotspot" INT4 NOT NULL,
    "codeSmells" INT4 NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("repositoryId")
);

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_tribeId_fkey" FOREIGN KEY ("tribeId") REFERENCES "Tribe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
