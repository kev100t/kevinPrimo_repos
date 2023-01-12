import {
	Controller,
	HttpException,
	HttpStatus,
	UseFilters,
	Get,
	Body,
	Post,
	Param,
	Put,
	Delete,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { HttpExceptionFilter } from '../http-exception.filter';
import { OrganizationDto } from './dto/organization-dto';
import { OrganizationEntity } from './entities/organization.entity';

@Controller('organizations')
export class OrganizationsController {
	constructor(private readonly organizationsService: OrganizationsService) {}

	@Post()
	@UseFilters(new HttpExceptionFilter())
	async create(
		@Body() organizationDto: OrganizationDto,
	): Promise<OrganizationEntity> {
		try {
			return await this.organizationsService.create(organizationDto);
		} catch (err) {
			throw new HttpException(
				{
					message: err.message,
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Put(':id')
	@UseFilters(new HttpExceptionFilter())
	async update(
		@Body() organizationDto: OrganizationDto,
		@Param() params,
	): Promise<OrganizationEntity> {
		try {
			const { id } = params;

			return await this.organizationsService.update(id, organizationDto);
		} catch (err) {
			throw new HttpException(
				{
					message: err.message,
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Get()
	@UseFilters(new HttpExceptionFilter())
	async list(): Promise<OrganizationEntity[]> {
		try {
			return await this.organizationsService.list();
		} catch (err) {
			throw new HttpException(
				{
					message: err.message,
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Delete(':id')
	@UseFilters(new HttpExceptionFilter())
	async delete(@Param() params): Promise<OrganizationEntity> {
		try {
			const { id } = params;

			return await this.organizationsService.delete(id);
		} catch (err) {
			throw new HttpException(
				{
					message: err.message,
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Get('test')
	@UseFilters(new HttpExceptionFilter())
	async test(): Promise<any> {
		try {
			return await this.organizationsService.test();
		} catch (err) {
			throw new HttpException(
				{
					message: err.message,
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
