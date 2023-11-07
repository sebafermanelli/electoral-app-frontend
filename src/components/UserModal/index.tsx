import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FilledInput,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
} from '@mui/material';
import React from 'react';
import { UserType, users } from '../../api/users';
import { UserValidate } from '../../utils/validateForm';
import { useNotification } from '../../context/notification.context';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppSelector } from '../../redux/hooks';

type UserModalProps = {
	user?: UserType;
	open: boolean;
	handleClose: () => void;
};

export const UserModal: React.FC<UserModalProps> = ({ user, open, handleClose }) => {
	const { accessToken } = useAppSelector((state) => state.authReducer);
	const { getError, getSuccess } = useNotification();
	const [userData, setUserData] = React.useState<UserType>({
		id: undefined,
		username: '',
		email: '',
		password: '',
		name: '',
		lastname: '',
		role: '',
	});
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	React.useEffect(() => {
		if (user) {
			setUserData(user);
		}
	}, [user]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		if (!userData.id) {
			UserValidate.validate(userData)
				.then(() => {
					users
						.create(userData)
						.then((response) => {
							getSuccess(response.statusText);
							handleClose();
						})
						.catch((error) => {
							getError(error.message);
						});
				})
				.catch((error) => {
					getError(error.message);
				});
		} else {
			UserValidate.validate(userData)
				.then(() => {
					users
						.update(userData, accessToken)
						.then((response) => {
							getSuccess(response.statusText);
							handleClose();
						})
						.catch((error) => {
							getError(error.message);
						});
				})
				.catch((error) => {
					getError(error.message);
				});
		}
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{user?.id ? user.username : 'Nuevo usuario'}</DialogTitle>
			<DialogContent>
				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel htmlFor="usernameLabel">DNI</InputLabel>
					<FilledInput
						autoFocus
						id="usernameLabel"
						name="username"
						type="text"
						onChange={handleChange}
						autoComplete="off"
						value={userData.username}
					></FilledInput>
				</FormControl>

				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel htmlFor="emailLabel">Email</InputLabel>
					<FilledInput
						id="emailLabel"
						name="email"
						type="text"
						onChange={handleChange}
						autoComplete="off"
						value={userData.email}
					></FilledInput>
				</FormControl>

				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel htmlFor="passwordLabel">Clave</InputLabel>
					<FilledInput
						autoFocus
						id="passwordLabel"
						name="password"
						type={showPassword ? 'text' : 'password'}
						onChange={handleChange}
						autoComplete="off"
						value={userData.password}
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

				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel htmlFor="nameLabel">Nombre</InputLabel>
					<FilledInput
						id="nameLabel"
						name="name"
						type="text"
						onChange={handleChange}
						autoComplete="off"
						value={userData.name}
					></FilledInput>
				</FormControl>

				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel htmlFor="lastnameLabel">Apellido</InputLabel>
					<FilledInput
						id="lastnameLabel"
						name="lastname"
						type="text"
						onChange={handleChange}
						autoComplete="off"
						value={userData.lastname}
					></FilledInput>
				</FormControl>

				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel htmlFor="roleLabel">Rol</InputLabel>
					<FilledInput
						id="roleLabel"
						name="role"
						type="text"
						onChange={handleChange}
						autoComplete="off"
						value={userData.role}
					></FilledInput>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button color="secondary" fullWidth variant="contained" size="large" onClick={handleClose}>
					Cancelar
				</Button>
				<Button type="submit" fullWidth variant="contained" size="large" onClick={handleSubmit}>
					{user?.id ? 'Editar' : 'Crear'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
