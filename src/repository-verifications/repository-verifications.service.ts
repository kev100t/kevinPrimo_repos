import { Injectable } from '@nestjs/common';
import { RepositoryVerificationEntity } from './entities/repository-verification.entity';
import { RepositoryVerificationsRepository } from './repository-verifications.repository';

@Injectable()
export class RepositoryVerificationsService {
	constructor(
		private readonly repositoryVerificationsRepository: RepositoryVerificationsRepository,
	) {}

	async list(): Promise<{ repositories: RepositoryVerificationEntity[] }> {
		const repositoryVerifications =
			await this.repositoryVerificationsRepository.list();

		return {
			repositories: repositoryVerifications,
		};
	}
}
