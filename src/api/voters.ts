import { instance } from './base.api';
import { CandidateType } from './candidates';
import { UserType } from './users';
import { VoteType } from './votes';

export type VoterType = {
	id: string;
	user: UserType;
	votes?: VoteType[];
	candidates?: CandidateType[];
};

export type VoterTypeString = {
	id: string;
	user: string;
};

const endpoint = 'voter';

export const voters = {
	getAll: function (token: string | null) {
		return instance.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
	},
	getById: function ({ id }: { id: string }, token: string | null) {
		return instance.get(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
	},
	create: function (data: VoterTypeString, token: string | null) {
		return instance.post(endpoint, data, { headers: { Authorization: `Bearer ${token}` } });
	},
	update: function (data: VoterTypeString, token: string | null) {
		return instance.put(`${endpoint}/${data.id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
	delete: function ({ id }: { id: string }, token: string | null) {
		return instance.delete(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
	},
};
