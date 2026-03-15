import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './Login.css';

export default function Login() {
  const { loginWithGoogle, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  if (currentUser) {
    navigate('/predict');
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      if (!loginWithGoogle) {
        throw new Error("Firebase Auth is not properly initialized. Check your .env setup!");
      }
      await loginWithGoogle();
      toast.success("Successfully logged in!");
      navigate('/predict');
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-icon">
            <i className="fa-solid fa-lock"></i>
          </div>
          <h1>Unlock the Future</h1>
          <p>
            Please authenticate to access the AI Career Prediction engine and generate your personalized roadmaps.
          </p>
          
          <button 
            className="btn btn-black-pill login-btn" 
            onClick={handleGoogleLogin} 
            disabled={loading}
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-brands fa-google"></i>}
            <span>Sign in with Google</span>
          </button>
          
          <div className="login-notice">
            <i className="fa-solid fa-circle-info"></i>
            <span>
              If you haven't configured your Firebase API keys in the <strong>.env</strong> file yet, the Google popup will fail or log an error.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
