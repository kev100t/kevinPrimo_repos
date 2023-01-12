export interface RepositoryEntity {
	id: string;
	name: string;
	tribe: string;
	organization: string;
	coverage: number;
	codeSmells: number;
	bugs: number;
	vulnerabilities: number;
	hotspot: number;
	verificationState: string;
	state: string;
}
