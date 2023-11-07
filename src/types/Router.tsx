import { Routes, Route } from 'react-router-dom';
import { RouterLayout } from '../common/RouterLayout';
import { RouterLayoutAdmin } from '../common/RouterLayoutAdmin';
import {
	HomePage,
	UsersPage,
	VotersPage,
	ElectionsPage,
	RolesPage,
	ListsPage,
	CandidatesPage,
	LoginPage,
} from '../pages';

export const AppRouter: React.FC<{}> = () => {
	return (
		<Routes>
			<Route path="/" element={<RouterLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/dashboard" element={<RouterLayoutAdmin />}>
					<Route path="/dashboard/users" element={<UsersPage />} />
					<Route path="/dashboard/voters" element={<VotersPage />} />
					<Route path="/dashboard/elections" element={<ElectionsPage />} />
					<Route path="/dashboard/roles" element={<RolesPage />} />
					<Route path="/dashboard/lists" element={<ListsPage />} />
					<Route path="/dashboard/candidates" element={<CandidatesPage />} />
				</Route>
			</Route>
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	);
};
