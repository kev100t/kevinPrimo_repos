export interface RepositoryEntity {
	id: string;
	name: string;
	tribe: string;
	organization: string;
	coverage: string;
	codeSmells: number;
	bugs: number;
	vulnerabilities: number;
	hotspot: number;
	verificationState: string;
	state: string;
}
