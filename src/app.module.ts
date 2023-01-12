import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryVerificationsModule } from './repository-verifications/repository-verifications.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
	imports: [
		RepositoryVerificationsModule,
		OrganizationsModule,
		RepositoriesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
