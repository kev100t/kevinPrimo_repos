import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StatesEnum } from './domain/enums/states.enum';
import { VerificationsEnum } from './domain/enums/verifications.enum';
import { MetricsRepository } from './metrics.repository';

@Injectable()
export class MetricsService {
	constructor(private readonly metricsRepository: MetricsRepository) {}

	async list(tribeId: string): Promise<any> {
		const tribeData = await this.metricsRepository.getTribe(tribeId);

		if (!tribeData) {
			throw new HttpException(
				{
					message: 'La Tribu no se encuentra registrada',
				},
				HttpStatus.BAD_REQUEST,
			);
		}

		const repositories = await this.metricsRepository.list(tribeId);

		const repositoryVerficiationData =
			await this.metricsRepository.listRepositoryVerifications();

		if (repositories.length === 0) {
			throw new HttpException(
				{
					message:
						'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
				},
				HttpStatus.BAD_REQUEST,
			);
		}

		for (const repository of repositories) {
			const metric = repository.metrics[0];

			const repositoryVerificationCode =
				repositoryVerficiationData.repositories.find(
					(repositoryVerification) =>
						repositoryVerification.id === repository.id,
				);

			repository.name = repository.name.trim();
			repository.organization = repository.tribe.organization.name.trim();
			repository.tribe = repository.tribe.name.trim();
			repository.coverage = metric.coverage;
			repository.codeSmells = metric.codeSmells;
			repository.bugs = metric.bugs;
			repository.vulnerabilities = metric.vulnerabilities;
			repository.hotspot = metric.hotspot;
			repository.state = StatesEnum[repository.state];
			repository.status = '';

			switch (repositoryVerificationCode.state) {
				case 604:
					repository.status = VerificationsEnum.VERIFIED;
					break;
				case 605:
					repository.status = VerificationsEnum.ON_HOLD;
					break;
				case 606:
					repository.status = VerificationsEnum.APPROVED;
					break;
			}

			delete repository.tribeId;
			delete repository.createTime;
			delete repository.metrics;
		}

		return {
			repositories: repositories,
		};
	}
}
