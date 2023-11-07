import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	Tooltip,
	Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useNotification } from '../../context/notification.context';
import { RoleType, roles } from '../../api/roles';
import { RoleModal } from '..';
import { useAppSelector } from '../../redux/hooks';

type RoleTableProps = {
	handleOpenModal: () => void;
	handleCloseModal: () => void;
	open: boolean;
	roleData: RoleType | null;
	setRoleData: React.Dispatch<React.SetStateAction<RoleType | null>>;
};

export const RoleTable: React.FC<RoleTableProps> = ({
	handleOpenModal,
	handleCloseModal,
	open,
	roleData,
	setRoleData,
}) => {
	const { accessToken } = useAppSelector((state) => state.authReducer);
	const { getError, getSuccess } = useNotification();
	const [roleList, setRoleList] = React.useState<RoleType[] | null>(null);

	React.useEffect(() => {
		roles
			.getAll(accessToken)
			.then((response) => {
				setRoleList(response.data.data);
			})
			.catch((error) => {
				getError(error.message);
			});
	}, []);

	const handleEdit = (role: RoleType) => {
		setRoleData(role);
		handleOpenModal();
	};

	const handleDelete = (id: string) => {
		roles
			.delete({ id }, accessToken)
			.then((response) => {
				getSuccess(response.statusText);
			})
			.catch((error) => {
				getError(error.message);
			});
	};

	return (
		<>
			{roleData && (
				<RoleModal
					open={open}
					handleClose={handleCloseModal}
					role={roleData!}
					election={roleData!.election}
				></RoleModal>
			)}

			{roleList ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">id</TableCell>
								<TableCell align="center">name</TableCell>
								<TableCell align="center">dhondt</TableCell>
								<TableCell align="center">order</TableCell>
								<TableCell align="center">election.id</TableCell>
								<TableCell align="center">election.name</TableCell>
								<TableCell align="center">options</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{roleList.map((role) => (
								<TableRow key={role.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="center">{role.id}</TableCell>
									<TableCell align="center">{role.name}</TableCell>
									<TableCell align="center">{role.dhondt ? 'TRUE' : 'FALSE'}</TableCell>
									<TableCell align="center">{role.order}</TableCell>
									<TableCell align="center">{role.election.id}</TableCell>
									<TableCell align="center">{role.election.name}</TableCell>
									<TableCell align="center">
										<Tooltip title="Editar">
											<IconButton
												onClick={() =>
													handleEdit({
														id: role.id,
														name: role.name,
														order: role.order,
														dhondt: role.dhondt,
														election: role.election,
													})
												}
											>
												<EditIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Eliminar">
											<IconButton onClick={() => handleDelete(role.id!)}>
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Typography textAlign="center">No hay roles registrados</Typography>
			)}
		</>
	);
};
