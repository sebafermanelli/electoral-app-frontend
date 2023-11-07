import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FilledInput,
	FormControl,
	InputLabel,
} from '@mui/material';
import React from 'react';
import { ListValidate } from '../../utils/validateForm';
import { useNotification } from '../../context/notification.context';
import { ElectionType } from '../../api/elections';
import { ListType, ListTypeString, lists } from '../../api/lists';
import { useAppSelector } from '../../redux/hooks';

type ListModalProps = {
	list?: ListType;
	election: ElectionType;
	open: boolean;
	handleClose: () => void;
};

export const ListModal: React.FC<ListModalProps> = ({ list, election, open, handleClose }) => {
	const { accessToken } = useAppSelector((state) => state.authReducer);
	const { getError, getSuccess } = useNotification();
	const [listData, setListData] = React.useState<ListType>({
		id: undefined,
		name: '',
		votes: 0,
		election: election,
	});

	React.useEffect(() => {
		if (list) {
			setListData(list);
		}
	}, [list]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setListData({ ...listData, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		const listDataSend: ListTypeString = {
			id: listData.id,
			name: listData.name,
			votes: listData.votes,
			election: election.id!,
		};

		if (!listDataSend.id) {
			ListValidate.validate(listDataSend)
				.then(() => {
					lists
						.create(listDataSend, accessToken)
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
			ListValidate.validate(listDataSend)
				.then(() => {
					lists
						.update(listDataSend, accessToken)
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
			<DialogTitle>{list?.id ? list.name : 'Nueva lista'}</DialogTitle>
			<DialogContent>
				<FormControl fullWidth sx={{ my: 1 }} variant="filled">
					<InputLabel htmlFor="nameLabel">Nombre</InputLabel>
					<FilledInput
						id="nameLabel"
						name="name"
						type="text"
						onChange={handleChange}
						autoComplete="off"
						value={listData.name}
					></FilledInput>
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
					{list?.id ? 'Editar' : 'Crear'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
