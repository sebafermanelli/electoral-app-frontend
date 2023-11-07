import { Container } from '@mui/material';
import { HeaderComponent, ListTable } from '../../../components';
import React from 'react';
import { ListType } from '../../../api/lists';

const ListsPage: React.FC<{}> = () => {
	const [open, setOpen] = React.useState(false);
	const [listData, setListData] = React.useState<ListType | null>(null);

	const handleOpenModal = () => {
		setOpen(true);
	};

	const handleCloseModal = () => {
		setOpen(false);
		setListData(null);
	};

	return (
		<Container sx={{ my: 2 }} maxWidth="xl">
			<HeaderComponent title="Listas" description=""></HeaderComponent>
			<ListTable
				open={open}
				handleOpenModal={handleOpenModal}
				handleCloseModal={handleCloseModal}
				listData={listData}
				setListData={setListData}
			></ListTable>
		</Container>
	);
};

export default ListsPage;
