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
import { ElectionValidate } from '../../utils/validateForm';
import { useNotification } from '../../context/notification.context';
import { ElectionType, elections } from '../../api/elections';
import { useAppSelector } from '../../redux/hooks';

type ElectionModalProps = {
	election?: ElectionType;
	open: boolean;
	handleClose: () => void;
};

export const ElectionModal: React.FC<ElectionModalProps> = ({ election, open, handleClose }) => {
	const { accessToken } = useAppSelector((state) => state.authReducer);
	const { getError, getSuccess } = useNotification();
	const [electionData, setElectionData] = React.useState<ElectionType>({
		id: undefined,
		name: '',
		finalizated: false,
	});

	React.useEffect(() => {
		if (election) {
			setElectionData(election);
		}
	}, [election]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setElectionData({ ...electionData, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		if (!electionData.id) {
			ElectionValidate.validate(electionData)
				.then(() => {
					elections
						.create(electionData, accessToken)
						.then((response) => {
							getSuccess(response.statusText);
							handleClose();
						})
						.catch((error) => {
							console.log(error);
							getError(error.message);
						});
				})
				.catch((error) => {
					getError(error.message);
				});
		} else {
			ElectionValidate.validate(electionData)
				.then(() => {
					elections
						.update(electionData, accessToken)
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
			<DialogTitle>{election?.id ? election.name : 'Nueva eleccion'}</DialogTitle>
			<DialogContent>
				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel htmlFor="nameLabel">Nombre</InputLabel>
					<FilledInput
						id="nameLabel"
						name="name"
						type="text"
						onChange={handleChange}
						autoComplete="off"
						value={electionData.name}
					></FilledInput>
				</FormControl>

				{election?.id ? (
					<FormControlLabel
						control={
							<Switch
								checked={electionData.finalizated}
								onChange={() => {
									setElectionData({
										...electionData,
										finalizated: !electionData.finalizated,
									});
								}}
							/>
						}
						label="Finalizada"
						sx={{ my: 1 }}
					/>
				) : (
					<></>
				)}
			</DialogContent>
			<DialogActions>
				<Button color="secondary" fullWidth variant="contained" size="large" onClick={handleClose}>
					Cancelar
				</Button>
				<Button type="submit" fullWidth variant="contained" size="large" onClick={handleSubmit}>
					{election?.id ? 'Editar' : 'Crear'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
