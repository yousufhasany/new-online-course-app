import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase/firebase.init';
import { onAuthStateChanged } from 'firebase/auth';

const PrivateRoute = ({ children }) => {
	const [user, setUser] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	const location = useLocation();

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	if (loading) {
		return (
			<div className="loading-container">
				<div className="spinner"></div>
				<p>Loading...</p>
			</div>
		);
	}

	if (!user) {
		// Redirect to login with return url
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

export default PrivateRoute;
