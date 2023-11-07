import { Container } from '@mui/material';
import { HeaderComponent, VoterTable } from '../../../components';
import React from 'react';

const VotersPage: React.FC<{}> = () => {
	return (
		<Container sx={{ my: 2 }} maxWidth="xl">
			<HeaderComponent title="Votantes" description=""></HeaderComponent>
			<VoterTable></VoterTable>
		</Container>
	);
};

export default VotersPage;
