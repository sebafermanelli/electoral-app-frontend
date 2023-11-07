import { jwtDecode } from 'jwt-decode';
import { DateTime, Settings } from 'luxon';
import { TokenAuth } from '../interfaces/tokenAuth.interface';

export const tokenDecode = <T>(token: string): T => {
	const createDecode: T = jwtDecode(token);
	return createDecode;
};

export const expirationTokenAuth = (token: string): boolean => {
	Settings.defaultZone = 'America/Buenos_Aires';
	Settings.defaultLocale = 'es';
	const { exp } = tokenDecode<TokenAuth>(token);
	const now = DateTime.now().toMillis();
	return exp * 1000 <= now;
};
