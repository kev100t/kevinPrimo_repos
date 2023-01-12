import { Module } from '@nestjs/common';
import { RepositoryVerificationsController } from './repository-verifications.controller';
import { RepositoryVerificationsRepository } from './repository-verifications.repository';
import { RepositoryVerificationsService } from './repository-verifications.service';

@Module({
	imports: [],
	controllers: [RepositoryVerificationsController],
	providers: [
		RepositoryVerificationsService,
		RepositoryVerificationsRepository,
	],
	exports: [RepositoryVerificationsService, RepositoryVerificationsRepository],
})
export class RepositoryVerificationsModule {}
