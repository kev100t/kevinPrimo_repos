-- CreateTable
CREATE TABLE "Tribe" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "organizationId" INT4 NOT NULL,
    "name" CHAR(50) NOT NULL,
    "status" INT4 NOT NULL,

    CONSTRAINT "Tribe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tribe" ADD CONSTRAINT "Tribe_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
