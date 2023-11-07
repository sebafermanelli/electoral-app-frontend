import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Tooltip,
	IconButton,
	Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { UserType, users } from '../../api/users';
import { useNotification } from '../../context/notification.context';
import { UserModal } from '..';
import { useAppSelector } from '../../redux/hooks';

type UserTableProps = {
	handleOpenModal: () => void;
	handleCloseModal: () => void;
	open: boolean;
	userData: UserType | null;
	setUserData: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const UserTable: React.FC<UserTableProps> = ({
	handleOpenModal,
	handleCloseModal,
	open,
	userData,
	setUserData,
}) => {
	const { accessToken } = useAppSelector((state) => state.authReducer);
	const { getError, getSuccess } = useNotification();
	const [userList, setUserList] = React.useState<UserType[] | null>(null);

	React.useEffect(() => {
		users
			.getAll(accessToken)
			.then((response) => {
				setUserList(response.data.data);
			})
			.catch((error) => {
				getError(error.message);
			});
	}, []);

	const handleEdit = (user: UserType) => {
		setUserData(user);
		handleOpenModal();
	};

	const handleDelete = (id: string) => {
		users
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
			{userData && (
				<UserModal open={open} handleClose={handleCloseModal} user={userData}></UserModal>
			)}

			{userList ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">id</TableCell>
								<TableCell align="center">username</TableCell>
								<TableCell align="center">email</TableCell>
								<TableCell align="center">name</TableCell>
								<TableCell align="center">lastname</TableCell>
								<TableCell align="center">role</TableCell>
								<TableCell align="center">options</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{userList.map((user) => (
								<TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="center">{user.id}</TableCell>
									<TableCell align="center">{user.username}</TableCell>
									<TableCell align="center">{user.email}</TableCell>
									<TableCell align="center">{user.name}</TableCell>
									<TableCell align="center">{user.lastname}</TableCell>
									<TableCell align="center">{user.role}</TableCell>
									<TableCell align="center">
										<Tooltip title="Editar">
											<IconButton
												onClick={() =>
													handleEdit({
														id: user.id,
														username: user.username,
														email: user.email,
														password: '',
														name: user.name,
														lastname: user.lastname,
														role: user.role,
													})
												}
											>
												<EditIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Eliminar">
											<IconButton onClick={() => handleDelete(user.id!)}>
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
				<Typography textAlign="center">No hay usuarios registrados</Typography>
			)}
		</>
	);
};
