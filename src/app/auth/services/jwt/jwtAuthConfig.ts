import { JwtAuthConfig } from './JwtAuthProvider';

const jwtAuthConfig: JwtAuthConfig = {
	// tokenStorageKey: 'jwt_access_token',
	// signInUrl: 'mock-api/auth/sign-in',
	// signUpUrl: 'mock-api/auth/sign-up',
	// tokenRefreshUrl: 'mock-api/auth/refresh',
	// getUserUrl: 'mock-api/auth/user',
	// updateUserUrl: 'mock-api/auth/user',
	// updateTokenFromHeader: true
	tokenStorageKey: 'custom_jwt_access_token',
	signInUrl: 'https://dummyjson.com/auth/login',
	signUpUrl: 'mock-api/auth/sign-up',
	tokenRefreshUrl: 'https://dummyjson.com/auth/refresh',
	getUserUrl: 'https://dummyjson.com/auth/me',
	updateUserUrl: 'mock-api/auth/user',
	updateTokenFromHeader: true
};

export default jwtAuthConfig;
