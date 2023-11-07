import { AppBar, Box, Container, Grid, Link, Toolbar, Typography } from '@mui/material';
import React from 'react';

export const Footer: React.FC<{}> = () => {
	return (
		<Box>
			<AppBar position="sticky">
				<Toolbar>
					<Container maxWidth="xl">
						<Grid container direction="row" justifyContent="space-between" alignItems="center">
							<Grid item>
								<Link
									href="https://github.com/sebafermanelli"
									underline="none"
									color="secondary"
									target="_blank"
								>
									Sebastian Fermanelli
								</Link>
							</Grid>
							<Grid item>
								<Typography>TP DSW</Typography>
							</Grid>
						</Grid>
					</Container>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
