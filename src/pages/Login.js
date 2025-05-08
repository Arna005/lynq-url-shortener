import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  //Handles form submission for both login and signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setError('');
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
        setError('Verification email sent. Please verify your email.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
      
      {/* Error message display */}
      {error && (
        <div className="auth-message error" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoComplete="username"
          />
        </div>
        
        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength="6"
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          className="auth-submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="spinner">⏳</span>
          ) : isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <div className="auth-footer">
        <button 
          type="button" 
          onClick={() => setIsLogin(!isLogin)}
          className="auth-toggle"
          aria-label={isLogin ? 'Switch to signup' : 'Switch to login'}
        >
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </button>
        
        {/* Forgot Password Link */}
        {isLogin && (
          <button 
            type="button" 
            onClick={() => navigate('/forgot-password')}
            className="auth-forgot"
            aria-label="Forgot password"
          >
            Forgot your password?
          </button>
        )}
      </div>
    </div>
  );
}