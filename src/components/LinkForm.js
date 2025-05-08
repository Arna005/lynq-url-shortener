import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { shortenUrl } from '../services/api';

export default function LinkForm({ onNewLink }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  //Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation checks
    if (!user) {
      setError('Please login to shorten URLs');
      return;
    }
    
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError('Please enter a URL');
      return;
    }
    
    try {
      new URL(trimmedUrl);
    } catch {
      setError('Please include http:// or https://');
      return;
    }

    // Submit to Firebase
    try {
      setIsLoading(true);
      const newLink = await shortenUrl(trimmedUrl);
      onNewLink(newLink);
      setUrl('');
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="link-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            placeholder="Paste long URL (include https://)"
            required
            aria-label="URL to shorten"
          />
          <button 
            type="submit" 
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>
        
        {/* Error message display */}
        {error && <p className="error" role="alert">{error}</p>}
      </form>
    </div>
  );
}