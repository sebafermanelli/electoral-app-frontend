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
import { CandidateType, candidates } from '../../api/candidates';
import { useAppSelector } from '../../redux/hooks';

export const CandidateTable: React.FC<{}> = () => {
	const { accessToken } = useAppSelector((state) => state.authReducer);
	const [candidateList, setCandidateList] = React.useState<CandidateType[] | null>(null);
	const { getError, getSuccess } = useNotification();

	React.useEffect(() => {
		candidates
			.getAll(accessToken)
			.then((response) => {
				setCandidateList(response.data.data);
			})
			.catch((error) => {
				getError(error.message);
			});
	}, []);

	const handleDelete = (id: string) => {
		candidates
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
			{candidateList ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">id</TableCell>
								<TableCell align="center">user.username</TableCell>
								<TableCell align="center">role.name</TableCell>
								<TableCell align="center">role.order</TableCell>
								<TableCell align="center">list.name</TableCell>
								<TableCell align="center">list.election.name</TableCell>
								<TableCell align="center">delegation</TableCell>
								<TableCell align="center">options</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{candidateList.map((candidate) => (
								<TableRow
									key={candidate.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell align="center">{candidate.id}</TableCell>
									<TableCell align="center">{candidate.voter!.user.username}</TableCell>
									<TableCell align="center">{candidate.role!.name}</TableCell>
									<TableCell align="center">{candidate.role!.order}</TableCell>
									<TableCell align="center">{candidate.list!.name}</TableCell>
									<TableCell align="center">{candidate.list!.election.name}</TableCell>
									<TableCell align="center">
										{candidate.delegation?.id ? candidate.delegation!.id : 'NULL'}
									</TableCell>
									<TableCell align="center">
										<Tooltip title="Eliminar">
											<IconButton onClick={() => handleDelete(candidate.id!)}>
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
				<Typography textAlign="center">No hay candidatos registrados</Typography>
			)}
		</>
	);
};
