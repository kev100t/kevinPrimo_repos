import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';

@Module({
	imports: [],
	controllers: [OrganizationsController],
	providers: [OrganizationsService, OrganizationsRepository, PrismaService],
	exports: [OrganizationsService, OrganizationsRepository],
})
export class OrganizationsModule {}
