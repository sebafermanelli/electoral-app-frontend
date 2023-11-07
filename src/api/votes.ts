import { instance } from './base.api';
import { ElectionType } from './elections';
import { ListType } from './lists';
import { VoterType } from './voters';

export type VoteType = {
	id?: string;
	voter: VoterType;
	election: ElectionType;
	list?: ListType;
};

export type VoteTypeString = {
	id?: string;
	election?: string;
	list?: string;
};

const endpoint = 'vote';

export const votes = {
	getAll: function (token: string | null) {
		return instance.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
	},
	getById: function ({ id }: { id: string }, token: string | null) {
		return instance.get(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
	},
	create: function (data: VoteTypeString, token: string | null) {
		return instance.post(endpoint, data, { headers: { Authorization: `Bearer ${token}` } });
	},
	update: function (data: VoteTypeString, token: string | null) {
		return instance.put(`${endpoint}/${data.id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
	delete: function ({ id }: { id: string }, token: string | null) {
		return instance.delete(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
	},
};
