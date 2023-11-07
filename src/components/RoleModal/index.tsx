import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FilledInput,
	FormControl,
	FormControlLabel,
	InputLabel,
	Switch,
} from '@mui/material';
import React from 'react';
import { RoleValidate } from '../../utils/validateForm';
import { useNotification } from '../../context/notification.context';
import { RoleType, RoleTypeString, roles } from '../../api/roles';
import { ElectionType } from '../../api/elections';
import { useAppSelector } from '../../redux/hooks';

type RoleModalProps = {
	role?: RoleType;
	election: ElectionType;
	open: boolean;
	handleClose: () => void;
};

export const RoleModal: React.FC<RoleModalProps> = ({ role, election, open, handleClose }) => {
	const { accessToken } = useAppSelector((state) => state.authReducer);
	const { getError, getSuccess } = useNotification();
	const [roleData, setRoleData] = React.useState<RoleType>({
		id: undefined,
		name: '',
		order: undefined,
		dhondt: false,
		election: election,
	});

	React.useEffect(() => {
		if (role) {
			setRoleData(role);
		}
	}, [role]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRoleData({ ...roleData, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		const roleDataSend: RoleTypeString = {
			id: roleData.id,
			name: roleData.name,
			order: roleData.order!,
			dhondt: roleData.dhondt,
			election: roleData.election.id!,
		};

		if (!roleDataSend.id) {
			RoleValidate.validate(roleDataSend)
				.then(() => {
					roles
						.create(roleDataSend, accessToken)
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
			RoleValidate.validate(roleDataSend)
				.then(() => {
					roles
						.update(roleDataSend, accessToken)
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
			<DialogTitle>{role?.id ? role.name : 'Nuevo rol'}</DialogTitle>
			<DialogContent>
				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel htmlFor="nameLabel">Nombre</InputLabel>
					<FilledInput
						id="nameLabel"
						name="name"
						type="text"
						onChange={handleChange}
						autoComplete="off"
						value={roleData.name}
					></FilledInput>
				</FormControl>

				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel htmlFor="orderLabel">Orden</InputLabel>
					<FilledInput
						id="orderLabel"
						name="order"
						type="number"
						onChange={handleChange}
						autoComplete="off"
						value={roleData.order ? roleData.order : ''}
					></FilledInput>
				</FormControl>

				<FormControlLabel
					control={
						<Switch
							checked={roleData.dhondt}
							onChange={() => {
								setRoleData({
									...roleData,
									dhondt: !roleData.dhondt,
								});
							}}
						/>
					}
					label="Dhondt"
					sx={{ my: 1 }}
				/>

				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel htmlFor="electionLabel">Eleccion</InputLabel>
					<FilledInput
						id="electionLabel"
						name="election"
						type="text"
						value={election.name}
						disabled
					></FilledInput>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button color="secondary" fullWidth variant="contained" size="large" onClick={handleClose}>
					Cancelar
				</Button>
				<Button type="submit" fullWidth variant="contained" size="large" onClick={handleSubmit}>
					{role?.id ? 'Editar' : 'Crear'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
