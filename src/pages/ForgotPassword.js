import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  //Handles password reset submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setError('');
    setIsSubmitting(true);
    
    try {
      await resetPassword(email);
      setMessage('If an account exists, you\'ll receive a reset link');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Reset Password</h2>
      
      {/* Success/error messages */}
      {message && (
        <div className="auth-message success" aria-live="polite">
          {message}
        </div>
      )}
      {error && (
        <div className="auth-message error" aria-live="assertive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="reset-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoComplete="email"
            aria-describedby="email-help"
          />
        </div>
        
        <button 
          type="submit" 
          className="auth-submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <div className="auth-footer">
        <button 
          type="button" 
          onClick={() => navigate('/login')}
          className="auth-toggle"
        >
          Remember your password? Login
        </button>
      </div>
    </div>
  );
}