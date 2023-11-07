import { instance } from './base.api';
import { VoterType } from './voters';

export type UserType = {
	id?: string;
	username: string;
	email: string;
	password: string;
	name: string;
	lastname: string;
	role: string;
	voter?: VoterType;
};

const endpoint = 'user';

export const users = {
	getAll: function (token: string | null) {
		return instance.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
	},
	getById: function ({ id }: { id: string }, token: string | null) {
		return instance.get(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
	},
	create: function (data: UserType) {
		return instance.post(endpoint, data);
	},
	update: function (data: UserType, token: string | null) {
		return instance.put(`${endpoint}/${data.id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
	delete: function ({ id }: { id: string }, token: string | null) {
		return instance.delete(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
	},
	genCode: function ({ username }: { username: string }) {
		return instance.put(`${endpoint}/${username}/code`);
	},
};
