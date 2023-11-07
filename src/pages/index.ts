import React from 'react';

export { HomePage } from './home';
export const LoginPage = React.lazy(() => import('./login'));
export const UsersPage = React.lazy(() => import('./dashboard/users'));
export const VotersPage = React.lazy(() => import('./dashboard/voters'));
export const ElectionsPage = React.lazy(() => import('./dashboard/elections'));
export const RolesPage = React.lazy(() => import('./dashboard/roles'));
export const ListsPage = React.lazy(() => import('./dashboard/lists'));
export const CandidatesPage = React.lazy(() => import('./dashboard/candidates'));
