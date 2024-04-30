import { validateToken } from '../features/authentication/authenticationSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';



const ProtectRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.authentication.authenticated);
  const loading = useSelector((state) => state.authentication.status === 'loading' );

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(validateToken());
    }
  }, [dispatch, isAuthenticated]);


  console.log(isAuthenticated)
  if (loading) {
    // While loading, you may want to render a loader or some sort of UI indication.
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to the signup page.
    return <Navigate to='/signup' replace />;
  }

  // If authenticated and not loading, render the children.
  return children;
};

export default ProtectRoute;
