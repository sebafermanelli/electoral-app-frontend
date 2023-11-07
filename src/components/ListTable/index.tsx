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
import { ListType, lists } from '../../api/lists';
import { ListModal } from '..';
import { useAppSelector } from '../../redux/hooks';

type ListTableProps = {
	handleOpenModal: () => void;
	handleCloseModal: () => void;
	open: boolean;
	listData: ListType | null;
	setListData: React.Dispatch<React.SetStateAction<ListType | null>>;
};

export const ListTable: React.FC<ListTableProps> = ({
	handleOpenModal,
	handleCloseModal,
	open,
	listData,
	setListData,
}) => {
	const { accessToken } = useAppSelector((state) => state.authReducer);
	const [listList, setListList] = React.useState<ListType[] | null>(null);
	const { getError, getSuccess } = useNotification();

	React.useEffect(() => {
		lists
			.getAll(accessToken)
			.then((response) => {
				setListList(response.data.data);
			})
			.catch((error) => {
				getError(error.message);
			});
	}, []);

	const handleEdit = (list: ListType) => {
		setListData(list);
		handleOpenModal();
	};

	const handleDelete = (id: string) => {
		lists
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
			{listData && (
				<ListModal
					open={open}
					handleClose={handleCloseModal}
					list={listData!}
					election={listData.election!}
				></ListModal>
			)}

			{listList ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">id</TableCell>
								<TableCell align="center">name</TableCell>
								<TableCell align="center">votes</TableCell>
								<TableCell align="center">election.id</TableCell>
								<TableCell align="center">election.name</TableCell>
								<TableCell align="center">options</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{listList.map((list) => (
								<TableRow key={list.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="center">{list.id}</TableCell>
									<TableCell align="center">{list.name}</TableCell>
									<TableCell align="center">{list.votes}</TableCell>
									<TableCell align="center">{list.election!.id}</TableCell>
									<TableCell align="center">{list.election!.name}</TableCell>
									<TableCell align="center">
										<Tooltip title="Editar">
											<IconButton
												onClick={() =>
													handleEdit({
														id: list.id,
														name: list.name,
														votes: list.votes,
														election: list.election,
													})
												}
											>
												<EditIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Eliminar">
											<IconButton onClick={() => handleDelete(list.id!)}>
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
				<Typography textAlign="center">No hay listas registradas</Typography>
			)}
		</>
	);
};
