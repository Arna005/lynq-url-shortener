import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function EmailVerificationBanner() {
  const { user, verifyEmail } = useAuth();
  const [isSending, setIsSending] = useState(false);

  // Early return if no verification needed
  if (!user || user.emailVerified) return null;

  //Handles verification email resend
  const handleResend = async () => {
    setIsSending(true);
    try {
      await verifyEmail();
    } catch (error) {
      console.error("Resend failed:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="verification-banner" role="alert">
      <p>Please verify your email to unlock all features</p>
      <button 
        onClick={handleResend}
        disabled={isSending}
        aria-label="Resend verification email"
      >
        {isSending ? 'Sending...' : 'Resend Email'}
      </button>
    </div>
  );
}