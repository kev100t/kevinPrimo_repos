import { Injectable } from '@nestjs/common';
import { OrganizationDto } from './dto/organization-dto';
import { OrganizationsRepository } from './organizations.repository';

@Injectable()
export class OrganizationsService {
	constructor(
		private readonly organizationsRepository: OrganizationsRepository,
	) {}

	async create(organizationDto: OrganizationDto): Promise<any> {
		return await this.organizationsRepository.create(organizationDto);
	}

	async update(id: string, organizationDto: OrganizationDto): Promise<any> {
		return await this.organizationsRepository.update(id, organizationDto);
	}

	async list(): Promise<any> {
		return await this.organizationsRepository.list();
	}

	async delete(id: string): Promise<any> {
		return await this.organizationsRepository.delete(id);
	}

	async test(): Promise<any> {
		return await this.organizationsRepository.test();
	}
}
