import { IsString, IsNumber } from 'class-validator';

export class OrganizationDto {
	@IsString({ message: 'El parámetro name es string.' })
	readonly name: string;

	@IsNumber({}, { message: 'El parámetro name es number.' })
	readonly status: number;
}
