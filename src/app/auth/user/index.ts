import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';

/**
 * The type definition for a user object.
 */
export type User = {
	uid: string;
	role: string[] | string | null;
	carpetadrive: string | null;
	created_at: string;
	deleted_at: string | null;
	email: string | null;
	email_verified_at: string | null;
	id: number;
	name: string;
	firstName: string;
	lastName: string;
	image?: string;
	permisosampliados: string | null;
	permissions: number;
	tipologin: string | null;
	tipouser: number;
	ubicafirma: string | null;
	updated_at: string;
	data: {
		displayName: string;
		photoURL?: string;
		email?: string;
		shortcuts?: string[];
		settings?: Partial<FuseSettingsConfigType>;
		loginRedirectUrl?: string; // The URL to redirect to after login.
	};
};