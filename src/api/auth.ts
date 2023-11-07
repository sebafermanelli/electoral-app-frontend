import { instance } from './base.api';

export type LoginType = {
	username: string;
	password: string;
};

const endpoint = 'auth';

export const auths = {
	login: function (data: LoginType) {
		return instance.post(`${endpoint}/login`, data);
	},
};
