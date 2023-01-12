import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RepositoryVerificationsRepository } from 'src/repository-verifications/repository-verifications.repository';
import { RepositoryVerificationsService } from 'src/repository-verifications/repository-verifications.service';
import { MetricsController } from './metrics.controller';
import { MetricsRepository } from './metrics.repository';
import { MetricsService } from './metrics.service';

@Module({
	imports: [],
	controllers: [MetricsController],
	providers: [
		MetricsService,
		MetricsRepository,
		RepositoryVerificationsService,
		RepositoryVerificationsRepository,
		PrismaService,
	],
	exports: [MetricsService, MetricsRepository],
})
export class MetricsModule {}
