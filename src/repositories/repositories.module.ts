import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RepositoryVerificationsRepository } from 'src/repository-verifications/repository-verifications.repository';
import { RepositoryVerificationsService } from 'src/repository-verifications/repository-verifications.service';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesRepository } from './repositories.repository';
import { RepositoriesService } from './repositories.service';

@Module({
	imports: [],
	controllers: [RepositoriesController],
	providers: [
		RepositoriesService,
		RepositoriesRepository,
		RepositoryVerificationsService,
		RepositoryVerificationsRepository,
		PrismaService,
	],
	exports: [RepositoriesService, RepositoriesRepository],
})
export class RepositoriesModule {}
