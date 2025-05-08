import PropTypes from 'prop-types';
import { incrementClick } from '../services/api';
import Skeleton from './Skeleton';

export default function LinkList({ links, isLoading }) {

  const handleClick = async (id) => {
    try {
      await incrementClick(id);
    } catch (error) {
      console.error("Click tracking failed:", error);
    }
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => alert(`Copied: ${shortUrl}`))
      .catch(err => console.error("Copy failed:", err));
  };

  if (isLoading) {
    return (
      <div className="link-list" aria-label="Loading links">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }


  if (links.length === 0) {
    return (
      <div className="empty-state">
        <img 
          src="/illustration-empty.svg" 
          alt="" 
          aria-hidden="true"
          width={150}
        />
        <h3>No links yet</h3>
        <p>Shorten your first URL above!</p>
      </div>
    );
  }


  return (
    <div className="link-list">
      {links.map((link) => (
        <div key={link.id} className="link-card">
          <div className="link-content">
            <a
              href={link.longUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick(link.id)}
              className="short-url"
              aria-label={`Visit ${link.shortUrl}`}
            >
              {link.shortUrl}
            </a>
            <p className="long-url" title={link.longUrl}>
              {link.longUrl.length > 50 
                ? `${link.longUrl.substring(0, 50)}...`
                : link.longUrl}
            </p>
          </div>
          
          <div className="link-actions">
            <span className="clicks">
              {link.clicks} {link.clicks === 1 ? 'click' : 'clicks'}
            </span>
            <button 
              onClick={() => handleCopy(link.shortUrl)}
              className="copy-btn"
              aria-label="Copy short URL"
            >
              📋 Copy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

LinkList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortUrl: PropTypes.string.isRequired,
      longUrl: PropTypes.string.isRequired,
      clicks: PropTypes.number.isRequired
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired
};