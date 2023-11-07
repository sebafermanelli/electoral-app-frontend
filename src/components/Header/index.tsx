import { Box, Divider, Grid, Typography } from '@mui/material';

type HeaderProps = {
	title: string;
	description: string;
	element?: React.ReactNode | null;
};

export const HeaderComponent: React.FC<HeaderProps> = ({ title, description, element }) => {
	return (
		<div>
			<Box sx={{ width: '100%', py: 1 }} textAlign="center">
				<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="center"
					sx={{ height: '100%' }}
				>
					<Grid item xs={5}>
						<Grid
							container
							direction="column"
							justifyContent="center"
							alignItems="center"
							sx={{ height: '100%' }}
						>
							<Grid item>
								<Typography variant="h2">{title}</Typography>
							</Grid>
							<Grid item sx={{ mt: 1 }}>
								<Typography>{description}</Typography>
							</Grid>
							{element !== undefined && <Grid sx={{ mt: 1, width: '100%' }}>{element}</Grid>}
						</Grid>
					</Grid>
				</Grid>
			</Box>
			<Divider sx={{ my: 2 }}></Divider>
		</div>
	);
};
