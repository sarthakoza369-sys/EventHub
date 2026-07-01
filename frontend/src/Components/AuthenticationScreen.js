import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AuthenticationScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-4 shadow-sm bg-white rounded" style={{ minWidth: "320px" }}>
        <h3 className="mb-4 text-secondary">Welcome</h3>
        
        <div className="d-flex justify-content-center align-items-center gap-3">
          {/* Login Button using useNavigate hook onClick */}
          <button 
            className="btn btn-primary px-4" 
            onClick={() => navigate('/login')}
          >
            Login
          </button>

          <span className="fw-bold text-muted small">OR</span>

          {/* Signup Button using Link component with 'to' prop */}
          <Link 
            to="/signup" 
            className="btn btn-outline-primary px-4"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthenticationScreen