import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export const RouterLayoutAdmin: React.FC<{}> = () => {
	const { isAuth, role } = useAppSelector((state) => state.authReducer);

	return isAuth && role == 'ADMIN' ? (
		<>
			<Outlet></Outlet>
		</>
	) : (
		<Navigate to="/"></Navigate>
	);
};
