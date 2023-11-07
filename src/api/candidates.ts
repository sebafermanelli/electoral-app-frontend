import { instance } from './base.api';
import { DelegationType } from './delegations';
import { ListType } from './lists';
import { RoleType } from './roles';
import { VoterType } from './voters';

export type CandidateType = {
	id?: string;
	voter?: VoterType;
	list?: ListType;
	role?: RoleType;
	delegation?: DelegationType;
};

export type CandidateTypeString = {
	id?: string;
	voter?: string;
	list?: string;
	role?: string;
	delegation?: string;
};

const endpoint = 'candidate';

export const candidates = {
	getAll: function (token: string | null) {
		return instance.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
	},
	getById: function ({ id }: { id: string }, token: string | null) {
		return instance.get(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
	},
	create: function (data: CandidateTypeString, token: string | null) {
		return instance.post(endpoint, data, { headers: { Authorization: `Bearer ${token}` } });
	},
	update: function (data: CandidateTypeString, token: string | null) {
		return instance.put(`${endpoint}/${data.id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
	delete: function ({ id }: { id: string }, token: string | null) {
		return instance.delete(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
	},
};
