import {
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import { HeaderComponent } from '../../components';
import React from 'react';
import { ElectionType, elections } from '../../api/elections';
import { useNotification } from '../../context/notification.context';
import { VoteTypeString, votes } from '../../api/votes';
import { ListType, lists } from '../../api/lists';
import { VoteValidate } from '../../utils/validateForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/auth.slice';
import { useCookies } from 'react-cookie';

export const HomePage: React.FC<{}> = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [, , remove] = useCookies();
	const { accessToken } = useAppSelector((state) => state.authReducer);
	const { getError, getSuccess } = useNotification();
	const [voteData, setVoteData] = React.useState<VoteTypeString>({
		id: undefined,
		election: undefined,
		list: undefined,
	});
	const [electionList, setElectionList] = React.useState<ElectionType[] | null>(null);
	const [listList, setListList] = React.useState<ListType[] | null>(null);
	const [activeStep, setActiveStep] = React.useState(0);
	const [responseMsg, setResponseMsg] = React.useState('');

	React.useEffect(() => {
		elections
			.getAll(accessToken)
			.then((response) => {
				const elections = response.data.data.filter(
					(election: ElectionType) => !election.finalizated
				);
				setElectionList(elections);
			})
			.catch((error) => {
				getError(error.message);
			});
	}, []);

	React.useEffect(() => {
		lists
			.getAll(accessToken)
			.then((response) => {
				const lists = response.data.data.filter(
					(list: ListType) => list.election.id === voteData.election
				);
				setListList(lists);
			})
			.catch((error) => {
				getError(error.message);
			});
	}, [voteData.election]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
		setVoteData({ ...voteData, [e.target.name]: e.target.value });
	};

	const handleNext = () => {
		if (activeStep === 0) {
			setVoteData({ ...voteData, list: undefined });
		}
		if (activeStep === 1) {
			VoteValidate.validate(voteData)
				.then(() => {
					votes
						.create(voteData, accessToken)
						.then((response) => {
							getSuccess(response.statusText);
							setResponseMsg('El voto se registro con exito');
							setVoteData({ ...voteData, id: response.data.data.id });
						})
						.catch((error) => {
							getError(error.message);
							setResponseMsg(error.response.data.error);
						});
				})
				.catch((error) => {
					getError(error.message);
				});
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleLogout = () => {
		setVoteData({
			id: undefined,
			election: undefined,
			list: undefined,
		});
		setActiveStep(0);
		dispatch(logout());
		remove('accessToken');
		navigate('/login');
	};

	const steps = [
		{
			label: 'Selecciona una eleccion',
			description: ``,
		},
		{
			label: 'Selecciona una lista',
			description: '',
		},
	];

	return (
		<Container sx={{ my: 2 }}>
			<HeaderComponent title="Bienvenido!" description=""></HeaderComponent>

			<Box sx={{ width: '100%', py: 1 }}>
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
							<Grid item sx={{ mt: 1, width: '100%' }}>
								<Stepper activeStep={activeStep} orientation="vertical">
									{steps.map((step, index) => (
										<Step key={step.label}>
											<StepLabel
												optional={
													index === steps.length - 1 ? (
														<Typography variant="caption">Ultimo paso</Typography>
													) : null
												}
											>
												{step.label}
											</StepLabel>
											<StepContent>
												<Typography>{step.description}</Typography>
												{index === 0 && electionList && (
													<Box>
														<FormControl fullWidth sx={{ my: 1 }} variant="filled">
															<InputLabel id="electionLabel">Eleccion</InputLabel>
															<Select
																labelId="electionLabel"
																id="election"
																name="election"
																value={voteData.election ? voteData.election : ''}
																onChange={handleChange}
															>
																{electionList.map((election) => (
																	<MenuItem key={election.id} value={election.id}>
																		{election.name}
																	</MenuItem>
																))}
															</Select>
														</FormControl>
													</Box>
												)}
												{index === 1 && voteData.election && (
													<Box>
														<FormControl fullWidth sx={{ my: 1 }} variant="filled">
															<InputLabel id="listLabel">Lista</InputLabel>
															<Select
																labelId="listLabel"
																id="list"
																name="list"
																value={voteData.list ? voteData.list : ''}
																onChange={handleChange}
															>
																{listList!.map((list) => (
																	<MenuItem key={list.id} value={list.id}>
																		{list.name}
																	</MenuItem>
																))}
															</Select>
														</FormControl>
													</Box>
												)}
												<Box sx={{ mb: 2 }}>
													<div>
														<Button
															variant="contained"
															disabled={
																(index === 0 && !voteData.election) ||
																(index === 1 && !voteData.list)
															}
															onClick={handleNext}
															sx={{ mt: 1, mr: 1 }}
														>
															{index === 1 ? 'Votar' : 'Siguiente'}
														</Button>
														<Button
															disabled={index === 0}
															onClick={handleBack}
															sx={{ mt: 1, mr: 1 }}
														>
															Atras
														</Button>
													</div>
												</Box>
											</StepContent>
										</Step>
									))}
								</Stepper>
							</Grid>

							<Grid item sx={{ mt: 1, width: '100%' }}>
								{voteData.election &&
									voteData.list &&
									voteData.id &&
									activeStep === steps.length && (
										<Paper square elevation={0} sx={{ p: 3 }}>
											<Typography>{responseMsg}</Typography>
											<Button onClick={handleLogout} sx={{ mt: 1, mr: 1 }}>
												Salir
											</Button>
										</Paper>
									)}
								{voteData.election &&
									voteData.list &&
									!voteData.id &&
									activeStep === steps.length && (
										<Paper square elevation={0} sx={{ p: 3 }}>
											<Typography>{responseMsg}</Typography>
											<Button onClick={handleLogout} sx={{ mt: 1, mr: 1 }}>
												Salir
											</Button>
										</Paper>
									)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};
