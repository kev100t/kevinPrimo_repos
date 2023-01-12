-- CreateTable
CREATE TABLE "Organization" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" CHAR(50) NOT NULL,
    "status" INT4 NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);
