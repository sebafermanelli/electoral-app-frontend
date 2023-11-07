import { Button, Container } from '@mui/material';
import { HeaderComponent, ElectionTable, ElectionModal } from '../../../components';
import React from 'react';
import { ElectionType } from '../../../api/elections';

const ElectionsPage: React.FC<{}> = () => {
	const [open, setOpen] = React.useState(false);
	const [electionData, setElectionData] = React.useState<ElectionType | null>(null);

	const handleOpenModal = () => {
		setOpen(true);
	};

	const handleCloseModal = () => {
		setOpen(false);
		setElectionData(null);
	};

	return (
		<Container sx={{ my: 2 }} maxWidth="xl">
			<HeaderComponent
				title="Elecciones"
				description=""
				element={
					<>
						<Button variant="contained" size="large" onClick={handleOpenModal}>
							Agregar eleccion
						</Button>
					</>
				}
			></HeaderComponent>
			{!electionData && <ElectionModal open={open} handleClose={handleCloseModal}></ElectionModal>}
			<ElectionTable
				open={open}
				handleOpenModal={handleOpenModal}
				handleCloseModal={handleCloseModal}
				electionData={electionData}
				setElectionData={setElectionData}
			></ElectionTable>
		</Container>
	);
};

export default ElectionsPage;
