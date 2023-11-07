import { Navigate, Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAppSelector } from '../redux/hooks';
import { Footer } from './Footer';
import { Box } from '@mui/material';
import { useCookies } from 'react-cookie';
import React from 'react';

export const RouterLayout: React.FC<{}> = () => {
	const { isAuth, accessToken } = useAppSelector((state) => state.authReducer);
	const [, setCookie, remove] = useCookies();

	React.useEffect(() => {
		if (accessToken) {
			setCookie('accessToken', accessToken);
		}
	}, [accessToken]);

	React.useEffect(() => {
		if (!isAuth) {
			remove('accessToken');
		}
	}, [isAuth]);

	return isAuth ? (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
				}}
			>
				<Navbar></Navbar>
				<Box sx={{ flexGrow: 1 }}>
					<Outlet></Outlet>
				</Box>
				<Footer></Footer>
			</Box>
		</>
	) : (
		<Navigate to="/login"></Navigate>
	);
};
