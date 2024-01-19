import { instance } from './base.api';
import { DelegationType } from './delegations';
import { ListType } from './lists';
import { RoleType } from './roles';
import { VoteType } from './votes';

export type ElectionType = {
	id?: string;
	name: string;
	finalizated?: boolean;
	votes?: VoteType[];
	roles?: RoleType[];
	lists?: ListType[];
	delegation?: DelegationType;
};

const endpoint = 'election';

export const elections = {
	getAll: function (token: string | null) {
		return instance.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
	},
	getById: function ({ id }: { id: string }, token: string | null) {
		return instance.get(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
	},
	create: function (data: ElectionType, token: string | null) {
		return instance.post(endpoint, data, { headers: { Authorization: `Bearer ${token}` } });
	},
	update: function (data: ElectionType, token: string | null) {
		return instance.put(`${endpoint}/${data.id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
	delete: function ({ id }: { id: string }, token: string | null) {
		return instance.delete(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
	},
	genResults: function (data: ElectionType, token: string | null) {
		return instance.put(`${endpoint}/${data.id}/results`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
};
