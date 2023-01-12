import { Injectable } from '@nestjs/common';
import { OrganizationDto } from './dto/organization-dto';
import { OrganizationEntity } from './entities/organization.entity';
import { OrganizationsRepository } from './organizations.repository';

@Injectable()
export class OrganizationsService {
	constructor(
		private readonly organizationsRepository: OrganizationsRepository,
	) {}

	async create(organizationDto: OrganizationDto): Promise<OrganizationEntity> {
		return await this.organizationsRepository.create(organizationDto);
	}

	async update(
		id: string,
		organizationDto: OrganizationDto,
	): Promise<OrganizationEntity> {
		return await this.organizationsRepository.update(id, organizationDto);
	}

	async list(): Promise<OrganizationEntity[]> {
		return await this.organizationsRepository.list();
	}

	async delete(id: string): Promise<OrganizationEntity> {
		return await this.organizationsRepository.delete(id);
	}

	async test(): Promise<void> {
		await this.organizationsRepository.test();
	}
}
