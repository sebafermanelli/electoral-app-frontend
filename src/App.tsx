import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './types/Router';
import { NotificationProvider } from './context/notification.context';
import { Suspense } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

function App() {
	return (
		<NotificationProvider>
			<BrowserRouter>
				<Suspense
					fallback={
						<Backdrop
							open={true}
							sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 5 }}
						>
							<CircularProgress color="inherit" />
						</Backdrop>
					}
				>
					<AppRouter></AppRouter>
				</Suspense>
			</BrowserRouter>
		</NotificationProvider>
	);
}

export default App;
