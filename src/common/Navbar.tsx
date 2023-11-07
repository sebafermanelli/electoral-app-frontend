import { AppBar, Box, Button, Container, Grid, Stack, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/auth.slice';
import React from 'react';
import { useCookies } from 'react-cookie';

export const Navbar: React.FC<{}> = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isAuth, role } = useAppSelector((state) => state.authReducer);
	const [, , remove] = useCookies();

	const handlerLogout = () => {
		dispatch(logout());
		remove('accessToken');
		navigate('/login');
	};

	return (
		<Box>
			<AppBar position="sticky">
				<Toolbar>
					<Container maxWidth="xl">
						<Grid container direction="row" justifyContent="space-between" alignItems="center">
							<Grid item>
								<Typography onClick={() => navigate('/')}>Elections</Typography>
							</Grid>
							<Grid item>
								{isAuth && role == 'ADMIN' ? (
									<Stack direction="row" alignItems="center" spacing={2}>
										<Button onClick={() => navigate('dashboard/users')}>Usuarios</Button>
										<Button onClick={() => navigate('dashboard/voters')}>Votantes</Button>
										<Button onClick={() => navigate('dashboard/elections')}>Elecciones</Button>
										<Button onClick={() => navigate('dashboard/roles')}>Roles</Button>
										<Button onClick={() => navigate('dashboard/lists')}>Listas</Button>
										<Button onClick={() => navigate('dashboard/candidates')}>Candidatos</Button>
									</Stack>
								) : null}
							</Grid>
							<Grid item>
								{isAuth ? (
									<Button variant="outlined" color="error" onClick={handlerLogout}>
										Cerrar sesion
									</Button>
								) : (
									<Stack direction="row" spacing={2}>
										<Button variant="contained" onClick={() => navigate('login')}>
											Iniciar sesion
										</Button>
									</Stack>
								)}
							</Grid>
						</Grid>
					</Container>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
