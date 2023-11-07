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
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useNotification } from '../../context/notification.context';
import { VoterType, voters } from '../../api/voters';
import { useAppSelector } from '../../redux/hooks';

export const VoterTable: React.FC<{}> = () => {
	const { accessToken } = useAppSelector((state) => state.authReducer);
	const { getError, getSuccess } = useNotification();
	const [voterList, setVoterList] = React.useState<VoterType[] | null>(null);

	const handleDelete = (id: string) => {
		voters
			.delete({ id }, accessToken)
			.then((response) => {
				getSuccess(response.statusText);
			})
			.catch((error) => {
				getError(error.message);
			});
	};

	React.useEffect(() => {
		voters
			.getAll(accessToken)
			.then((response) => {
				setVoterList(response.data.data);
			})
			.catch((error) => {
				getError(error.message);
			});
	}, []);

	return (
		<>
			{voterList ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">id</TableCell>
								<TableCell align="center">user.id</TableCell>
								<TableCell align="center">user.dni</TableCell>
								<TableCell align="center">user.name</TableCell>
								<TableCell align="center">user.lastname</TableCell>
								<TableCell align="center">options</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{voterList.map((voter) => (
								<TableRow key={voter.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="center">{voter.id}</TableCell>
									<TableCell align="center">{voter.user.id}</TableCell>
									<TableCell align="center">{voter.user.username}</TableCell>
									<TableCell align="center">{voter.user.name}</TableCell>
									<TableCell align="center">{voter.user.lastname}</TableCell>
									<TableCell align="center">
										<Tooltip title="Eliminar">
											<IconButton onClick={() => handleDelete(voter.id)}>
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
				<Typography textAlign="center">No hay votantes registrados</Typography>
			)}
		</>
	);
};
