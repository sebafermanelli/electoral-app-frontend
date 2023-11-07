import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FilledInput,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { CandidateValidate } from '../../utils/validateForm';
import { useNotification } from '../../context/notification.context';
import { CandidateType, CandidateTypeString, candidates } from '../../api/candidates';
import { ElectionType } from '../../api/elections';
import { VoterType, voters } from '../../api/voters';
import { useAppSelector } from '../../redux/hooks';

type CandidateModalProps = {
	candidate?: CandidateType;
	election: ElectionType;
	open: boolean;
	handleClose: () => void;
};

export const CandidateModal: React.FC<CandidateModalProps> = ({
	candidate,
	election,
	open,
	handleClose,
}) => {
	const { accessToken } = useAppSelector((state) => state.authReducer);
	const { getError, getSuccess } = useNotification();
	const [candidateData, setCandidateData] = React.useState<CandidateType>({
		id: undefined,
		voter: undefined,
		role: undefined,
		list: undefined,
		delegation: undefined,
	});
	const [candidateDataSend, setCandidateDataSend] = React.useState<CandidateTypeString>({
		id: candidateData.id,
		voter: candidateData.voter?.id,
		role: candidateData.role?.id,
		list: candidateData.list?.id,
		delegation: candidateData.delegation?.id,
	});
	const [voterList, setVoterList] = React.useState<VoterType[] | null>(null);

	React.useEffect(() => {
		if (candidate) {
			setCandidateData(candidate);
		}
		voters
			.getAll(accessToken)
			.then((response) => {
				setVoterList(response.data.data);
			})
			.catch((error) => {
				getError(error.message);
			});
	}, [candidate, election]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
		setCandidateDataSend({ ...candidateDataSend, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		if (!candidateDataSend.id) {
			CandidateValidate.validate(candidateDataSend)
				.then(() => {
					candidates
						.create(candidateDataSend, accessToken)
						.then((response) => {
							getSuccess(response.statusText);
							handleClose();
						})
						.catch((error) => {
							getError(error.response.data.error);
						});
				})
				.catch((error) => {
					getError(error.message);
				});
		} else {
			CandidateValidate.validate(candidateDataSend)
				.then(() => {
					candidates
						.update(candidateDataSend, accessToken)
						.then((response) => {
							getSuccess(response.statusText);
							handleClose();
						})
						.catch((error) => {
							getError(error.response.data.error);
						});
				})
				.catch((error) => {
					getError(error.message);
				});
		}
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{candidate?.id ? candidate.voter!.id : 'Nuevo candidato'}</DialogTitle>
			<DialogContent>
				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel id="voterLabel">Candidato</InputLabel>
					<Select
						labelId="voterLabel"
						id="voter"
						name="voter"
						value={candidateDataSend.voter ? candidateDataSend.voter : ''}
						onChange={handleChange}
					>
						{voterList?.map((voter) => (
							<MenuItem key={voter.id} value={voter.id}>
								{voter.user.username} - {voter.user.lastname}, {voter.user.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel id="roleLabel">Rol</InputLabel>
					<Select
						labelId="roleLabel"
						id="role"
						name="role"
						value={candidateDataSend.role ? candidateDataSend.role : ''}
						onChange={handleChange}
					>
						{election.roles!.map((role) => (
							<MenuItem key={role.id} value={role.id}>
								{role.order} - {role.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel id="listLabel">Lista</InputLabel>
					<Select
						labelId="listLabel"
						id="list"
						name="list"
						value={candidateDataSend.list ? candidateDataSend.list : ''}
						onChange={handleChange}
					>
						{election.lists?.map((list) => (
							<MenuItem key={list.id} value={list.id}>
								{list.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

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
					{candidate?.id ? 'Editar' : 'Crear'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
