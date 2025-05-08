import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getLinks } from '../services/api';
import LinkForm from '../components/LinkForm';
import LinkList from '../components/LinkList';
import StatsCard from '../components/ StatsCard';
import EmailVerificationBanner from '../components/EmailVerificationBanner';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const handleNewLink = (newLink) => {
    setLinks(prev => [newLink, ...prev]);
  };

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setLinks([]);
      return;
    }
    
    const loadLinks = async () => {
      try {
        setIsLoading(true);
        const data = await getLinks();
        setLinks(data);
      } catch (error) {
        console.error("Link loading error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLinks();
  }, [user]);

  return (

    <div className="dashboard">
      {/* Show banner if email isn't verified */}
      {user && !user.emailVerified && <EmailVerificationBanner />}
      
      <header>
        <h1>Welcome{user ? `, ${user.email}` : ''}</h1>
        <p>Shorten your links below</p>
      </header>

      <div className="dashboard-grid">
        {/* URL Shortening Section */}
        <section className="shortener-section" aria-label="URL Shortener">
          <LinkForm onNewLink={handleNewLink} />
        </section>

        {/* Analytics Section */}
        <section className="analytics-section" aria-label="Link Analytics">
          <StatsCard links={links} />
        </section>
      </div>

      {/* Links List Section */}
      <section className="links-section">
        <h2>Your Links</h2>
        {!user ? (
          <p className="info">Please login to view your links</p>
        ) : (
          <LinkList 
            links={links} 
            isLoading={isLoading}
          />
        )}
      </section>
    </div>

  );
}