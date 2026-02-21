import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
    email: '',
    username: ''
  });
  const [error, setError] = useState('');
  const { login, signup } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (login(formData.mobile, formData.password)) {
        navigate('/');
      } else {
        setError('Invalid mobile number or password.');
      }
    } else {
      if (signup({
        name: formData.username,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password
      })) {
        navigate('/');
      } else {
        setError('User with this email or mobile already exists.');
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      position: 'relative'
    }}>
      
      {/* Background purely for Auth Page */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,153,51,0.1) 0%, transparent 60%)',
          zIndex: 0
        }}
      />

      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '450px',
        padding: '50px 40px',
        zIndex: 10,
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          {isLogin ? 'Welcome Back' : 'Join TerraRoam'}
        </h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '30px' }}>
          {isLogin ? 'Log in to manage your bookings.' : 'Sign up to start your journey.'}
        </p>

        {error && (
          <div style={{ 
            background: 'rgba(220, 20, 60, 0.2)', 
            color: '#ff6b6b', 
            padding: '10px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            fontSize: '0.9rem' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          
          {!isLogin && (
            <>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>Full Name</label>
                <input 
                  type="text" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  required 
                  style={inputStyle} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  style={inputStyle} 
                />
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>Mobile Number</label>
            <input 
              type="tel" 
              name="mobile" 
              value={formData.mobile} 
              onChange={handleChange} 
              required 
              style={inputStyle} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              style={inputStyle} 
            />
          </div>

          <button type="submit" className="glass-button" style={{ 
            width: '100%', 
            padding: '15px', 
            marginTop: '10px',
            background: 'linear-gradient(135deg, rgba(255,153,51,0.5), rgba(255,153,51,0.1))'
          }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '25px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ color: 'var(--color-saffron)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: 'white',
  outline: 'none',
  fontFamily: 'inherit',
  fontSize: '1rem',
  transition: 'border-color 0.3s'
};

export default Auth;
