import {
	Container,
	Button,
	Grid,
	Paper,
	Box,
	Typography,
	IconButton,
	InputAdornment,
	InputLabel,
	FormControl,
	FilledInput,
} from '@mui/material';
import React from 'react';
import { useNotification } from '../../context/notification.context';
import { CodeValidate, LoginValidate } from '../../utils/validateForm';
import { users } from '../../api/users';
import { LoginType, auths } from '../../api/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from '../../redux/slices/auth.slice';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPage: React.FC<{}> = () => {
	const dispatch = useAppDispatch();
	const { isAuth } = useAppSelector((state) => state.authReducer);
	const [loginData, setLoginData] = React.useState<LoginType>({
		username: '',
		password: '',
	});
	const { getError, getSuccess } = useNotification();
	const [showPassword, setShowPassword] = React.useState(false);
	const navigate = useNavigate();

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	const handleCode = () => {
		CodeValidate.validate(loginData)
			.then(() => {
				users
					.genCode(loginData)
					.then((response) => {
						getSuccess(response.statusText);
					})
					.catch((error) => {
						getError(error.message);
					});
			})
			.catch((error) => {
				getError(error.message);
			});
	};

	const handleLogin = (e: React.FormEvent<HTMLInputElement>) => {
		e.preventDefault();
		LoginValidate.validate(loginData)
			.then(() => {
				auths
					.login(loginData)
					.then((response) => {
						console.log(response)
						getSuccess(response.statusText);
						const loginData = {
							isAuth: true,
							accessToken: response.data.accessToken,
							role: response.data.user.role,
							sub: response.data.user.id,
						};
						dispatch(login(loginData));
						navigate('/');
					})
					.catch((error) => {
						console.log(error);
						getError(error.message);
					});
			})
			.catch((error) => {
				getError(error.message);
			});
	};

	return isAuth ? (
		<Navigate to="/" replace></Navigate>
	) : (
		<Container maxWidth="sm">
			<Grid
				container
				direction="column"
				alignItems="center"
				justifyContent="center"
				sx={{ minHeight: '100vh' }}
			>
				<Grid item>
					<Paper sx={{ padding: '1.2em' }}>
						<Typography variant="h4" sx={{ my: 1 }} textAlign="center">
							Iniciar sesion
						</Typography>
						<Box component="form" onSubmit={handleLogin}>
							<FormControl fullWidth sx={{ my: 1 }} variant="filled">
								<InputLabel htmlFor="usernameLabel">Email o DNI</InputLabel>
								<FilledInput
									autoFocus
									id="usernameLabel"
									name="username"
									type="text"
									onChange={handleChange}
									autoComplete="off"
								></FilledInput>
							</FormControl>

							<FormControl fullWidth sx={{ my: 1 }} variant="filled">
								<InputLabel htmlFor="passwordLabel">Clave</InputLabel>
								<FilledInput
									id="passwordLabel"
									name="password"
									type={showPassword ? 'text' : 'password'}
									onChange={handleChange}
									autoComplete="off"
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
								></FilledInput>
							</FormControl>

							<Button fullWidth variant="outlined" size="large" onClick={handleCode} sx={{ my: 1 }}>
								Obtener codigo
							</Button>
							<Button type="submit" fullWidth variant="contained" size="large" sx={{ my: 1 }}>
								Iniciar sesion
							</Button>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default LoginPage;
