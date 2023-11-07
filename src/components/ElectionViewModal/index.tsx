import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';
import React from 'react';
import { ElectionType } from '../../api/elections';

type ElectionModalProps = {
	election: ElectionType;
	open: boolean;
	handleClose: () => void;
};

export const ElectionViewModal: React.FC<ElectionModalProps> = ({
	election,
	open,
	handleClose,
}) => {
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{election.name}</DialogTitle>
			<DialogContent>
				<Typography>Delegacion</Typography>
				{election.delegation!.candidates!.map((candidate) => (
					<div key={candidate.id}>
						<Typography>
							{candidate.role!.order} - {candidate.role!.name}: {candidate.voter!.user.username} -{' '}
							{candidate.voter!.user.lastname}, {candidate.voter!.user.name}
						</Typography>
					</div>
				))}
			</DialogContent>
			<DialogActions>
				<Button color="secondary" fullWidth variant="contained" size="large" onClick={handleClose}>
					Cerrar
				</Button>
			</DialogActions>
		</Dialog>
	);
};
