import { instance } from './base.api';
import { CandidateType } from './candidates';
import { ElectionType } from './elections';

export type RoleType = {
	id?: string;
	name: string;
	order?: number;
	dhondt: boolean;
	election: ElectionType;
	candidates?: CandidateType[];
};

export type RoleTypeString = {
	id?: string;
	name: string;
	order: number;
	dhondt: boolean;
	election: string;
};

const endpoint = 'role';

export const roles = {
	getAll: function (token: string | null) {
		return instance.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
	},
	getById: function ({ id }: { id: string }, token: string | null) {
		return instance.get(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
	},
	create: function (data: RoleTypeString, token: string | null) {
		return instance.post(endpoint, data, { headers: { Authorization: `Bearer ${token}` } });
	},
	update: function (data: RoleTypeString, token: string | null) {
		return instance.put(`${endpoint}/${data.id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
	delete: function ({ id }: { id: string }, token: string | null) {
		return instance.delete(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
	},
};
