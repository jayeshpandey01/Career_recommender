import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to if you want (but for simplicity we just push to login).
    return <Navigate to="/login" replace />;
  }

  return children;
}
