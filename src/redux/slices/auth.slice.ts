import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/getCookie.util';
import { expirationTokenAuth, tokenDecode } from '../../utils/decodeToken.util';
import { TokenAuth } from '../../interfaces/tokenAuth.interface';

interface AuthState {
	isAuth: boolean;
	accessToken: string | null;
	role: string | null;
	sub: string | null;
	exp: boolean | null;
}

const initialState: AuthState = {
	isAuth:
		getCookie('accessToken') !== undefined
			? !expirationTokenAuth(getCookie('accessToken')!)
			: false,
	accessToken: getCookie('accessToken') !== undefined ? getCookie('accessToken')! : null,
	role:
		getCookie('accessToken') !== undefined
			? tokenDecode<TokenAuth>(getCookie('accessToken')!).role
			: null,
	sub:
		getCookie('accessToken') !== undefined
			? tokenDecode<TokenAuth>(getCookie('accessToken')!).sub
			: null,
	exp:
		getCookie('accessToken') !== undefined ? expirationTokenAuth(getCookie('accessToken')!) : null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			return {
				...state,
				isAuth: true,
				accessToken: action.payload.accessToken,
				role: action.payload.role,
				sub: action.payload.sub,
			};
		},
		logout: (state) => {
			return {
				...state,
				isAuth: false,
				accessToken: null,
				role: null,
				sub: null,
				exp: null,
			};
		},
	},
});

export const { login, logout } = authSlice.actions;
