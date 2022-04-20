import { Navigate } from 'react-router-dom'
import jwtDecode from "jwt-decode";
import { getToken } from '../../shared/helpers/helper';

interface Props {
	path?: string
  component: React.ComponentType
}

export const PrivateRoute: React.FC<Props> = ({ component: Component }) => {
	const token = getToken();
	try {
		const decodedToken: any = jwtDecode(`${token}`);
		const currentTime = new Date().getTime();
		if (decodedToken && currentTime < decodedToken.exp * 1000) {
			return <Component />	
		}
	} catch(error) {
		return <Navigate to="/sign-in" />	
	}

	return <Navigate to="/sign-in" />
}