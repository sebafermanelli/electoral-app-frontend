import { Container } from '@mui/material';
import { HeaderComponent, CandidateTable } from '../../../components';
import React from 'react';

const CandidatesPage: React.FC<{}> = () => {
	return (
		<Container sx={{ my: 2 }} maxWidth="xl">
			<HeaderComponent title="Candidatos" description=""></HeaderComponent>
			<CandidateTable></CandidateTable>
		</Container>
	);
};

export default CandidatesPage;
