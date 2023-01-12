import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrganizationDto } from './dto/organization-dto';
import { ulid } from 'ulid';
import { Organization } from '@prisma/client';

@Injectable()
export class OrganizationsRepository {
	constructor(private prisma: PrismaService) {}

	async create(organizationDto: OrganizationDto): Promise<Organization> {
		return await this.prisma.organization.create({
			data: {
				id: ulid(),
				name: organizationDto.name,
				status: organizationDto.status,
			},
		});
	}

	async update(id, organizationDto: OrganizationDto): Promise<Organization> {
		return await this.prisma.organization.update({
			where: {
				id,
			},
			data: {
				name: organizationDto.name,
				status: organizationDto.status,
			},
		});
	}

	async list(): Promise<Organization[]> {
		return await this.prisma.organization.findMany();
	}

	async delete(id): Promise<Organization> {
		return await this.prisma.organization.delete({
			where: {
				id,
			},
		});
	}

	async test(): Promise<void> {
		// await this.prisma.organization.create({
		// 	data: {
		// 		id: 'O1234561',
		// 		name: 'Org Test',
		// 		status: 1,
		// 	},
		// });
		// await this.prisma.tribe.createMany({
		// 	data: [
		// 		{
		// 			id: 'T1234561',
		// 			organizationId: 'O1234561',
		// 			name: 'Tribe 1',
		// 			status: 1,
		// 		},
		// 		{
		// 			id: 'T1234562',
		// 			organizationId: 'O1234561',
		// 			name: 'Tribe 2',
		// 			status: 1,
		// 		},
		// 	],
		// });
		// await this.prisma.repository.createMany({
		// 	data: [
		// 		{
		// 			id: '1',
		// 			tribeId: 'T1234561',
		// 			name: 'Repository 1',
		// 			state: 'E',
		// 			createTime: new Date(),
		// 			status: 'A',
		// 		},
		// 		{
		// 			id: '2',
		// 			tribeId: 'T1234562',
		// 			name: 'Repository 1',
		// 			state: 'E',
		// 			createTime: new Date(),
		// 			status: 'A',
		// 		},
		// 	],
		// });
		// await this.prisma.metric.deleteMany();
		// await this.prisma.metric.createMany({
		// 	data: [
		// 		{
		// 			repositoryId: '1',
		// 			coverage: 90,
		// 			bugs: 10,
		// 			vulnerabilities: 10,
		// 			hotspot: 2,
		// 			codeSmells: 20,
		// 		},
		// 		{
		// 			repositoryId: '2',
		// 			coverage: 50,
		// 			bugs: 2,
		// 			vulnerabilities: 5,
		// 			hotspot: 0,
		// 			codeSmells: 10,
		// 		},
		// 	],
		// });
	}
}
