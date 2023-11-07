import { Container } from '@mui/material';
import { HeaderComponent, RoleTable } from '../../../components';
import React from 'react';
import { RoleType } from '../../../api/roles';

const RolesPage: React.FC<{}> = () => {
	const [open, setOpen] = React.useState(false);
	const [roleData, setRoleData] = React.useState<RoleType | null>(null);

	const handleOpenModal = () => {
		setOpen(true);
	};

	const handleCloseModal = () => {
		setOpen(false);
		setRoleData(null);
	};

	return (
		<Container sx={{ my: 2 }} maxWidth="xl">
			<HeaderComponent title="Roles" description=""></HeaderComponent>
			<RoleTable
				open={open}
				handleOpenModal={handleOpenModal}
				handleCloseModal={handleCloseModal}
				roleData={roleData}
				setRoleData={setRoleData}
			></RoleTable>
		</Container>
	);
};

export default RolesPage;
