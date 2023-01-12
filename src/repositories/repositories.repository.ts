import { Injectable } from '@nestjs/common';
import { Tribe } from '@prisma/client';
import { RepositoryVerificationEntity } from 'src/repository-verifications/entities/repository-verification.entity';
import { RepositoryVerificationsService } from 'src/repository-verifications/repository-verifications.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MetricsRepository {
	constructor(
		private prisma: PrismaService,
		private repositoryVerficiations: RepositoryVerificationsService,
	) {}

	async list(tribeId: string): Promise<any> {
		const currentYearCondition = new Date().getFullYear();
		const stateCondition = 'E';
		const coverageCondition = 75;

		return await this.prisma.repository.findMany({
			where: {
				tribeId: tribeId,
				createTime: {
					gte: new Date(currentYearCondition, 0, 1),
					lt: new Date(currentYearCondition + 1, 0, 1),
				},
				state: stateCondition,
				metrics: {
					some: {
						coverage: {
							gt: coverageCondition,
						},
					},
				},
			},
			include: {
				tribe: {
					include: {
						organization: true,
					},
				},
				metrics: true,
			},
		});
	}

	async listRepositoryVerifications(): Promise<{
		repositories: RepositoryVerificationEntity[];
	}> {
		return await this.repositoryVerficiations.list();
	}

	async getTribe(tribeId: string): Promise<Tribe> {
		return await this.prisma.tribe.findUnique({
			where: {
				id: tribeId,
			},
		});
	}
}
