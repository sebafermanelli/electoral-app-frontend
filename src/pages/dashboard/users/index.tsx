import { Button, Container } from '@mui/material';
import { HeaderComponent, UserModal, UserTable } from '../../../components';
import React from 'react';
import { UserType } from '../../../api/users';

const UsersPage: React.FC<{}> = () => {
	const [open, setOpen] = React.useState(false);
	const [userData, setUserData] = React.useState<UserType | null>(null);

	const handleOpenModal = () => {
		setOpen(true);
	};

	const handleCloseModal = () => {
		setOpen(false);
		setUserData(null);
	};

	return (
		<Container sx={{ my: 2 }} maxWidth="xl">
			<HeaderComponent
				title="Usuarios"
				description=""
				element={
					<>
						<Button variant="contained" size="large" onClick={handleOpenModal}>
							Agregar usuario
						</Button>
					</>
				}
			></HeaderComponent>
			{!userData && <UserModal open={open} handleClose={handleCloseModal}></UserModal>}
			<UserTable
				open={open}
				handleOpenModal={handleOpenModal}
				handleCloseModal={handleCloseModal}
				userData={userData}
				setUserData={setUserData}
			></UserTable>
		</Container>
	);
};

export default UsersPage;
