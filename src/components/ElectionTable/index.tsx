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
import {
	BarChart,
	Delete,
	Edit,
	PersonAddAlt1,
	PlaylistAdd,
	Visibility,
	Badge,
} from '@mui/icons-material';
import React from 'react';
import { useNotification } from '../../context/notification.context';
import { ElectionType, elections } from '../../api/elections';
import { ElectionModal, ListModal, RoleModal, CandidateModal, ElectionViewModal } from '..';
import { useAppSelector } from '../../redux/hooks';

type ElectionTableProps = {
	handleOpenModal: () => void;
	handleCloseModal: () => void;
	open: boolean;
	electionData: ElectionType | null;
	setElectionData: React.Dispatch<React.SetStateAction<ElectionType | null>>;
};

export const ElectionTable: React.FC<ElectionTableProps> = ({
	handleOpenModal,
	handleCloseModal,
	open,
	electionData,
	setElectionData,
}) => {
	const { accessToken } = useAppSelector((state) => state.authReducer);
	const [electionList, setElectionList] = React.useState<ElectionType[] | null>(null);
	const { getError, getSuccess } = useNotification();
	const [openRoleModal, setOpenRoleModal] = React.useState(false);
	const [openListModal, setOpenListModal] = React.useState(false);
	const [openCandidateModal, setOpenCandidateModal] = React.useState(false);
	const [openElectionViewModal, setOpenElectionViewModal] = React.useState(false);

	React.useEffect(() => {
		elections
			.getAll(accessToken)
			.then((response) => {
				setElectionList(response.data.data);
			})
			.catch((error) => {
				getError(error.message);
			});
	}, []);

	const handleEdit = (election: ElectionType) => {
		setElectionData(election);
		handleOpenModal();
	};

	const handleAddRole = (election: ElectionType) => {
		setElectionData(election);
		setOpenRoleModal(true);
	};

	const handleAddList = (election: ElectionType) => {
		setElectionData(election);
		setOpenListModal(true);
	};

	const handleAddCandidate = (election: ElectionType) => {
		setElectionData(election);
		setOpenCandidateModal(true);
	};

	const handleGenResults = (election: ElectionType) => {
		elections
			.genResults(election, accessToken)
			.then((response) => {
				getSuccess(response.statusText);
			})
			.catch((error) => {
				getError(error.message);
			});
	};

	const handleViewResults = (election: ElectionType) => {
		setElectionData(election);
		setOpenElectionViewModal(true);
	};

	const handleDelete = (id: string) => {
		elections
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
			{electionData && open && (
				<ElectionModal
					open={open}
					handleClose={() => {
						handleCloseModal();
					}}
					election={electionData!}
				></ElectionModal>
			)}
			{electionData && openRoleModal && (
				<RoleModal
					open={openRoleModal}
					handleClose={() => {
						handleCloseModal();
						setOpenRoleModal(false);
					}}
					election={electionData!}
				></RoleModal>
			)}
			{electionData && openListModal && (
				<ListModal
					open={openListModal}
					handleClose={() => {
						handleCloseModal();
						setOpenListModal(false);
					}}
					election={electionData!}
				></ListModal>
			)}
			{electionData && openCandidateModal && (
				<CandidateModal
					open={openCandidateModal}
					handleClose={() => {
						handleCloseModal();
						setOpenCandidateModal(false);
					}}
					election={electionData!}
				></CandidateModal>
			)}
			{electionData && openElectionViewModal && (
				<ElectionViewModal
					open={openElectionViewModal}
					handleClose={() => {
						handleCloseModal();
						setOpenElectionViewModal(false);
					}}
					election={electionData!}
				></ElectionViewModal>
			)}

			{electionList ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">id</TableCell>
								<TableCell align="center">name</TableCell>
								<TableCell align="center">finalizated</TableCell>
								<TableCell align="center">totalVotes</TableCell>
								<TableCell align="center">options</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{electionList.map((election) => (
								<TableRow
									key={election.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell align="center">{election.id}</TableCell>
									<TableCell align="center">{election.name}</TableCell>
									<TableCell align="center">{String(election.finalizated)}</TableCell>
									<TableCell align="center">{String(election.votes!.length)}</TableCell>
									<TableCell align="center">
										<Tooltip title="Editar">
											<IconButton
												onClick={() =>
													handleEdit({
														id: election.id,
														name: election.name,
														finalizated: election.finalizated,
													})
												}
											>
												<Edit />
											</IconButton>
										</Tooltip>
										<Tooltip title="Agregar rol">
											<IconButton
												onClick={() =>
													handleAddRole({
														id: election.id,
														name: election.name,
													})
												}
											>
												<Badge />
											</IconButton>
										</Tooltip>
										<Tooltip title="Agregar lista">
											<IconButton
												onClick={() =>
													handleAddList({
														id: election.id,
														name: election.name,
													})
												}
											>
												<PlaylistAdd />
											</IconButton>
										</Tooltip>
										<Tooltip title="Agregar candidato">
											<IconButton
												onClick={() =>
													handleAddCandidate({
														id: election.id,
														name: election.name,
														lists: election.lists,
														roles: election.roles,
													})
												}
											>
												<PersonAddAlt1 />
											</IconButton>
										</Tooltip>
										<Tooltip title="Generar resultados">
											{!election.finalizated! &&
											election.delegation!.candidates!.length == 0 ? (
												<IconButton onClick={() => handleGenResults(election)}>
													<BarChart />
												</IconButton>
											) : (
												<IconButton>
													<BarChart color="disabled" />
												</IconButton>
											)}
										</Tooltip>
										<Tooltip title="Ver resultados">
											{election.finalizated! &&
											election.delegation!.candidates!.length > 0 ? (
												<IconButton
													onClick={() =>
														handleViewResults({
															id: election.id,
															name: election.name,
															lists: election.lists,
															roles: election.roles,
															delegation: election.delegation,
														})
													}
												>
													<Visibility />
												</IconButton>
											) : (
												<IconButton>
													<Visibility color="disabled" />
												</IconButton>
											)}
										</Tooltip>
										<Tooltip title="Eliminar">
											<IconButton onClick={() => handleDelete(election.id!)}>
												<Delete />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Typography textAlign="center">No hay elecciones registradas</Typography>
			)}
		</>
	);
};
